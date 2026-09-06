// tools/audit_grammar.js
// Fase 2: Linter gramatical con LanguageTool API pública.
// Extrae texto del HTML, llama a la API en chunks de 5000 chars y genera
// grammar_audit_report.md con resumen por categoría y top 50 errores.
//
// Sin dependencias externas. Solo módulos built-in: fs, path, https.

const fs = require('fs');
const path = require('path');
const https = require('https');

const HTML_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'index.html');
const REPORT_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'grammar_audit_report.md');
const CHUNK_SIZE = 5000;
const RATE_SLEEP_MS = 3500; // ~20 req/min
const API_HOST = 'api.languagetool.org';
const API_PATH = '/v2/check';
const LANGUAGE = 'es';

// Quita scripts, styles y todas las etiquetas; decodifica entidades HTML comunes; colapsa espacios.
function extractText(html) {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<svg\b[^>]*>[\s\S]*?<\/svg>/gi, '') // evita falsos positivos en atributos SVG
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

// Construye un body application/x-www-form-urlencoded sin usar URLSearchParams.
function buildFormBody(params) {
  return Object.keys(params)
    .map(k => `${encodeURIComponent(k)}=${encodeURIComponent(params[k])}`)
    .join('&');
}

function callLanguageTool(text) {
  return new Promise((resolve, reject) => {
    const body = buildFormBody({
      text: text,
      language: LANGUAGE,
      enabledOnly: 'false'
    });
    const bodyBytes = Buffer.byteLength(body, 'utf8');

    const req = https.request({
      method: 'POST',
      hostname: API_HOST,
      path: API_PATH,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
        'Content-Length': bodyBytes,
        'Accept': 'application/json',
        'User-Agent': 'Mozilla/5.0 (grammar-auditor)'
      },
      timeout: 30000
    }, (res) => {
      let raw = '';
      res.setEncoding('utf8');
      res.on('data', chunk => { raw += chunk; });
      res.on('end', () => {
        if (res.statusCode < 200 || res.statusCode >= 300) {
          return reject(new Error(`HTTP ${res.statusCode}: ${raw.substring(0, 200)}`));
        }
        try {
          resolve(JSON.parse(raw));
        } catch (e) {
          reject(new Error(`JSON parse error: ${e.message} (raw start: ${raw.substring(0, 100)})`));
        }
      });
    });
    req.on('error', reject);
    req.on('timeout', () => {
      req.destroy(new Error('request timeout'));
    });
    req.write(body, 'utf8');
    req.end();
  });
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

function buildReport(allMatches, totalChars, chunkCount) {
  // Agrupar por categoría
  const byCategory = {};
  const byRule = {};
  allMatches.forEach(m => {
    const cat = (m.rule && m.rule.category && m.rule.category.name) || 'UNKNOWN';
    byCategory[cat] = (byCategory[cat] || 0) + 1;
    const ruleId = (m.rule && m.rule.id) || 'UNKNOWN';
    byRule[ruleId] = (byRule[ruleId] || 0) + 1;
  });

  // Filtrar matches con un context usable (algunas respuestas tienen offset raro)
  const safeMatches = allMatches.filter(m =>
    m.context && typeof m.context.text === 'string' &&
    typeof m.context.offset === 'number' && typeof m.context.length === 'number'
  );

  let md = '';
  md += `# Auditoría Gramatical — ${new Date().toISOString()}\n\n`;
  md += `**Fuente:** LanguageTool API pública (https://api.languagetool.org/v2/check)\n`;
  md += `**Idioma:** es\n`;
  md += `**Texto analizado:** ${totalChars} caracteres (${chunkCount} chunks de ${CHUNK_SIZE})\n`;
  md += `**Total matches reportados por la API:** ${allMatches.length}\n`;
  md += `**Matches con contexto utilizable:** ${safeMatches.length}\n\n`;

  md += `## Resumen por categoría\n\n`;
  const catEntries = Object.entries(byCategory).sort((a, b) => b[1] - a[1]);
  if (catEntries.length === 0) {
    md += `_(sin coincidencias)_\n`;
  } else {
    md += `| Categoría | Conteo |\n`;
    md += `|-----------|--------|\n`;
    catEntries.forEach(([k, v]) => { md += `| ${k} | ${v} |\n`; });
  }
  md += `\n`;

  md += `## Top 20 reglas más frecuentes\n\n`;
  md += `| Regla (issueType / ruleId) | Conteo |\n`;
  md += `|----------------------------|--------|\n`;
  Object.entries(byRule)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 20)
    .forEach(([k, v]) => { md += `| ${k} | ${v} |\n`; });
  md += `\n`;

  md += `## Top 50 errores con contexto y sugerencia\n\n`;
  md += `| # | Categoría | Regla | Texto (contexto) | Sugerencia |\n`;
  md += `|---|-----------|-------|------------------|------------|\n`;
  safeMatches.slice(0, 50).forEach((m, i) => {
    const ctxText = m.context.text;
    const start = Math.max(0, m.context.offset - 20);
    const end = Math.min(ctxText.length, m.context.offset + m.context.length + 30);
    let ctx = ctxText.substring(start, end);
    // Marcar la subcadena marcada
    const markedStart = m.context.offset - start;
    const markedEnd = markedStart + m.context.length;
    ctx = ctx.substring(0, markedStart) + '⟦' + ctx.substring(markedStart, markedEnd) + '⟧' + ctx.substring(markedEnd);

    const cat = (m.rule && m.rule.category && m.rule.category.name) || 'UNKNOWN';
    const issueType = (m.rule && m.rule.issueType) || '';
    const ruleId = (m.rule && m.rule.id) || '';
    const ruleLabel = issueType ? `${ruleId} (${issueType})` : ruleId;
    const sugg = (m.replacements || []).slice(0, 2).map(r => r.value).join(' / ') || '(sin sugerencia)';

    const safeCtx = ctx.replace(/\|/g, '\\|').replace(/\n/g, ' ').substring(0, 80);
    const safeSugg = sugg.replace(/\|/g, '\\|').replace(/\n/g, ' ').substring(0, 60);
    const safeCat = String(cat).replace(/\|/g, '\\|');
    const safeRule = String(ruleLabel).replace(/\|/g, '\\|');

    md += `| ${i + 1} | ${safeCat} | ${safeRule} | ${safeCtx} | ${safeSugg} |\n`;
  });
  md += `\n`;

  md += `## Notas para Fase 4\n\n`;
  md += `- Los **TYPOS** (ortografía pura) son candidatos seguros a fix automático.\n`;
  md += `- Las categorías **GRAMMAR** y **STYLE** requieren revisión manual: pueden ser falsos positivos o cambios de significado.\n`;
  md += `- Categorías como **PUNCTUATION**, **CASING**, **REDUNDANCY** suelen ser aplicables, pero verificar cada caso.\n`;
  md += `- Esta API es orientativa: cualquier fix debe contrastarse con lectura humana antes de Fase 4.\n`;

  return md;
}

async function run() {
  console.log(`Leyendo HTML: ${HTML_PATH}`);
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const text = extractText(html);
  console.log(`Texto extraído: ${text.length} caracteres`);

  const chunks = [];
  for (let i = 0; i < text.length; i += CHUNK_SIZE) {
    chunks.push(text.substring(i, i + CHUNK_SIZE));
  }
  console.log(`Chunks a procesar: ${chunks.length} (${CHUNK_SIZE} chars c/u, sleep ${RATE_SLEEP_MS}ms entre requests)`);
  const estSeconds = chunks.length * 3.5;
  console.log(`Tiempo estimado: ~${Math.round(estSeconds / 60)} min`);

  const allMatches = [];
  let failedChunks = 0;

  for (let i = 0; i < chunks.length; i++) {
    const chunk = chunks[i];
    try {
      const r = await callLanguageTool(chunk);
      const matchCount = (r.matches || []).length;
      if (r.matches) {
        r.matches.forEach(m => {
          const approxCharOffset = i * CHUNK_SIZE + (m.offset || 0);
          allMatches.push({ ...m, chunkIndex: i, approxCharOffset });
        });
      }
      console.log(`[${i + 1}/${chunks.length}] OK — ${matchCount} matches`);
    } catch (e) {
      failedChunks++;
      console.error(`[${i + 1}/${chunks.length}] ERROR: ${e.message}`);
    }
    // No dormir después del último chunk
    if (i < chunks.length - 1) {
      await sleep(RATE_SLEEP_MS);
    }
  }

  console.log(`\nTotal matches: ${allMatches.length} (chunks fallidos: ${failedChunks}/${chunks.length})`);

  const md = buildReport(allMatches, text.length, chunks.length);
  fs.writeFileSync(REPORT_PATH, md, 'utf8');
  const reportBytes = fs.statSync(REPORT_PATH).size;
  console.log(`Reporte escrito: ${REPORT_PATH} (${reportBytes} bytes)`);

  if (failedChunks > 0) {
    console.warn(`⚠️  ${failedChunks} chunks fallaron. Revisa la lista arriba.`);
  }
}

if (require.main === module) {
  run().catch(e => {
    console.error(`FATAL: ${e.message}`);
    console.error(e.stack);
    process.exit(1);
  });
}

module.exports = { extractText, callLanguageTool, run };

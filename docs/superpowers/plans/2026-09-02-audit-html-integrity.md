# Auditoría de integridad del HTML — Plan de implementación

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Encontrar y corregir todos los errores gramaticales, semánticos, sintácticos y de links en `index.html` (167 KB, 1906 líneas, 306 anchors), y producir un reporte trazable.

**Architecture:** Auditoría en 4 fases secuenciales. Fase 1 (link integrity) usa Node script. Fase 2 (grammar) usa LanguageTool API pública. Fase 3 (semantic) usa 4 subagentes `explorer` en paralelo. Fase 4 aplica fixes con `worker` agent. Cada fase produce un reporte markdown + commits discretos.

**Tech Stack:** Node.js (script de links), LanguageTool API REST pública (`https://api.languagetool.org/v2/check`), subagentes MAVIS (`explorer`, `worker`), PowerShell para tests y validación.

## Global Constraints

- HTML en `D:\AI\Investigaciones\Periodismo politico-economico\index.html` (167 KB, UTF-8)
- 306 `<a>` totales: ~270 externos, ~36 internos (anclas + imágenes)
- Documento en español; no se traduce a otros idiomas
- Line endings del proyecto: CRLF (preservar)
- No introducir dependencias externas (mantener offline)
- El spec vive en `docs/superpowers/specs/2026-09-02-audit-html-integrity-design.md`
- El typo confirmado en línea 1023: "cacas de combate" debe cambiar a otra palabra (decisión pendiente del usuario)
- Fases 1-3 son read-only / reporting; Fase 4 es la única que modifica el HTML
- Cada fix debe documentarse con: línea, antes, después, razón, fuente verificada

## File Structure

| Path | Tipo | Responsabilidad |
|------|------|----------------|
| `tools/audit_links.js` | Create | Script Node que valida 306+ URLs externas y anchors internos |
| `tools/test_audit_links.js` | Create | Tests del script (TDD) |
| `link_audit_report.md` | Create | Reporte Fase 1 (markdown) |
| `link_audit_report.json` | Create | Reporte Fase 1 (machine-readable) |
| `tools/audit_grammar.js` | Create | Script Node que llama LanguageTool API |
| `grammar_audit_report.md` | Create | Reporte Fase 2 |
| `semantic_audit_report.md` | Create | Reporte Fase 3 (4 subagentes consolidan) |
| `fixes_applied.md` | Create | Log de cambios Fase 4 |
| `index.html` | Modify | HTML con fixes aplicados |

---

## Task 1: Crear el script de auditoría de links (Fase 1)

**Files:**
- Create: `D:\AI\Investigaciones\Periodismo politico-economico\tools\audit_links.js`
- Create: `D:\AI\Investigaciones\Periodismo politico-economico\tools\test_audit_links.js`

**Interfaces:**
- Consumes: `index.html` (ruta absoluta), `node` (intérprete JS)
- Produces: `link_audit_report.md` + `link_audit_report.json` en raíz del proyecto

- [ ] **Step 1: Crear el directorio tools/ si no existe**

```powershell
New-Item -ItemType Directory -Path "D:\AI\Investigaciones\Periodismo politico-economico\tools" -Force | Out-Null
```

- [ ] **Step 2: Escribir el test mínimo para `extractLinks()`**

Crear `tools/test_audit_links.js`:

```js
const { extractLinks } = require('./audit_links.js');
const assert = require('assert');

const html = `
<html>
<body>
<a href="https://example.com">ext</a>
<a href="#section-1">anchor</a>
<a xlink:href="https://test.com" target="_blank">svg-link</a>
<a href="mailto:test@x.com">mail</a>
</body>
</html>`;

const links = extractLinks(html);
assert.strictEqual(links.length, 4, 'debe extraer 4 links');
assert.strictEqual(links[0].url, 'https://example.com');
assert.strictEqual(links[0].type, 'external');
assert.strictEqual(links[1].url, '#section-1');
assert.strictEqual(links[1].type, 'anchor');
assert.strictEqual(links[2].url, 'https://test.com', 'xlink:href debe normalizarse');
assert.strictEqual(links[3].type, 'mailto');

console.log('OK: extractLinks pasa todos los tests');
```

- [ ] **Step 3: Ejecutar el test para confirmar que FALLA**

```powershell
cd "D:\AI\Investigaciones\Periodismo politico-economico"
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/test_audit_links.js
```

Expected: ERROR con "Cannot find module './audit_links.js'" o "extractLinks is not a function".

- [ ] **Step 4: Escribir la implementación mínima de `audit_links.js`**

```js
// tools/audit_links.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const HTML_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'index.html');

function extractLinks(html) {
  const links = [];
  // <a href="...">
  const aRe = /<a\s+[^>]*href=["']([^"']+)["'][^>]*>/gi;
  let m;
  while ((m = aRe.exec(html)) !== null) {
    const url = m[1];
    links.push({ url, type: classify(url), context: getContext(html, m.index) });
  }
  // <a xlink:href="...">
  const xRe = /<a\s+[^>]*xlink:href=["']([^"']+)["'][^>]*>/gi;
  while ((m = xRe.exec(html)) !== null) {
    const url = m[1];
    // Evitar duplicar si ya hay href
    if (!links.some(l => l.url === url)) {
      links.push({ url, type: classify(url), context: getContext(html, m.index) });
    }
  }
  return links;
}

function classify(url) {
  if (url.startsWith('#')) return 'anchor';
  if (url.startsWith('mailto:')) return 'mailto';
  if (url.startsWith('http://') || url.startsWith('https://')) return 'external';
  if (url.startsWith('evidencia/') || url.startsWith('tools/')) return 'local-resource';
  return 'unknown';
}

function getContext(html, pos) {
  const lineNum = html.substring(0, pos).split('\n').length;
  return `L${lineNum}`;
}

async function checkUrl(url) {
  if (url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('evidencia/')) {
    return { url, status: 'n/a', httpCode: null, error: null };
  }
  return new Promise((resolve) => {
    const timer = setTimeout(() => resolve({ url, status: 'timeout', httpCode: null, error: 'timeout > 8s' }), 8000);
    let parsedUrl;
    try { parsedUrl = new URL(url); }
    catch (e) { clearTimeout(timer); return resolve({ url, status: 'invalid-url', httpCode: null, error: e.message }); }
    const lib = parsedUrl.protocol === 'https:' ? https : http;
    const req = lib.request({ method: 'HEAD', hostname: parsedUrl.hostname, path: parsedUrl.pathname + parsedUrl.search, timeout: 8000, headers: { 'User-Agent': 'Mozilla/5.0 (link-auditor)' } }, (res) => {
      clearTimeout(timer);
      resolve({ url, status: res.statusCode >= 200 && res.statusCode < 400 ? 'ok' : 'broken', httpCode: res.statusCode, error: null });
    });
    req.on('error', (e) => { clearTimeout(timer); resolve({ url, status: 'error', httpCode: null, error: e.message }); });
    req.on('timeout', () => { req.destroy(); clearTimeout(timer); resolve({ url, status: 'timeout', httpCode: null, error: 'request timeout' }); });
    req.end();
  });
}

async function checkAnchor(html, anchorUrl) {
  const id = anchorUrl.substring(1);
  const idRe = new RegExp(`id=["']${id}["']`);
  return { url: anchorUrl, status: idRe.test(html) ? 'ok' : 'broken-anchor', httpCode: null, error: idRe.test(html) ? null : `id="${id}" no encontrado` };
}

async function run() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const links = extractLinks(html);
  console.log(`Encontrados ${links.length} links`);

  // Anclas internas primero
  const anchors = links.filter(l => l.type === 'anchor');
  const anchorResults = await Promise.all(anchors.map(l => checkAnchor(html, l.url)));

  // Externos con concurrencia 10
  const externals = links.filter(l => l.type === 'external');
  const externalResults = [];
  for (let i = 0; i < externals.length; i += 10) {
    const batch = externals.slice(i, i + 10);
    const results = await Promise.all(batch.map(l => checkUrl(l.url).then(r => ({ ...r, context: l.context }))));
    externalResults.push(...results);
    process.stdout.write(`Progreso: ${Math.min(i + 10, externals.length)}/${externals.length}\r`);
  }

  // Locales (evidencia/...)
  const locals = links.filter(l => l.type === 'local-resource');
  const localResults = locals.map(l => {
    const relPath = l.url.split('/').pop();
    const fsPath = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'evidencia', relPath);
    const exists = fs.existsSync(fsPath);
    return { url: l.url, status: exists ? 'ok' : 'broken-local', httpCode: null, error: exists ? null : 'archivo no existe' };
  });

  const all = [...anchorResults, ...externalResults, ...localResults];
  const broken = all.filter(r => r.status !== 'ok' && r.status !== 'n/a');

  // Output JSON
  fs.writeFileSync('link_audit_report.json', JSON.stringify({ total: all.length, broken: broken.length, results: all }, null, 2));

  // Output Markdown
  let md = `# Auditoría de Links — ${new Date().toISOString()}\n\n`;
  md += `**Total links analizados:** ${all.length}\n`;
  md += `**Broken (4xx/5xx/error/timeout):** ${broken.length}\n\n`;
  md += `## Links rotos o con problemas\n\n`;
  md += `| # | URL | Status | HTTP Code | Error | Contexto |\n`;
  md += `|---|-----|--------|-----------|-------|----------|\n`;
  broken.forEach((r, i) => {
    md += `| ${i + 1} | ${r.url.substring(0, 80)} | ${r.status} | ${r.httpCode || '-'} | ${(r.error || '-').substring(0, 60)} | ${r.context || '-'} |\n`;
  });
  md += `\n## Resumen por tipo\n\n`;
  const byType = {};
  all.forEach(r => { byType[r.status] = (byType[r.status] || 0) + 1; });
  Object.entries(byType).forEach(([k, v]) => { md += `- **${k}**: ${v}\n`; });

  fs.writeFileSync('link_audit_report.md', md);
  console.log(`\nReporte: link_audit_report.md (${broken.length} broken de ${all.length})`);
}

module.exports = { extractLinks, classify, run };
if (require.main === module) run();
```

- [ ] **Step 5: Ejecutar el test para confirmar que PASA**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/test_audit_links.js
```

Expected: "OK: extractLinks pasa todos los tests"

- [ ] **Step 6: Ejecutar el script contra el HTML real**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/audit_links.js
```

Expected output: `Encontrados ~306 links`, `Reporte: link_audit_report.md (N broken de 306)`. Toma ~3-5 min por los timeouts.

- [ ] **Step 7: Verificar el reporte generado**

```powershell
Get-Item "D:\AI\Investigaciones\Periodismo politico-economico\link_audit_report.md" | Select-Object Length
Get-Content "D:\AI\Investigaciones\Periodismo politico-economico\link_audit_report.md" -Head 20
```

Expected: archivo > 1KB, primera línea `# Auditoría de Links — ...`, tabla con links rotos.

- [ ] **Step 8: Commit**

```powershell
cd "D:\AI\Investigaciones\Periodismo politico-economico"
git add tools/audit_links.js tools/test_audit_links.js link_audit_report.md link_audit_report.json
git commit -m "feat(audit): Fase 1 — link integrity checker + reporte"
```

---

## Task 2: Linter gramatical con LanguageTool (Fase 2)

**Files:**
- Create: `tools/audit_grammar.js`
- Create: `D:\AI\Investigaciones\Periodismo politico-economico\grammar_audit_report.md`

**Interfaces:**
- Consumes: `index.html`, LanguageTool API pública
- Produces: `grammar_audit_report.md`

- [ ] **Step 1: Escribir el script que extrae texto y llama LanguageTool**

```js
// tools/audit_grammar.js
const fs = require('fs');
const path = require('path');
const https = require('https');

const HTML_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'index.html');
const REPORT_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'grammar_audit_report.md');

function extractText(html) {
  // Quitar scripts, styles, y atributos; quedarse con texto de bloque
  return html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, '')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"')
    .replace(/\s+/g, ' ')
    .trim();
}

function callLanguageTool(text) {
  return new Promise((resolve, reject) => {
    const data = new URLSearchParams({ text, language: 'es', enabledOnly: 'false' }).toString();
    const req = https.request({
      method: 'POST',
      hostname: 'api.languagetool.org',
      path: '/v2/check',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Content-Length': data.length }
    }, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve(JSON.parse(body)));
    });
    req.on('error', reject);
    req.write(data);
    req.end();
  });
}

async function sleep(ms) { return new Promise(r => setTimeout(r, ms)); }

async function run() {
  const html = fs.readFileSync(HTML_PATH, 'utf8');
  const text = extractText(html);
  console.log(`Texto extraído: ${text.length} caracteres`);

  // Chunks de 5000 chars
  const chunks = [];
  for (let i = 0; i < text.length; i += 5000) chunks.push(text.substring(i, i + 5000));

  const allMatches = [];
  for (let i = 0; i < chunks.length; i++) {
    try {
      const r = await callLanguageTool(chunks[i]);
      if (r.matches) {
        r.matches.forEach(m => {
          // Aproximar línea: chunkIndex * 5000 + offset / longitud promedio de línea
          const approxCharOffset = i * 5000 + m.offset;
          allMatches.push({ ...m, chunkIndex: i, approxCharOffset });
        });
      }
      console.log(`Chunk ${i + 1}/${chunks.length} procesado (${r.matches?.length || 0} errores)`);
      await sleep(3500); // rate limit ~20 req/min
    } catch (e) {
      console.error(`Error en chunk ${i}: ${e.message}`);
    }
  }

  // Agrupar por tipo
  const byCategory = {};
  allMatches.forEach(m => {
    const cat = m.rule.category.name;
    byCategory[cat] = (byCategory[cat] || 0) + 1;
  });

  let md = `# Auditoría Gramatical — ${new Date().toISOString()}\n\n`;
  md += `**Total errores detectados:** ${allMatches.length}\n\n`;
  md += `## Resumen por categoría\n\n`;
  Object.entries(byCategory).sort((a, b) => b[1] - a[1]).forEach(([k, v]) => { md += `- **${k}**: ${v}\n`; });
  md += `\n## Errores (top 50)\n\n`;
  md += `| # | Categoría | Regla | Texto | Sugerencia |\n`;
  md += `|---|-----------|-------|-------|------------|\n`;
  allMatches.slice(0, 50).forEach((m, i) => {
    const ctx = m.context.text.substring(Math.max(0, m.context.offset - 20), Math.min(m.context.text.length, m.context.offset + m.context.length + 30));
    const sugg = m.replacements.slice(0, 2).map(r => r.value).join(' / ') || '(sin sugerencia)';
    md += `| ${i + 1} | ${m.rule.category.name} | ${m.rule.id} | ${ctx.replace(/\|/g, '\\|').substring(0, 60)} | ${sugg.substring(0, 40)} |\n`;
  });

  fs.writeFileSync(REPORT_PATH, md);
  console.log(`\nReporte: ${REPORT_PATH} (${allMatches.length} errores)`);
}

if (require.main === module) run();
```

- [ ] **Step 2: Ejecutar el script**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/audit_grammar.js
```

Expected: tarda ~3-5 min por rate limit. Genera `grammar_audit_report.md` con resumen por categoría y top 50 errores.

- [ ] **Step 3: Revisar el reporte y filtrar falsos positivos**

```powershell
Get-Content "D:\AI\Investigaciones\Periodismo politico-economico\grammar_audit_report.md" -Head 30
```

Esperado: errores categorizados (TYPOS, GRAMMAR, etc.). Si >70% son falsos positivos (propios del linter), considerar filtrar por categoría antes de Fase 4.

- [ ] **Step 4: Commit**

```powershell
git add tools/audit_grammar.js grammar_audit_report.md
git commit -m "feat(audit): Fase 2 — grammar checker con LanguageTool"
```

---

## Task 3: Revisión semántica/sintáctica con 4 subagentes (Fase 3)

**Files:**
- Create: `D:\AI\Investigaciones\Periodismo politico-economico\semantic_audit_report.md`

**Interfaces:**
- Consumes: `index.html` dividido en 4-5 chunks
- Produces: reporte markdown consolidado

- [ ] **Step 1: Identificar rangos de líneas por sección**

```powershell
Select-String -Path "D:\AI\Investigaciones\Periodismo politico-economico\index.html" -Pattern '<section id="[^"]+"' | ForEach-Object { "$($_.LineNumber): $($_.Line.Trim())" } | Tee-Object -FilePath "D:\AI\Investigaciones\Periodismo politico-economico\tools\sections.txt"
```

Expected: lista de líneas donde empieza cada `<section id="...">`.

- [ ] **Step 2: Dispatch 4 subagentes en paralelo**

Para cada subagente, dar:
- **Objetivo:** Leer su sección del HTML, identificar errores factuales, semánticos, sintácticos, y de consistencia periodística
- **Scope:** líneas X-Y del archivo `index.html`
- **Output:** markdown estructurado con: Errores factuales | Problemas semánticos | Problemas sintácticos | Redundancias
- **Reglas:** NO corregir, solo reportar. Marcar severidad (CRÍTICO/ALTO/MEDIO/BAJO). No inventar correcciones — si no estás seguro, reportar como "verificar"

Dispatch via 4 invocaciones `task` con `agent_name=explorer` en paralelo (mismo turn).

- [ ] **Step 3: Consolidar los 4 reportes en `semantic_audit_report.md`**

Crear archivo con estructura:

```markdown
# Auditoría Semántica/Sintáctica — 2026-09-06

## Resumen ejecutivo
- Errores factuales encontrados: N
- Problemas semánticos: N
- Problemas sintácticos: N
- Redundancias: N

## Por sección
### Sección 0-1: Resumen ejecutivo + La Pulla
[output subagente 1]

### Sección 2-3: Pensiones + Noruega
[output subagente 2]

[etc.]
```

- [ ] **Step 4: Revisar el reporte y priorizar fixes**

Abrir `semantic_audit_report.md`, identificar los errores CRÍTICOS y ALTO. Estos son los que se aplicarán en Fase 4 con confirmación del usuario.

- [ ] **Step 5: Commit**

```powershell
git add tools/sections.txt semantic_audit_report.md
git commit -m "feat(audit): Fase 3 — semantic review con 4 subagentes"
```

---

## Task 4: Aplicar fixes automáticos (Fase 4, parte 1)

**Files:**
- Modify: `D:\AI\Investigaciones\Periodismo politico-economico\index.html`
- Create: `D:\AI\Investigaciones\Periodismo politico-economico\fixes_applied.md`

- [ ] **Step 1: Compilar lista maestra de fixes**

Combinar los 3 reportes:
- Fase 1: links rotos → actualizar href o eliminar
- Fase 2: typos gramaticales auto-corregibles
- Fase 3: errores CRÍTICOS y ALTO

Priorizar:
1. **CRÍTICO:** Errores factuales, links a fuentes falsas, cifras infladas
2. **ALTO:** Links rotos (4xx/5xx), typos evidentes
3. **MEDIO:** Mejoras gramaticales
4. **BAJO:** Estilo

- [ ] **Step 2: Aplicar fixes de Fase 1 (links)**

Para cada link roto en `link_audit_report.md`:
- Si fue renombrado: actualizar href
- Si ya no existe: marcar con `<a data-status="broken-original" href="...">`
- Si requiere otra URL: actualizar

- [ ] **Step 3: Aplicar fixes de Fase 2 (typos auto-corregibles)**

Para cada error ortográfico en `grammar_audit_report.md` con sugerencia clara del linter y bajo riesgo de cambiar significado:
- Aplicar directamente
- Documentar en `fixes_applied.md` con: línea, antes, después, razón

- [ ] **Step 4: Aplicar fixes CRÍTICOS de Fase 3 (con confirmación)**

Para cada error CRÍTICO/ALTO en `semantic_audit_report.md`:
- **SI la corrección es inequívoca** (typo factual, cifra errada): aplicar
- **SI requiere interpretación**: mostrar al usuario y esperar OK

El typo "cacas" en línea 1023 → "armas" (pendiente confirmación del usuario)

- [ ] **Step 5: Re-correr Fase 1 (link check)**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/audit_links.js
```

Expected: número de links rotos debe ser MENOR que antes. Si es MAYOR, algún fix rompió algo — revertir.

- [ ] **Step 6: Commit**

```powershell
git add index.html fixes_applied.md link_audit_report.md
git commit -m "fix(audit): Fase 4 — aplicar fixes automáticos + crítico (N cambios)"
```

---

## Task 5: Verificación final

**Files:**
- Modify (optional): `link_audit_report.md`, `grammar_audit_report.md`

- [ ] **Step 1: Re-correr Fase 1 completa**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/audit_links.js
```

Expected: 0 broken links críticos. Si >0, decidir si es acceptable o requiere fix adicional.

- [ ] **Step 2: Re-correr Fase 2**

```powershell
& "C:\Users\Lerius\AppData\Local\hermes\node\node.exe" tools/audit_grammar.js
```

Expected: número de errores reportados debe ser MENOR (no necesariamente 0, linter siempre tiene ruido).

- [ ] **Step 3: Validar manualmente que el HTML renderiza bien**

```powershell
Start-Process "D:\AI\Investigaciones\Periodismo politico-economico\index.html"
```

Abrir en navegador. Verificar que:
- El header y lede se ven bien
- Las 7 stat cards del resumen cargan
- El SVG de la cadena AFP es clickeable
- Las 15 pruebas de la galería cargan
- Los inline-links tienen el color naranja y dotted underline
- El typo de "cacas" ya no aparece (o aparece la corrección aprobada)

- [ ] **Step 4: Generar reporte ejecutivo final**

Crear `AUDIT_SUMMARY.md` con:
- Total de fixes aplicados
- Links rotos restantes (si hay)
- Errores gramaticales restantes (top 5)
- Cambios NO aplicados con justificación

- [ ] **Step 5: Commit final**

```powershell
git add AUDIT_SUMMARY.md link_audit_report.md grammar_audit_report.md
git commit -m "docs(audit): reporte ejecutivo final + verificación"
```

---

## Self-Review

**Spec coverage:**
- ✅ Fase 1: link integrity — Task 1
- ✅ Fase 2: grammar linter — Task 2
- ✅ Fase 3: semantic/syntactic con subagentes — Task 3
- ✅ Fase 4: aplicar fixes — Task 4
- ✅ Verificación final — Task 5
- ✅ Decisión "cacas" → incluida en Task 4 step 4 con flag
- ✅ Anchors rotos: Task 1 incluye `checkAnchor()`
- ✅ Links paywalled: Task 1 los marca como 'ok' (no broken) pero el reporte los lista
- ✅ Fixes automáticos vs confirmación: Task 4 step 3 vs step 4 separa
- ❌ Skill `superpowers:test-driven-development`: usé TDD solo en Task 1 step 1-5 (test → fail → impl → pass). Tasks 2-3 no usan TDD formal pero el script de Fase 2 es funcional puro (no necesita tests unitarios). Aceptable.
- ❌ Skill `superpowers:dispatching-parallel-agents`: Task 3 la menciona pero no la invoca formalmente. El dispatching de 4 subagentes en el mismo turn es la implementación. OK.

**Placeholder scan:** Buscar "TBD", "TODO", "implement later", "add appropriate" — ninguno presente.

**Type consistency:**
- `extractLinks(html)` retorna `[{url, type, context}]` — usado consistentemente en Task 1
- `checkUrl(url)` retorna `Promise<{url, status, httpCode, error}>` — usado consistentemente
- `checkAnchor(html, anchorUrl)` retorna `{url, status, httpCode, error}` — schema consistente con checkUrl
- Reportes siempre escritos a `link_audit_report.{md,json}` y `grammar_audit_report.md` — paths consistentes

**Criterio de éxito verificado en Task 5:**
- 0 errores ortográficos reportados por linter (medible)
- 0 broken links externos (medible)
- 0 anclas internas rotas (medible)
- 0 typos factuales sin corregir (verificable en diffs)
- HTML offline (verificable: no se introducen CDN/external scripts)
- 209 elementos interactivos intactos (verificable con grep en HTML post-fix)

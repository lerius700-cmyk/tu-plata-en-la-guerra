// tools/audit_links.js
const fs = require('fs');
const path = require('path');
const https = require('https');
const http = require('http');
const { URL } = require('url');

const HTML_PATH = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico', 'index.html');
const PROJECT_ROOT = path.join('D:', 'AI', 'Investigaciones', 'Periodismo politico-economico');

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
    const fsPath = path.join(PROJECT_ROOT, 'evidencia', relPath);
    const exists = fs.existsSync(fsPath);
    return { url: l.url, status: exists ? 'ok' : 'broken-local', httpCode: null, error: exists ? null : 'archivo no existe' };
  });

  const all = [...anchorResults, ...externalResults, ...localResults];
  const broken = all.filter(r => r.status !== 'ok' && r.status !== 'n/a');

  // Output JSON
  fs.writeFileSync(path.join(PROJECT_ROOT, 'link_audit_report.json'), JSON.stringify({ total: all.length, broken: broken.length, results: all }, null, 2));

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

  fs.writeFileSync(path.join(PROJECT_ROOT, 'link_audit_report.md'), md);
  console.log(`\nReporte: link_audit_report.md (${broken.length} broken de ${all.length})`);
}

module.exports = { extractLinks, classify, run };
if (require.main === module) run();

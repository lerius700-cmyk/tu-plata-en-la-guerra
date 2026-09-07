// tools/audit_accessibility.js
// Auditor de accesibilidad WCAG 2.1 usando axe-core + jsdom
// (Migrado de CLI a librería para evitar dependencia de Chrome/Edge real)
// Generado para auditoría 2026-09-06

const axe = require('axe-core');
const { JSDOM } = require('jsdom');
const fs = require('fs');
const path = require('path');

/**
 * Ejecuta axe-core contra un archivo HTML usando jsdom y retorna resultados parseados.
 * @param {string} htmlPath - ruta al archivo HTML
 * @param {object} options - { saveRaw: boolean, tags: array<string> }
 * @returns {object} { critical, serious, moderate, minor, totalNodes, raw }
 */
async function runAudit(htmlPath, options = {}) {
  const { saveRaw = false, tags = ['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'] } = options;
  const absPath = path.resolve(htmlPath);

  if (!fs.existsSync(absPath)) {
    throw new Error(`Archivo HTML no encontrado: ${absPath}`);
  }

  const html = fs.readFileSync(absPath, 'utf8');

  // Crear DOM con jsdom (sin scripts externos; el HTML es self-contained)
  const dom = new JSDOM(html, {
    url: 'http://localhost/',
    runScripts: 'outside-only',
    pretendToBeVisual: true
  });
  const { window } = dom;

  // Inyectar axe-core en el contexto del window
  window.eval(axe.source);

  // Ejecutar axe.run() dentro del contexto del window
  // (necesario porque axe usa globals del window)
  const results = await window.eval(`
    axe.run(document, {
      runOnly: { type: 'tag', values: ${JSON.stringify(tags)} },
      resultTypes: ['violations', 'incomplete', 'passes']
    })
  `);

  // Guardar raw si se pide
  if (saveRaw) {
    const outputFile = path.join(__dirname, '..', 'docs', 'superpowers', 'audits', '2026-09-06-editorial', '03_axe_raw.json');
    const outputDir = path.dirname(outputFile);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }
    fs.writeFileSync(outputFile, JSON.stringify(results, null, 2));
  }

  // Cerrar el DOM
  dom.window.close();

  return parseResults(results);
}

/**
 * Parsea resultados de axe-core y categoriza por severidad.
 * @param {object} rawResults - objeto completo de axe-core
 * @returns {object} { critical, serious, moderate, minor, totalNodes }
 */
function parseResults(rawResults) {
  const violations = (rawResults && rawResults.violations) || [];
  const categorized = {
    critical: [],
    serious: [],
    moderate: [],
    minor: [],
    totalNodes: 0
  };

  for (const v of violations) {
    const impact = v.impact || 'minor';
    const nodeCount = (v.nodes || []).length;
    categorized.totalNodes += nodeCount;
    if (categorized[impact]) {
      categorized[impact].push({
        id: v.id,
        description: v.description,
        help: v.help,
        helpUrl: v.helpUrl,
        nodes: v.nodes || []
      });
    }
  }

  return categorized;
}

module.exports = { runAudit, parseResults };

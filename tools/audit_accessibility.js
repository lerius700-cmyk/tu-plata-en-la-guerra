// tools/audit_accessibility.js
// Auditor de accesibilidad WCAG 2.1 usando axe-core
// Generado para auditoría 2026-09-06
//
// Uso:
//   const { runAudit, parseResults } = require('./audit_accessibility.js');
//   const results = runAudit('index.html');

const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

/**
 * Ejecuta axe-core contra un archivo HTML y retorna resultados parseados.
 * @param {string} htmlPath - ruta al archivo HTML
 * @param {object} options - { format: 'json' | 'text', saveRaw: boolean }
 * @returns {object} resultados de axe-core parseados
 */
function runAudit(htmlPath, options = {}) {
  const { format = 'json', saveRaw = false } = options;
  const absPath = path.resolve(htmlPath);

  if (!fs.existsSync(absPath)) {
    throw new Error(`Archivo HTML no encontrado: ${absPath}`);
  }

  const outputFile = path.join(__dirname, '..', 'docs', 'superpowers', 'audits', '2026-09-06-editorial', '03_axe_raw.json');
  const outputDir = path.dirname(outputFile);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  try {
    const cmd = `npx axe "${absPath}" --save "${outputFile}" --exit 2>&1`;
    const stdout = execSync(cmd, { encoding: 'utf8', stdio: 'pipe' });
    if (saveRaw) {
      fs.writeFileSync(outputFile.replace('.json', '_stdout.txt'), stdout);
    }
  } catch (err) {
    // axe-core retorna exit code != 0 si encuentra violaciones, eso es OK
    if (err.stdout) {
      fs.writeFileSync(outputFile.replace('.json', '_stdout.txt'), err.stdout);
    }
  }

  if (!fs.existsSync(outputFile)) {
    throw new Error(`axe-core no generó output en ${outputFile}`);
  }

  const raw = JSON.parse(fs.readFileSync(outputFile, 'utf8'));
  return parseResults(raw);
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

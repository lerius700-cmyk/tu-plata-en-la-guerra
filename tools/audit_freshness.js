// tools/audit_freshness.js
// Detector de cambios en URLs (HEAD con Last-Modified)
// Generado para auditoría 2026-09-06
//
// Uso:
//   const { checkFreshness, parseFreshnessReport } = require('./audit_freshness.js');
//   const report = checkFreshness(['https://example.com', ...]);
//   const summary = parseFreshnessReport(report);
//
// Solo usa módulos built-in de Node. No requiere dependencias npm.
// Para los HEAD requests se delega a PowerShell `Invoke-WebRequest -Method Head`
// (disponible en Windows 10+ con PowerShell 5+).

const { execSync } = require('child_process');

/**
 * Verifica freshness de una lista de URLs usando HEAD con Last-Modified.
 * Cada URL se consulta en serie (no concurrente) para evitar rate-limiting.
 *
 * Implementación: delega a PowerShell para hacer el HEAD request. La URL se
 * pasa por variable de entorno (AUDIT_URL) para evitar el infierno de escape
 * de comillas entre cmd.exe y PowerShell. Los strings de salida dentro de
 * PowerShell usan comillas simples (literales) para el mismo motivo.
 *
 * @param {string[]} urls - array de URLs a verificar
 * @returns {{ results: Array<{url: string, status: number|null, lastModified: string|null, changed: boolean, error?: string}> }}
 */
function checkFreshness(urls) {
  const results = [];
  for (const url of urls) {
    try {
      // Script PowerShell en comillas simples (literales). El único punto de
      // interpolación es $env:AUDIT_URL, que PowerShell expande. Como la URL
      // puede contener comillas dobles que no las tocamos, evitamos el bug
      // de cmd.exe quitando comillas del argumento -Command.
      const psScript =
        `try { ` +
          `$r = Invoke-WebRequest -Uri $env:AUDIT_URL -Method Head -UseBasicParsing -ErrorAction Stop -TimeoutSec 10; ` +
          `'STATUS=' + $r.StatusCode + '|LM=' + $r.Headers['Last-Modified'] ` +
        `} catch { ` +
          `'ERROR=' + $_.Exception.Message ` +
        `}`;
      const output = execSync(
        `powershell -NoProfile -NonInteractive -Command "${psScript}"`,
        {
          encoding: 'utf8',
          stdio: ['pipe', 'pipe', 'pipe'],
          env: { ...process.env, AUDIT_URL: url }
        }
      );
      const line = output.trim();

      if (line.startsWith('ERROR=')) {
        results.push({ url, status: null, lastModified: null, changed: false, error: line.substring(6) });
      } else {
        const statusMatch = line.match(/STATUS=(\d+)/);
        const lmMatch = line.match(/\|LM=(.*)$/);
        results.push({
          url,
          status: statusMatch ? parseInt(statusMatch[1], 10) : null,
          lastModified: lmMatch ? lmMatch[1].trim() || null : null,
          // `changed` se determina luego por el consumidor, comparando contra una
          // baseline. Aquí lo dejamos en `false` por defecto.
          changed: false
        });
      }
    } catch (err) {
      // execSync puede lanzar si powershell no está disponible, timeout, etc.
      results.push({ url, status: null, lastModified: null, changed: false, error: err.message });
    }
  }
  return { results };
}

/**
 * Clasifica los resultados de checkFreshness en tres buckets:
 *   - changed:   resultados con changed=true (el contenido fue modificado)
 *   - unchanged: resultados con changed=false y sin error
 *   - failed:    resultados con error o status >= 400
 *
 * @param {{ results?: Array<{url: string, status: number|null, lastModified: string|null, changed: boolean, error?: string}> }} report
 * @returns {{ changed: any[], unchanged: any[], failed: any[] }}
 */
function parseFreshnessReport(report) {
  const classified = { changed: [], unchanged: [], failed: [] };
  const results = (report && report.results) || [];
  for (const r of results) {
    if (r.error || (r.status && r.status >= 400)) {
      classified.failed.push(r);
    } else if (r.changed) {
      classified.changed.push(r);
    } else {
      classified.unchanged.push(r);
    }
  }
  return classified;
}

module.exports = { checkFreshness, parseFreshnessReport };

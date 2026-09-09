// tools/test_audit_freshness.js
// Tests TDD para audit_freshness.js
// Generado para auditoría 2026-09-06
//
// Ejecutar con: node tools/test_audit_freshness.js

const { test } = require('node:test');
const assert = require('node:assert');

let auditFreshness;
try {
  auditFreshness = require('./audit_freshness.js');
} catch (e) {
  auditFreshness = null;
}

test('módulo audit_freshness.js existe y exporta las funciones requeridas', () => {
  assert.ok(auditFreshness, 'módulo debe existir');
  assert.ok(typeof auditFreshness.checkFreshness === 'function', 'debe exportar checkFreshness');
  assert.ok(typeof auditFreshness.parseFreshnessReport === 'function', 'debe exportar parseFreshnessReport');
});

test('parseFreshnessReport maneja reporte vacío', () => {
  const report = auditFreshness.parseFreshnessReport({ results: [] });
  assert.strictEqual(report.changed.length, 0);
  assert.strictEqual(report.unchanged.length, 0);
  assert.strictEqual(report.failed.length, 0);
});

test('parseFreshnessReport clasifica URLs changed/unchanged/failed', () => {
  const mockReport = {
    results: [
      { url: 'https://a.com', lastModified: '2026-09-05', status: 200, changed: true },
      { url: 'https://b.com', lastModified: '2026-08-01', status: 200, changed: false },
      { url: 'https://c.com', status: 404, error: 'Not Found' }
    ]
  };
  const parsed = auditFreshness.parseFreshnessReport(mockReport);
  assert.strictEqual(parsed.changed.length, 1);
  assert.strictEqual(parsed.changed[0].url, 'https://a.com');
  assert.strictEqual(parsed.unchanged.length, 1);
  assert.strictEqual(parsed.unchanged[0].url, 'https://b.com');
  assert.strictEqual(parsed.failed.length, 1);
  assert.strictEqual(parsed.failed[0].url, 'https://c.com');
});

// tools/test_audit_accessibility.js
// Tests TDD para tools/audit_accessibility.js
// Generado para auditoría 2026-09-06
//
// Uso: node tools/test_audit_accessibility.js

const { test } = require('node:test');
const assert = require('node:assert');
const path = require('path');
const fs = require('fs');

let auditAccessibility;
try {
  auditAccessibility = require('./audit_accessibility.js');
} catch (e) {
  auditAccessibility = null;
}

test('módulo audit_accessibility.js existe y exporta funciones', () => {
  assert.ok(auditAccessibility, 'módulo debe existir');
  assert.ok(typeof auditAccessibility.runAudit === 'function', 'debe exportar runAudit');
  assert.ok(typeof auditAccessibility.parseResults === 'function', 'debe exportar parseResults');
});

test('parseResults categoriza violaciones por severidad', () => {
  const mockResults = {
    violations: [
      { id: 'color-contrast', impact: 'serious', nodes: [{ html: '<p>test</p>' }] },
      { id: 'image-alt', impact: 'critical', nodes: [{ html: '<img>' }, { html: '<img>' }] },
      { id: 'label', impact: 'minor', nodes: [{ html: '<input>' }] }
    ]
  };
  const parsed = auditAccessibility.parseResults(mockResults);
  assert.strictEqual(parsed.critical.length, 1, '1 violación crítica');
  assert.strictEqual(parsed.serious.length, 1, '1 violación seria');
  assert.strictEqual(parsed.minor.length, 1, '1 violación menor');
  assert.strictEqual(parsed.totalNodes, 4, '4 nodos totales');
});

test('parseResults maneja resultados vacíos', () => {
  const parsed = auditAccessibility.parseResults({ violations: [] });
  assert.strictEqual(parsed.critical.length, 0);
  assert.strictEqual(parsed.serious.length, 0);
  assert.strictEqual(parsed.minor.length, 0);
  assert.strictEqual(parsed.totalNodes, 0);
});

test('parseResults retorna estructura completa incluso sin passes/incomplete', () => {
  const parsed = auditAccessibility.parseResults({ violations: [] });
  assert.ok(Array.isArray(parsed.critical));
  assert.ok(Array.isArray(parsed.serious));
  assert.ok(Array.isArray(parsed.moderate));
  assert.ok(Array.isArray(parsed.minor));
  assert.strictEqual(typeof parsed.totalNodes, 'number');
});

test('runAudit contra HTML simple detecta violaciones básicas', async () => {
  // HTML mínimo con imagen sin alt, sin lang, sin title
  const minimalHtml = `<!DOCTYPE html><html><head><title>Test</title></head><body><img src="x.png"><input type="text"></body></html>`;
  const tmpPath = path.join(require('os').tmpdir(), 'test-audit-' + Date.now() + '.html');
  fs.writeFileSync(tmpPath, minimalHtml);
  try {
    const result = await auditAccessibility.runAudit(tmpPath);
    assert.ok(result.critical.length + result.serious.length + result.moderate.length + result.minor.length > 0, 'debe detectar al menos una violación');
  } finally {
    fs.unlinkSync(tmpPath);
  }
});

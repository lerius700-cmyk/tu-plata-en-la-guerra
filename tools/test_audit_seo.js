const { test } = require('node:test');
const assert = require('node:assert');

let auditSeo;
try {
  auditSeo = require('./audit_seo.js');
} catch (e) {
  auditSeo = null;
}

test('módulo audit_seo.js existe', () => {
  assert.ok(auditSeo, 'módulo debe existir');
  assert.ok(typeof auditSeo.parseMetaTags === 'function');
  assert.ok(typeof auditSeo.checkRequiredTags === 'function');
});

test('parseMetaTags extrae title, description y og:*', () => {
  const html = `
    <html lang="es">
    <head>
      <title>Test Title</title>
      <meta name="description" content="Test desc">
      <meta property="og:title" content="OG Title">
      <meta property="og:image" content="https://example.com/img.png">
    </head>
    <body></body>
    </html>
  `;
  const meta = auditSeo.parseMetaTags(html);
  assert.strictEqual(meta.title, 'Test Title');
  assert.strictEqual(meta.description, 'Test desc');
  assert.strictEqual(meta['og:title'], 'OG Title');
  assert.strictEqual(meta['og:image'], 'https://example.com/img.png');
});

test('checkRequiredTags detecta tags faltantes', () => {
  const metaIncompleto = { title: 'X', description: 'Y' };
  const issues = auditSeo.checkRequiredTags(metaIncompleto);
  assert.ok(issues.length > 0, 'debe reportar issues');
  assert.ok(issues.some(i => i.tag === 'og:title'), 'falta og:title');
  assert.ok(issues.some(i => i.tag === 'og:description'), 'falta og:description');
  assert.ok(issues.some(i => i.tag === 'og:image'), 'falta og:image');
  assert.ok(issues.some(i => i.tag === 'twitter:card'), 'falta twitter:card');
  assert.ok(issues.some(i => i.tag === 'canonical'), 'falta canonical');
});

test('checkRequiredTags pasa cuando todo está presente', () => {
  const metaCompleto = {
    title: 'X',
    description: 'Esta es una descripción de prueba con más de setenta caracteres para pasar la validación de longitud requerida.',
    'og:title': 'X',
    'og:description': 'Y',
    'og:image': 'https://x.com/i.png',
    'og:url': 'https://x.com',
    'og:type': 'article',
    'og:site_name': 'X',
    'og:locale': 'es_CO',
    'twitter:card': 'summary_large_image',
    'twitter:title': 'X',
    'twitter:description': 'Y',
    'twitter:image': 'https://x.com/i.png',
    canonical: 'https://x.com'
  };
  const issues = auditSeo.checkRequiredTags(metaCompleto);
  assert.strictEqual(issues.length, 0, 'no debe haber issues');
});

test('checkRequiredTags valida longitud de description (70-160 chars)', () => {
  const metaCorto = { description: 'corto' };
  const issuesCorto = auditSeo.checkRequiredTags(metaCorto);
  assert.ok(issuesCorto.some(i => i.tag === 'description' && i.severity === 'warning'));
});

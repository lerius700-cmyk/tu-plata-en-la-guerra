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

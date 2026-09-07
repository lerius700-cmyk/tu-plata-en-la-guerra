// tools/audit_seo.js
// Validador de meta tags SEO + Open Graph + Twitter Card
// Generado para auditoría 2026-09-06

const REQUIRED_TAGS = [
  { tag: 'title', severity: 'error' },
  { tag: 'description', severity: 'error', minLength: 70, maxLength: 160 },
  { tag: 'og:title', severity: 'error' },
  { tag: 'og:description', severity: 'error' },
  { tag: 'og:image', severity: 'error' },
  { tag: 'og:url', severity: 'error' },
  { tag: 'og:type', severity: 'error' },
  { tag: 'og:site_name', severity: 'warning' },
  { tag: 'og:locale', severity: 'warning' },
  { tag: 'twitter:card', severity: 'error' },
  { tag: 'twitter:title', severity: 'error' },
  { tag: 'twitter:description', severity: 'error' },
  { tag: 'twitter:image', severity: 'error' },
  { tag: 'canonical', severity: 'error' }
];

function parseMetaTags(html) {
  const meta = {};

  // Title
  const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
  if (titleMatch) meta.title = titleMatch[1].trim();

  // Meta tags (name= and property=)
  const metaRegex = /<meta\s+([^>]+)\/?>/gi;
  let match;
  while ((match = metaRegex.exec(html)) !== null) {
    const attrs = match[1];

    // name="description" / name="..."
    const nameMatch = attrs.match(/(?:^|\s)name=["']([^"']+)["']/i);
    if (nameMatch) {
      const contentMatch = attrs.match(/(?:^|\s)content=["']([^"']+)["']/i);
      if (contentMatch) meta[nameMatch[1].toLowerCase()] = contentMatch[1];
    }

    // property="og:..." / "twitter:..."
    const propMatch = attrs.match(/(?:^|\s)property=["']([^"']+)["']/i);
    if (propMatch) {
      const contentMatch = attrs.match(/(?:^|\s)content=["']([^"']+)["']/i);
      if (contentMatch) meta[propMatch[1].toLowerCase()] = contentMatch[1];
    }
  }

  // Canonical link
  const canonicalMatch = html.match(/<link\s+[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["']/i)
    || html.match(/<link\s+[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["']/i);
  if (canonicalMatch) meta.canonical = canonicalMatch[1];

  return meta;
}

function checkRequiredTags(meta) {
  const issues = [];

  for (const req of REQUIRED_TAGS) {
    const value = meta[req.tag];

    if (!value || value.trim() === '') {
      issues.push({ tag: req.tag, severity: req.severity, message: `Tag ${req.tag} no encontrado` });
      continue;
    }

    if (req.minLength && value.length < req.minLength) {
      issues.push({
        tag: req.tag,
        severity: 'warning',
        message: `${req.tag} tiene ${value.length} chars (mínimo recomendado: ${req.minLength})`
      });
    }

    if (req.maxLength && value.length > req.maxLength) {
      issues.push({
        tag: req.tag,
        severity: 'warning',
        message: `${req.tag} tiene ${value.length} chars (máximo recomendado: ${req.maxLength})`
      });
    }
  }

  return issues;
}

module.exports = { parseMetaTags, checkRequiredTags, REQUIRED_TAGS };

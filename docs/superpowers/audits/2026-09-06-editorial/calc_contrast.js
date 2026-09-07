// Cálculo de ratios de contraste WCAG 2.1
// Fórmula: https://www.w3.org/TR/WCAG21/#dfn-contrast-ratio
// L (relative luminance) = 0.2126*R + 0.7152*G + 0.0722*B
// Ratio = (L1 + 0.05) / (L2 + 0.05) where L1 = lighter

function hexToRgb01(hex) {
  const h = hex.replace('#', '');
  const r = parseInt(h.substring(0, 2), 16) / 255;
  const g = parseInt(h.substring(2, 4), 16) / 255;
  const b = parseInt(h.substring(4, 6), 16) / 255;
  return [r, g, b];
}

function channelLuminance(c) {
  return c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function relativeLuminance(hex) {
  const [r, g, b] = hexToRgb01(hex);
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b);
}

function contrastRatio(fg, bg) {
  const L1 = relativeLuminance(fg);
  const L2 = relativeLuminance(bg);
  const lighter = Math.max(L1, L2);
  const darker = Math.min(L1, L2);
  return (lighter + 0.05) / (darker + 0.05);
}

function evaluate(ratio) {
  const aaNormal = ratio >= 4.5;
  const aaLarge = ratio >= 3.0;
  return {
    ratio: ratio.toFixed(2),
    aaNormal: aaNormal ? '✓' : '✗',
    aaLarge: aaLarge ? '✓' : '✗',
    passNormal: aaNormal,
    passLarge: aaLarge
  };
}

const bg = '#0a0a0a';
const pairs = [
  { label: 'body text (--text)', fg: '#e8e8e8', bg: bg },
  { label: 'text-soft (--text-soft)', fg: '#a8a8a8', bg: bg },
  { label: 'text-mute (--text-mute)', fg: '#707070', bg: bg },
  { label: 'accent (--accent)', fg: '#c2410c', bg: bg },
  { label: 'accent-bright (--accent-bright)', fg: '#ea580c', bg: bg },
  { label: 'gold (--gold)', fg: '#fbbf24', bg: bg },
  { label: 'green (--green)', fg: '#10b981', bg: bg },
  { label: 'red (--red)', fg: '#dc2626', bg: bg },
  { label: 'blue (--blue)', fg: '#3b82f6', bg: bg },
  { label: 'purple (--purple)', fg: '#a855f7', bg: bg },
  // Disclaimer: gradient(var(--red-soft), #581c1c) base, #fff text. Take the lighter (smaller contrast) end:
  { label: 'disclaimer #fff / #7f1d1d (--red-soft)', fg: '#ffffff', bg: '#7f1d1d' },
  { label: 'disclaimer #fff / #581c1c (gradient end)', fg: '#ffffff', bg: '#581c1c' },
  // .pill.danger
  { label: '.pill.danger #fff / var(--red-soft) #7f1d1d', fg: '#ffffff', bg: '#7f1d1d' },
  // .pill.warn
  { label: '.pill.warn #fef3c7 / #78350f', fg: '#fef3c7', bg: '#78350f' },
  // .pill.ok
  { label: '.pill.ok #d1fae5 / #064e3b', fg: '#d1fae5', bg: '#064e3b' },
  // .pill.info
  { label: '.pill.info #dbeafe / #1e3a8a', fg: '#dbeafe', bg: '#1e3a8a' },
  // alert: rgba(220,38,38,0.1) sobre bg #0a0a0a = #2a1212 aprox, color inherit (--text)
  { label: '.alert (text --text #e8e8e8) / rgba(220,38,38,0.1) + bg #0a0a0a → ~#2a1212', fg: '#e8e8e8', bg: '#2a1212' },
  // callout: rgba(251,191,36,0.08) sobre bg → ~#1e1810, color inherit
  { label: '.callout (text --text) / rgba(251,191,36,0.08) + bg #0a0a0a → ~#1e1810', fg: '#e8e8e8', bg: '#1e1810' },
  // header bg = rgba(10,10,10,0.95) sobre --bg → ~#0a0a0a (effectively same)
  { label: 'header (text --text) / rgba(10,10,10,0.95) over #0a0a0a → ~#0a0a0a', fg: '#e8e8e8', bg: '#0a0a0a' },
  // Source citation muted links?
  { label: 'source-domain #707070 / #0a0a0a (duplicado text-mute)', fg: '#707070', bg: bg },
];

console.log('Pair | Ratio | AA normal (≥4.5) | AA large (≥3.0)');
console.log('--- | --- | --- | ---');
for (const p of pairs) {
  const r = contrastRatio(p.fg, p.bg);
  const e = evaluate(r);
  console.log(`${p.label} | ${e.ratio} | ${e.aaNormal} | ${e.aaLarge}`);
}

// add_inline_links.js
// Añade hipervínculos inline a entidades en index.html

const fs = require('fs');
const path = require('path');

const HTML_PATH = 'D:/AI/Investigaciones/Periodismo politico-economico/index.html';

// Diccionario: entidad -> URL (orden importa: claves más largas primero)
const ENTITIES = [
  ['Elbit Systems', 'https://elbitsystems.com/'],
  ['Lockheed Martin', 'https://www.lockheedmartin.com/'],
  ['Leonardo S.p.A.', 'https://www.leonardo.com/en'],
  ['BlackRock', 'https://www.blackrock.com/co'],
  ['JP Morgan', 'https://www.jpmorgan.com/'],
  ['IAI / Rafael', 'https://www.iai.co.il/'],
  ['Open Society', 'https://www.opensocietyfoundations.org/'],
  ['Caterpillar', 'https://www.caterpillar.com/'],
  ['Francesca Albanese', 'https://www.ohchr.org/en/special-procedures/sr-palestine'],
  ['Fernando Cerimedo', 'https://en.wikipedia.org/wiki/Fernando_Cerimedo'],
  ['Abelardo de la Espriella', 'https://es.wikipedia.org/wiki/Abelardo_de_la_Espriella'],
  ['Consejo Nacional Electoral', 'https://www.cne.gov.co/'],
  ['Consejo de Estado', 'https://www.consejodeestado.gov.co/'],
  ['Fondo de Pensiones de Noruega', 'https://www.regjeringen.no/en/topics/the-economy/the-government-pension-fund/'],
  ['Fondo de Pensiones Noruego', 'https://www.regjeringen.no/en/topics/the-economy/the-government-pension-fund/'],
  ['Fondo Noruego', 'https://www.regjeringen.no/en/topics/the-economy/the-government-pension-fund/'],
  ['Cuestión Pública', 'https://cuestionpublica.com/'],
  ['La Silla Vacía', 'https://www.lasillavacia.com/'],
  ['La Pulla', 'https://www.youtube.com/@LaPulla'],
  ['El Espectador', 'https://www.elespectador.com/'],
  ['ColombiaCheck', 'https://colombiacheck.com/'],
  ['Razón Pública', 'https://razonpublica.com/'],
  ['Jens Stoltenberg', 'https://en.wikipedia.org/wiki/Jens_Stoltenberg'],
  ['Thomas Greg', 'https://www.thomasgreg.com/'],
  ['Brad Parscale', 'https://en.wikipedia.org/wiki/Brad_Parscale'],
  ['Vivek Ramaswamy', 'https://en.wikipedia.org/wiki/Vivek_Ramaswamy'],
  ['Sundar Pichai', 'https://en.wikipedia.org/wiki/Sundar_Pichai'],
  ['Rodrigo Paz', 'https://es.wikipedia.org/wiki/Rodrigo_Paz_Pereira'],
  ['Javier Negre', 'https://en.wikipedia.org/wiki/Javier_Negre'],
  ['Gustavo Petro', 'https://es.wikipedia.org/wiki/Gustavo_Petro'],
  ['Grupo Aval', 'https://www.grupoaval.com/'],
  ['de la Espriella', 'https://es.wikipedia.org/wiki/Abelardo_de_la_Espriella'],
  ['Stoltenberg', 'https://en.wikipedia.org/wiki/Jens_Stoltenberg'],
  ['CIPER', 'https://www.ciperchile.cl/'],
  ['Valorem', 'https://www.valorem.com.co/'],
  ['Cerimedo', 'https://en.wikipedia.org/wiki/Fernando_Cerimedo'],
  ['Porvenir', 'https://www.porvenir.com.co/'],
  ['Negre', 'https://en.wikipedia.org/wiki/Javier_Negre'],
  ['Petro', 'https://es.wikipedia.org/wiki/Gustavo_Petro'],
  ['Protección', 'https://www.proteccion.com/'],
  ['Colfondos', 'https://www.colfondos.com.co/'],
  ['Lockheed', 'https://www.lockheedmartin.com/'],
  ['Leonardo', 'https://www.leonardo.com/en'],
  ['Caterpillar', 'https://www.caterpillar.com/'],
  ['Vanguard', 'https://investor.vanguard.com/'],
  ['Barclays', 'https://www.barclays.co.uk/'],
  ['Invesco', 'https://www.invesco.com/'],
  ['Palantir', 'https://www.palantir.com/'],
  ['Skandia', 'https://www.skandia.com.co/'],
  ['Sura', 'https://www.segurossura.com.co/'],
  ['Comunican', 'https://comunicansa.com/'],
  ['USAID', 'https://www.usaid.gov/'],
  ['Noruega', 'https://www.regjeringen.no/'],
  ['Albanese', 'https://www.ohchr.org/en/special-procedures/sr-palestine'],
  ['Bautista', 'https://www.thomasgreg.com/'],
  ['Santo Domingo', 'https://es.wikipedia.org/wiki/Familia_Santo_Domingo'],
  ['Infobae', 'https://www.infobae.com/'],
  ['El Tiempo', 'https://www.eltiempo.com/'],
  ['Wikipedia', 'https://es.wikipedia.org/'],
  ['Registraduría', 'https://www.registraduria.gov.co/'],
  ['CPI', 'https://www.icc-cpi.int/'],
  ['OTAN', 'https://www.nato.int/'],
  ['IAI', 'https://www.iai.co.il/'],
  ['Rafael', 'https://www.iai.co.il/'],
  ['NED', 'https://www.ned.org/'],
  ['Meta', 'https://about.meta.com/'],
  ['CNE', 'https://www.cne.gov.co/'],
  ['Fiscalía', 'https://www.fiscalia.gov.co/'],
  ['Forbes', 'https://www.forbes.com/'],
  ['RTVC', 'https://www.rtvcnoticias.com/'],
  ['Semana', 'https://www.semana.com/'],
  ['Portafolio', 'https://www.portafolio.co/'],
  ['RAYA', 'https://revistaraya.com/'],
  ['ONU', 'https://www.un.org/'],
];

// Quitar duplicados preservando orden
const seen = new Set();
const UNIQUE_ENTITIES = [];
for (const [name, url] of ENTITIES) {
  if (!seen.has(name)) {
    seen.add(name);
    UNIQUE_ENTITIES.push([name, url]);
  }
}

function escapeRegex(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function isInsideAttribute(html, pos) {
  // Busca hacia atrás el último '<' y adelante el próximo '>'
  const start = html.lastIndexOf('<', pos);
  const end = html.indexOf('>', start);
  if (end === -1 || end < pos) return false;
  const tagContent = html.substring(start, end + 1);
  // ¿Hay un href=, src=, alt=, title= o xlink:href= en este tag y la posición cae dentro del valor?
  const attrs = ['href=', 'src=', 'alt=', 'title=', 'xlink:href='];
  for (const attr of attrs) {
    const idx = tagContent.indexOf(attr);
    if (idx === -1) continue;
    const quote = tagContent[idx + attr.length];
    if (quote !== '"' && quote !== "'") continue;
    const valueStart = start + idx + attr.length + 1;
    const closeQuote = tagContent.indexOf(quote, idx + attr.length + 1);
    if (closeQuote === -1) continue;
    const valueEnd = start + closeQuote;
    if (valueStart <= pos && pos < valueEnd) return true;
  }
  return false;
}

function isInsideAnchor(html, pos) {
  // Busca la última <a> abierta y el último </a> cerrado antes de pos
  const openA1 = html.lastIndexOf('<a ', pos);
  const openA2 = html.lastIndexOf('<a\t', pos);
  const openA3 = html.lastIndexOf('<a\n', pos);
  const openA = Math.max(openA1, openA2, openA3);
  const closeA = html.lastIndexOf('</a>', pos);
  return openA > closeA;
}

function isInsideScriptOrStyle(html, pos) {
  const scriptStart = html.lastIndexOf('<script', pos);
  const scriptEnd = html.lastIndexOf('</script>', pos);
  if (scriptStart > scriptEnd) return true;
  const styleStart = html.lastIndexOf('<style', pos);
  const styleEnd = html.lastIndexOf('</style>', pos);
  if (styleStart > styleEnd) return true;
  return false;
}

function addInlineLinkInSection(content, entity, url) {
  const re = new RegExp(escapeRegex(entity), 'gi');
  let m;
  while ((m = re.exec(content)) !== null) {
    const start = m.index;
    const end = start + m[0].length;
    if (isInsideAttribute(content, start)) continue;
    if (isInsideAnchor(content, start)) continue;
    if (isInsideScriptOrStyle(content, start)) continue;
    // Encontró lugar válido: reemplazar solo esta primera
    const original = content.substring(start, end);
    const replacement = `<a class="inline-link" href="${url}" target="_blank" rel="noopener">${original}</a>`;
    content = content.substring(0, start) + replacement + content.substring(end);
    return { content, count: 1 };
  }
  return { content, count: 0 };
}

function splitIntoSections(html) {
  const re = /(<h[23][^>]*>.*?<\/h[23]>)/gs;
  const parts = html.split(re);
  const sections = [];
  sections.push({ name: '__pre__', content: parts[0] });
  for (let i = 1; i < parts.length; i += 2) {
    const header = parts[i];
    const body = parts[i + 1] || '';
    const name = header.replace(/<[^>]+>/g, '').trim().substring(0, 80);
    sections.push({ name, content: header + body });
  }
  return sections;
}

function main() {
  const original = fs.readFileSync(HTML_PATH, 'utf8');
  const sections = splitIntoSections(original);
  console.log(`Encontradas ${sections.length} secciones (incluyendo pre)`);

  let totalReplacements = 0;
  const newSections = sections.map(({ name, content }) => {
    if (name === '__pre__') return content;
    let count = 0;
    for (const [entity, url] of UNIQUE_ENTITIES) {
      const result = addInlineLinkInSection(content, entity, url);
      content = result.content;
      count += result.count;
    }
    totalReplacements += count;
    return content;
  });

  const newHtml = newSections.join('');
  fs.writeFileSync(HTML_PATH, newHtml, 'utf8');
  console.log(`Reemplazos totales: ${totalReplacements}`);
  console.log(`Tamaño: ${original.length} -> ${newHtml.length} caracteres (+${newHtml.length - original.length})`);
}

main();

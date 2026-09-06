# Tu plata en la guerra, tu opinión en venta

> ### 📖 **LEE LA INVESTIGACIÓN AQUÍ:** [https://TU-USER.github.io/tu-plata-en-la-guerra/](https://TU-USER.github.io/tu-plata-en-la-guerra/)
>
> *(Reemplaza `TU-USER` por tu nombre de usuario de GitHub una vez deployed)*

Investigación periodística independiente sobre la cadena de dinero colombiano que financia (presuntamente) la guerra en Gaza, la red de medios que la cubre, y el ecosistema digital que moldea la opinión pública colombiana.

**Estado del proyecto:** Dosier de fuentes verificadas + dashboard interactivo público.

**Disclaimer:** Toda la información contenida en este repositorio proviene de fuentes públicas y verificables citadas en cada sección. Se utiliza el término "presuntamente" en todas las afirmaciones que implican responsabilidad penal o civil de personas naturales o jurídicas, según el principio de presunción de inocencia y para minimizar riesgo de demandas. Este material está en desarrollo y se actualizará con nuevas fuentes.

---

## 🎯 ¿Qué hay aquí?

- **`index.html`** (172 KB) — Dashboard interactivo público. **Este es el entregable principal.** Cualquier persona puede abrirlo sin instalar nada.
- **`DOSIER_COMPLETO.md`** (62 KB) — Dosier consolidado con todas las fuentes citadas.
- **`evidencia/`** — 15 pruebas visuales (JPG + HTML editable) con citas textuales resaltadas.
- **`tools/`** — Scripts de auditoría automatizada (link checker, grammar checker, generador de inline-links).
- **`docs/superpowers/`** — Spec + plan de la auditoría de integridad (transparencia metodológica).
- **Reportes:** `AUDIT_SUMMARY.md`, `link_audit_report.md`, `grammar_audit_report.md`, `semantic_audit_report.md`, `fixes_applied.md`.

## 🚀 Deploy

Para publicar la página, sigue [`DEPLOY.md`](DEPLOY.md). En resumen:

1. Crea un repo público en GitHub
2. Conecta y haz push
3. Activa GitHub Pages (Settings → Pages → `main` branch + `/ (root)`)
4. Tu URL pública: `https://TU-USER.github.io/tu-plata-en-la-guerra/`

## 📂 Estructura completa

```
.
├── README.md                          ← este archivo
├── DEPLOY.md                          ← guía paso a paso para GitHub Pages
├── index.html                         ← dashboard interactivo (entregable principal)
├── DOSIER_COMPLETO.md                 ← dosier consolidado
├── PLAN_CORROBORACION.md              ← plan de verificación
│
├── AUDIT_SUMMARY.md                   ← resumen de auditoría de integridad
├── fixes_applied.md                   ← log de correcciones aplicadas
├── link_audit_report.md / .json       ← resultados validación de 306 links
├── grammar_audit_report.md            ← resultados LanguageTool (588 matches)
├── semantic_audit_report.md           ← resultados revisión subagentes (88 hallazgos)
│
├── evidencia/                         ← 15 pruebas visuales + HTMLs fuente
│   ├── prueba-01-sentencia-consejo-estado-1412-mesas.{jpg,html}
│   ├── prueba-02-cuestion-publica.{jpg,html}
│   ├── prueba-03-fondo-noruego.{jpg,html}
│   ├── prueba-04-albanese-63-estados.{jpg,html}
│   ├── prueba-05-cerimedo-audiencia.{jpg,html}
│   ├── prueba-06-petro-afp.{jpg,html}
│   ├── prueba-07-stoltenberg.{jpg,html}
│   ├── prueba-08-auto-2-marzo-2018.{jpg,html}
│   ├── prueba-09-decreto-petro.{jpg,html}
│   ├── prueba-10-resolucion-3006.{jpg,html}
│   ├── prueba-11-resolucion-12-2014.{jpg,html}
│   ├── prueba-12-ley-185-1990.{jpg,html}
│   ├── prueba-13-cpaca-288.{jpg,html}
│   ├── prueba-14-ciper-chile.{jpg,html}
│   └── prueba-15-razon-publica-thomas-greg.{jpg,html}
│
├── tools/                             ← scripts de auditoría
│   ├── audit_links.js                 ← valida 306 links con HEAD requests
│   ├── audit_grammar.js               ← llama LanguageTool API
│   ├── add_inline_links.js            ← genera inline-links en menciones
│   └── test_audit_links.js            ← tests TDD
│
├── docs/superpowers/                  ← transparencia metodológica
│   ├── specs/2026-09-02-audit-html-integrity-design.md
│   └── plans/2026-09-02-audit-html-integrity.md
│
└── .gitignore
```

## 🎬 Cómo usar este material

1. **Como página pública** (recomendado): una vez deployed, compartir la URL con quien quieras que vea la investigación.
2. **Como herramienta de trabajo en edición:** abrir `index.html` localmente en cualquier navegador (es autocontenido, no necesita servidor).
3. **Para citar en un video o nota:** el formato sugerido es "[Afirmación] — Fuente: [Medio], [fecha], [URL]".

## 📐 Reglas de citación y rigor

- Toda cifra tiene que tener fuente verificable enlazada.
- Toda persona mencionada en contexto negativo debe ir con "presuntamente" o con cita textual entre comillas.
- Ningún titular que no pueda respaldarse con al menos DOS fuentes independientes.
- Si una fuente contradice a otra, se reportan las dos y se marca la discrepancia.
- Las traducciones del italiano/inglés/portugués son propias; los originales están enlazados.

## 🖼️ Galería de pruebas periodísticas (15 piezas)

En `evidencia/` se almacenan 15 reproducciones visuales de documentos originales con la cita textual resaltada en amarillo, organizadas para usarlas como recurso gráfico en los video-reportajes. Cada prueba tiene su archivo `.jpg` (captura) y su `.html` fuente (editable). Todas están embebidas en la sección 06.6 del `index.html`.

| # | Prueba | Cubre | Prueba documental |
|---|--------|-------|---|
| 1 | Sentencia Consejo de Estado (8 feb 2018) | 1.412 mesas saboteadas | VLex · PDF AFP Factual |
| 2 | Cuestión Pública | $17 billones AFP en Gaza | cuestionpublica.com |
| 3 | Fondo Noruego Annual Report 2025 | Exclusión Caterpillar | regjeringen.no |
| 4 | Informe Albanese (20 oct 2025) | 63 estados cómplices | UN UNISPAL |
| 5 | Audiencia Cerimedo (28 ago 2026) | USD 1M/mes | Infobae |
| 6 | Petro textual sobre AFP | 30% exterior | Revista Semana |
| 7 | Stoltenberg reverso noruego | Pausa desinversión | JNS · Forbes · CNBC |
| 8 | AUTO 2 marzo 2018 | Niega anulación a García Romero | VLex |
| 9 | Decreto Petro enero 2026 | Repatriación AFP $100B | Infobae · El Espectador |
| 10 | Resolución 3006/2014 CNE | Elección senadores anulada | VLex |
| 11 | Resolución 12/2014 CED Bogotá | Escrutinios anulados | VLex |
| 12 | Ley 185/1990 Italia | Control exportaciones armamento | Infodifesa · L'Indipendente |
| 13 | Ley 1437/2011 CPACA art. 288 | Efectos sentencia electoral | VLex · Función Pública |
| 14 | CIPER Chile | AFP chilenas US$34,5M en armas | ciperchile.cl |
| 15 | Razón Pública Thomas Greg | Contrato $2,75B + corrección | razonpublica.com · RTVC |

> 📌 **Cobertura:** las 15 pruebas cubren todas las menciones legales centrales (sentencias, autos, resoluciones, leyes, decretos). Ver `PLAN_CORROBORACION.md` para la auditoría completa de cobertura.

## 📑 Temas cubiertos

1. **Quién controla La Pulla y El Espectador** (Valorem, Grupo Santo Domingo)
2. **El dinero de las pensiones que financia la guerra en Gaza** (Porvenir, Protección, Colfondos, Skandia)
3. **El precedente del Fondo de Pensiones Noruego** (desinversión ética de Caterpillar y bancos israelíes)
4. **El informe de Francesca Albanese y los 63 estados cómplices** (incluyendo Italia)
5. **Fernando Cerimedo y Numen Group** (audiencia 28/08/2026, estructura empresarial)
6. **Javier Negre y La Derecha Diario Colombia** (conexión con campaña De la Espriella)
7. **Los hermanos Bautista y Thomas Greg & Sons** (contratos electorales, presunto pacto)
8. **Las elecciones de Colombia 2026** (resultados, denuncias de fraude, margen)
9. **Quién financia a La Silla Vacía y ColombiaCheck** (USAID, NED, Open Society, Meta)

## ✅ Calidad verificada

- **306 links validados** con HTTP requests reales (`link_audit_report.md`)
- **588 patrones gramaticales revisados** con LanguageTool API (`grammar_audit_report.md`)
- **88 hallazgos semánticos** detectados y 9 corregidos automáticamente (`semantic_audit_report.md`, `fixes_applied.md`)
- **4 fases de auditoría** ejecutadas con subagentes en paralelo (ver `docs/superpowers/`)

## 🛠️ Próximas fases (no incluidas en este entregable)

- Fase 2: Guión de los 3 videos (basado en este dosier)
- Fase 3: Producción audiovisual
- Fase 4: Publicación y promoción

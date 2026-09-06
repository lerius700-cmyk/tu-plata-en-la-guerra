# Plan de auditoría editorial profunda de "Tu plata en la guerra"

**Fecha:** 2026-09-06
**Proyecto:** Periodismo político-económico
**Target:** `D:\AI\Investigaciones\Periodismo politico-economico\index.html` (versión local, 172 KB, 1906 líneas)
**Solicitado por:** Lerius
**Aprobación:** pendiente

## Contexto

El HTML `index.html` fue auditado técnicamente el 2026-09-02 (4 fases: links, grammar, semántica, fixes aplicados), resultó en 9 correcciones críticas aplicadas y fue deployado a `https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/` el 2026-09-06.

Han pasado 5 días desde la última auditoría. El usuario solicita una **segunda ronda de auditoría más profunda** que vaya más allá de los checks técnicos básicos y evalúe la página como **producto editorial publicable**, respondiendo a tres preguntas:

1. ¿La información está completa y tiene **coherencia narrativa** entre las 13 secciones?
2. ¿Existen **hilos transitorios** (conexiones temáticas) explícitos que el lector pueda seguir?
3. ¿La página cumple estándares de **accesibilidad, SEO, freshness y code quality** para una audiencia amplia?

A diferencia de la primera auditoría (puramente técnica), esta nueva ronda adopta la perspectiva de un editor y un revisor de calidad, complementada con verificación visual, herramientas WCAG, validación de meta tags y búsqueda activa de developments noticiosos posteriores al 1 de septiembre.

## Objetivos

1. **Re-auditar técnicamente** la página para detectar regresiones desde el 1 de septiembre (links muertos nuevos, cambios en fuentes, retractaciones).
2. **Verificar visualmente** las 13 secciones en desktop y mobile, capturando evidencia en screenshots.
3. **Auditar accesibilidad** bajo WCAG 2.1 (contraste, navegación por teclado, ARIA, alt text).
4. **Implementar SEO + Open Graph** para que el link compartido en redes sociales tenga preview atractivo.
5. **Verificar freshness** de las fuentes y buscar activamente developments noticiosos sobre Cerimedo, Petro, Thomas Greg, elecciones 2026, AFP, La Pulla y USAID entre el 1 y el 6 de septiembre.
6. **Mapear los 4 hilos transitorios** (dinero, operadores políticos, espejo mediático, legal) que cruzan las 13 secciones, identificando puntos donde la conexión se debilita.
7. **Hacer code review** del HTML/CSS/JS (1906 líneas) y validar la integridad sintáctica y estructural.
8. **Producir un reporte consolidado** `AUDIT_EDITORIAL_v2.md` con todos los hallazgos y fixes aplicados.

## Out of scope (explícito)

Para mantener la auditoría en 3-5 días:

- ❌ No se rediseña visualmente la página (colores, layout, tipografías)
- ❌ No se refactoriza el `index.html` en múltiples archivos
- ❌ No se agrega backend, CMS o base de datos
- ❌ No se reabre la auditoría semántica exhaustiva de la primera ronda (ya corregida)
- ❌ No se hace fact-check de cada afirmación contra fuente primaria (solo freshness)
- ❌ No se contrata editor externo
- ❌ No se cambia la licencia del contenido
- ❌ No se hace backup explícito (git + 4 commits son suficientes)

Si algo de esto resulta necesario durante la auditoría, se registra como "fuera de scope" en el reporte y se discute con el usuario antes de proceder.

## Hilos transitorios a auditar

Estos son los 4 hilos narrativos explícitos que cruzan las 13 secciones. La auditoría debe validar que cada uno esté claramente hilado y que el lector pueda seguir el flujo sin saltos abruptos.

### Hilo A — El dinero (de la AFP a la bomba)

```
AFP (Porvenir / Protección / Colfondos / Skandia)
  ↓ inversión exterior 48,8% ($257B)
BlackRock / Vanguard / Barclays / JP Morgan / Invesco
  ↓ participaciones
Elbit Systems + Lockheed Martin + Leonardo + Caterpillar + Palantir
  ↓ fabricación
Bombas JDAM / Drones Hermes 900 / D9 / M-346 / Sa'ar 6
  ↓ uso
Gaza
```

**Secciones que toca:** 02 (Pensiones) → 03 (Noruega) → 04 (Albanese) → 05 (Italia) → 06 (Empresas) → 06.6 (Pruebas)
**Coherence test:** ¿el lector puede seguir este flujo leyendo en orden? ¿Hay saltos? ¿Faltan eslabones?

### Hilo B — Los operadores políticos (la red internacional)

```
Cerimedo (Argentina, Numen Group)
  ↓ alianza
Rodrigo Paz (Bolivia, asesoró)
  ↓ ex socio
Javier Negre (España, La Derecha Diario)
  ↓ campaña
Abelardo de la Espriella (Colombia)
  ↓ presunta negociación
Bautista / Thomas Greg & Sons (software electoral)
  ↓
Elecciones 2026 (margen 0,96%)
```

**Secciones:** 07 (Cerimedo) → 08 (Negre) → 09 (Bautista) → 10 (Elecciones)
**Coherence test:** ¿se explica claramente la conexión Cerimedo→Negre→De la Espriella→Thomas Greg? ¿Las fechas encajan? ¿Las fuentes son consistentes?

### Hilo C — El espejo mediático (todos foreign-funded)

```
Lado "izquierda": La Silla Vacía (USAID+Meta) + ColombiaCheck (NED+Google+MS) + La Pulla (USAID+Open Society)
  vs
Lado "derecha": La Derecha Diario (Bautista+Heritage+CSIS+Atlantic Council)
  ↕ ambos lados
Valorem / Santo Domingo (La Pulla) + Meta + USAID + NED + Open Society
```

**Secciones:** 01 (La Pulla) → 08 (Negre) → 11 (Medios)
**Coherence test:** ¿se explica claramente que ambos "lados" están financiados por dinero extranjero? ¿El lector puede ver el patrón? ¿Hay contradicciones internas entre lo que se dice sobre La Pulla y lo que se dice sobre los otros medios?

### Hilo D — El legal (sentencia 2018 → elecciones 2026)

```
Sentencia Consejo de Estado 8 feb 2018 (1.412 mesas, 3.630 registros)
  ↓ compulsó copias
Fiscalía (sin avances documentados)
  ↓ antecedentes
Thomas Greg & Sons (26/27 contratos electorales desde 2007)
  ↓ software
Elecciones 2026 (denuncias de Petro sobre presuntas modificaciones de IP)
  ↓ actualmente
Investigación abierta
```

**Secciones:** 09 (Bautista) → 10 (Elecciones) → 12 (Metodología)
**Coherence test:** ¿la cadena causal está bien hilada? ¿Faltan eslabones entre 2018 y 2026? ¿Las cifras de la sentencia se mantienen consistentes con lo que Petro afirma públicamente?

**Output esperado de Fase 5:** mapa visual (SVG embebido en `05_coherence_threads.md`) con los 4 hilos, marcando en rojo los puntos donde la conexión se rompe o se debilita.

## Fases de la auditoría (8 fases, Fase 0 a Fase 7)

### Fase 0 — Setup del workspace (~30 min)

**Acciones:**
- Crear directorio `docs/superpowers/audits/2026-09-06-editorial/`
- Crear subdirectorios: `02_visual/`, `screenshots/`
- Crear `00_plan.md` (este documento, mirror) + plantillas vacías para cada reporte
- Crear branch git `audit/2026-09-06-editorial` para no contaminar `main` hasta que se aprueben los fixes

**Skill usada:** `superpowers:writing-plans` (descomposición atómica de tareas)
**Entregable:** workspace listo, branch creado

### Fase 1 — Re-auditoría técnica base (~2-3h)

**Acciones:**
- Re-correr `tools/audit_links.js` contra el HTML actual → comparar contra el reporte del 1 sep
- Re-correr `tools/audit_grammar.js` → comparar contra los 587 matches del 1 sep
- Re-correr revisión semántica (manual o con subagente) sobre las correcciones aplicadas para confirmar que se mantienen
- Generar `01_re_audit_delta.md` con tabla de cambios: `+X OK / -Y broken / +Z nuevos broken`

**Skill usada:** bash + node, ejecución de scripts existentes
**Entregable:** `01_re_audit_delta.md` con la tabla delta

### Fase 2 — Verificación visual con screenshots (~2-3h)

**Acciones:**
- Abrir cada una de las 13 secciones en el browser (local con `file://` o servidor Python simple)
- Capturar screenshot desktop (1920×1080) y mobile (375×812) de cada una
- Detectar issues visuales: overflow horizontal, contraste bajo, alineación rota, elementos cortados, imágenes rotas, links que no se ven
- Generar `02_visual_issues.md` con lista priorizada de issues + screenshot por issue

**Skill usada:** `control-in-app-browser`, `mcode-tools-master` (si aplica para capturas automatizadas)
**Entregable:** 26+ screenshots + `02_visual_issues.md`

### Fase 3 — Accesibilidad WCAG 2.1 (~3-4h)

**Acciones:**
- Instalar y configurar `axe-core` (CLI o via Node) → crear `tools/audit_accessibility.js`
- Escribir tests con `superpowers:test-driven-development` antes del script
- Ejecutar axe-core sobre el HTML → identificar violaciones WCAG 2.1 nivel A y AA
- Auditoría manual complementaria:
  - Navegación con teclado (Tab, Enter, Escape)
  - Focus visible en todos los elementos interactivos
  - ARIA labels en los 16 chain-links del SVG, 25 stat cards, 270 inline-links
  - Alt text en las 15 imágenes de prueba
  - Contraste de colores según WCAG AA (4.5:1 texto normal, 3:1 texto grande)
  - Lenguaje del documento declarado (`<html lang="es">`)
- Generar `03_accessibility.md` con issues priorizados y fixes propuestos

**Skill usada:** `code-review`, `superpowers:test-driven-development`
**Entregable:** `03_accessibility.md` + `tools/audit_accessibility.js` + tests

### Fase 4 — SEO + Open Graph (~2-3h)

**Acciones:**
- Inventariar meta tags actuales (description, keywords, robots)
- Diseñar e implementar:
  - `<meta name="description">` (155-160 chars)
  - Open Graph: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `og:site_name`, `og:locale`
  - Twitter Card: `twitter:card=summary_large_image`, `twitter:title`, `twitter:description`, `twitter:image`, `twitter:site`
  - JSON-LD `NewsArticle` schema con author, datePublished, dateModified, image, publisher
  - `<link rel="canonical">` apuntando a la URL de GitHub Pages
  - `og:image` debe ser una imagen 1200×630 (generar si no existe)
- Validar con Google Rich Results Test (vía `web_fetch` con la URL pública)
- Generar `04_seo_og.md` con cambios aplicados + capturas de la validación

**Skill usada:** `web_search` (lookup de best practices), `web_fetch` (validación)
**Entregable:** `04_seo_og.md` + meta tags implementados en `index.html`

### Fase 5 — Freshness + coherence threads (~6-8h)

**Acciones de freshness:**
- Para cada uno de los 7 temas clave (Cerimedo, Petro, Thomas Greg, elecciones 2026, AFP, La Pulla, USAID), ejecutar `web_search` filtrado por fecha (después del 1 sep 2026)
- Documentar developments nuevos en `05_freshness.md` con: título, fuente, URL, fecha, resumen 1-2 líneas
- Si hay developments críticos (escándalos nuevos, retractaciones, condenas), evaluar si deben agregarse al HTML con su cita textual
- Re-verificar con HEAD requests los 41 links que estaban broken en la auditoría anterior (algunos pudieron haberse arreglado o empeorado)

**Acciones de coherence:**
- Leer secuencialmente las 13 secciones
- Mapear manualmente cada mención de los 4 hilos (A, B, C, D) a la sección donde aparece
- Identificar puntos de ruptura: ¿dónde se menciona Cerimedo sin conectar con Negre? ¿dónde se habla del dinero AFP sin conectar con Elbit?
- Crear mapa visual SVG de los 4 hilos con código de color:
  - Verde: conexión explícita y bien hilada
  - Amarillo: conexión implícita, requiere que el lector la deduzca
  - Rojo: ruptura, salto, contradicción, o mención sin contexto
- Generar `05_coherence_threads.md` con el mapa + lista priorizada de mejoras

**Skill usada:** `web_search`, `web_fetch`, análisis manual
**Entregable:** `05_freshness.md` + `05_coherence_threads.md` con mapa SVG

### Fase 6 — Code review + estructura (~3-4h)

**Acciones:**
- Validación HTML5 con W3C validator (vía `web_fetch` con la URL pública o API)
- Validación CSS (visual, no hay validator CLI estándar; revisión manual de selectores huérfanos, propiedades inválidas)
- Linting JS (el HTML tiene 1 script inline pequeño: el de search box; usar jshint o eslint con config mínima)
- Code review línea por línea del HTML estructural:
  - ¿Hay IDs duplicados? (afecta anclas)
  - ¿Las anclas del sidebar (`#pruebas`, `#cerimedo`, etc.) apuntan a IDs reales?
  - ¿Los `<details>` collapsibles tienen `summary` apropiado?
  - ¿El SVG del flujo AFP tiene `<title>` y `<desc>` para accesibilidad?
- Identificar oportunidades de refactor SIN implementarlas (solo listar)
- Generar `06_code_review.md` con issues priorizados

**Skill usada:** `code-review`, `superpowers:verification-before-completion`
**Entregable:** `06_code_review.md`

### Fase 7 — Integración final y re-verificación (~2h)

**Acciones:**
- Aplicar todos los fixes priorizados (meta tags OG, ARIA labels, alt texts, fixes estructurales)
- Re-correr las 3 herramientas existentes (links, grammar, semantic) para confirmar mejoras
- Re-correr axe-core para confirmar reducción de violaciones WCAG
- Re-validar meta tags con Google Rich Results Test
- Screenshot final de la página completa
- Generar `AUDIT_EDITORIAL_v2.md` consolidado (resumen ejecutivo de 2-3 páginas + links a los 7 reportes detallados)
- Commit + push del branch `audit/2026-09-06-editorial` → abrir PR o merge directo a `main` según preferencia del usuario

**Skill usada:** `superpowers:verification-before-completion`
**Entregable:** `AUDIT_EDITORIAL_v2.md` + branch listo para merge

## Estructura de entregables

```
docs/superpowers/audits/2026-09-06-editorial/
├── 00_plan.md                          ← este documento (mirror)
├── 01_re_audit_delta.md                ← delta vs sep 1
├── 02_visual/
│   ├── desktop_01_resumen.png
│   ├── desktop_02_pensiones.png
│   ├── desktop_03_noruega.png
│   ├── desktop_04_albanese.png
│   ├── desktop_05_italia.png
│   ├── desktop_06_empresas.png
│   ├── desktop_06_6_pruebas.png
│   ├── desktop_07_cerimedo.png
│   ├── desktop_08_negre.png
│   ├── desktop_09_bautista.png
│   ├── desktop_10_elecciones.png
│   ├── desktop_11_medios.png
│   ├── desktop_12_metodologia.png
│   ├── mobile_*.png (13 correspondientes)
│   └── 02_visual_issues.md             ← issues detectados
├── 03_accessibility.md                 ← reporte WCAG
├── 04_seo_og.md                        ← reporte SEO
├── 05_freshness.md                     ← developments nuevos
├── 05_coherence_threads.md             ← mapa de 4 hilos
├── 06_code_review.md                   ← code review
├── 07_final_verification.md            ← verificación final
├── AUDIT_EDITORIAL_v2.md               ← resumen ejecutivo (2-3 páginas)
└── screenshots_mosaico.html            ← galería visual interactiva
```

## Herramientas nuevas (3 scripts Node)

| Script | Propósito | Skill de desarrollo |
|---|---|---|
| `tools/audit_accessibility.js` | Integración axe-core CLI para WCAG 2.1 | `superpowers:test-driven-development` |
| `tools/audit_seo.js` | Validador de meta tags OG/Twitter/JSON-LD | `superpowers:test-driven-development` |
| `tools/audit_freshness.js` | HEAD requests con `If-Modified-Since` para detectar cambios | TDD básico |

## Cambios esperados al `index.html` (estimación)

- ~30 líneas de meta tags nuevos (OG, Twitter, JSON-LD, canonical)
- ~10-15 ARIA labels donde falten (especialmente SVG chain-links y stat cards)
- ~15 alt texts en imágenes de pruebas (algunos pueden tener alt genérico)
- 5-10 fixes estructurales menores (HTML5 semantic, IDs duplicados, anclas rotas)
- **Total estimado:** ~60-80 líneas de diff en `index.html`
- **NO se modifica:** contenido editorial, cifras, afirmaciones, layout visual

## Skills utilizadas (resumen)

| Skill | Fase | Propósito |
|---|---|---|
| `superpowers:brainstorming` | Pre-Fase 0 | Diseño de la auditoría (ya ejecutado) |
| `superpowers:writing-plans` | Fase 0 | Descomposición atómica de tareas |
| `superpowers:test-driven-development` | Fases 3, 4 | TDD para nuevos audit scripts |
| `superpowers:subagent-driven-development` | Fases 1, 5, 6 | Paralelizar auditorías grandes |
| `code-review` | Fases 3, 6 | Revisión manual de HTML/CSS/JS |
| `superpowers:verification-before-completion` | Fases 6, 7 | Validar fixes antes de declarar done |
| `control-in-app-browser` | Fase 2 | Screenshots de las 13 secciones |
| `web_search` | Fases 1, 4, 5 | Verificar links, best practices, freshness |
| `web_fetch` | Fases 4, 6 | Validar contra Google Rich Results, W3C |

## Riesgos identificados

| Riesgo | Probabilidad | Mitigación |
|---|---|---|
| Hallazgos críticos en Fase 5 (coherence) que requieran reescritura significativa | Media | Limitar reescrituras a <50 líneas; si requiere más, registrar como "fuera de scope" y discutir con usuario |
| Links rotos nuevos que ya no se pueden arreglar | Baja | Documentar, agregar nota "(enlace caído, archivado en Wayback Machine)" si aplica |
| axe-core reporta tantas violaciones que el fix se vuelve inmanejable | Baja | Priorizar solo nivel AA; ignorar nivel AAA |
| GitHub Pages no se actualiza tras el push (cache de CDN) | Baja | Verificar con `curl -I` después del push; purgar caché con `?v=2` si necesario |
| Developments noticiosos nuevos que cambien sustancialmente el contenido | Baja | Documentar en `05_freshness.md` pero NO modificar el HTML sin aprobación explícita del usuario |

## Criterio de éxito

La auditoría se considera completa cuando:

1. ✅ Los 7 reportes (01 a 07) están escritos y commiteados en el branch
2. ✅ `AUDIT_EDITORIAL_v2.md` está generado con resumen ejecutivo
3. ✅ Todos los fixes priorizados (P0 y P1) están aplicados al `index.html`
4. ✅ Las 3 herramientas existentes (links, grammar, semantic) muestran mejora o se mantienen estables vs la línea base (no se permiten nuevas regresiones)
5. ✅ axe-core reporta 0 violaciones críticas WCAG 2.1 nivel A
6. ✅ Google Rich Results Test valida los meta tags OG/Twitter/JSON-LD
7. ✅ El branch `audit/2026-09-06-editorial` está listo para merge (o mergeado si el usuario lo aprobó)
8. ✅ La página sigue funcionando offline (self-contained, sin assets externos nuevos que rompan esto)

## Línea base (estado al inicio de la auditoría)

- HTML: 172 KB, 1906 líneas
- Links: 433 totales, 370 OK, 41 broken, 21 error, 1 timeout
- Grammar: 587 matches LanguageTool
- Semántica: 88 hallazgos → 9 corregidos
- Repo: 4 commits en main, deployed en https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/
- Sin meta tags OG, sin Twitter Card, sin JSON-LD
- Sin axe-core ejecutado previamente
- Sin screenshots de referencia
- Sin mapa de coherence threads

---

**Aprobación:** pendiente de revisión por el usuario.

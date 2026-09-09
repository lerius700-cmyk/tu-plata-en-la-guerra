# Auditoría SEO + Open Graph — Reporte consolidado (Fase 4)

**Fecha:** 2026-09-06
**Target:** `D:\AI\Investigaciones\Periodismo politico-economico\index.html` (branch `audit/2026-09-06-editorial`, commit `3344d2d`)
**Herramientas:** `tools/audit_seo.js` (validación de meta tags) + `JSON.parse` local para JSON-LD + `web_fetch` para inspección del sitio en vivo
**Validador humano:** Worker (sesión `mvs_deff1b56c72245e1a7a86bc1fdbce37c`)

## Resumen ejecutivo

| Dimensión | Pre-impl | Post-impl | Estado |
|---|---|---|---|
| Meta description | ✓ (197 chars, sobre max) | ✓ (171 chars, aún sobre max) | 🟡 warning |
| Open Graph | ✗ (0/9) | 9/9 | 🟢 |
| Twitter Card | ✗ (0/4) | 4/4 | 🟢 |
| JSON-LD NewsArticle | ✗ | ✓ (11 keys, válido) | 🟢 |
| Canonical | ✗ | ✓ | 🟢 |
| **Cobertura REQUIRED** | **3/14 (21%)** | **14/14 (100%)** | **🟢** |

> **Nota sobre conteos de OG/Twitter Card:** `audit_seo.js` define 7 `og:*` requeridos (sin contar `og:image:width/height/alt` que son opcionales) y 4 `twitter:*`. En la práctica el HTML implementa 9 etiquetas `og:*` (las 7 REQUIRED + `og:image:width` + `og:image:height` + `og:image:alt`) y 5 `twitter:*` (4 REQUIRED + `twitter:image:alt`). El validador marca 14/14 REQUIRED = 100 %.

## Inventario literal de meta tags (post-impl)

Etiquetas parseadas por `tools/audit_seo.js` desde `index.html` (re-ejecutado en este commit):

| Tag | Valor (extracto) | Longitud |
|---|---|---|
| `title` | `Tu plata en la guerra, tu opinión en venta — Investigación independiente` | 72 |
| `viewport` | `width=device-width, initial-scale=1.0` | 37 |
| `description` | `Investigación periodística sobre el flujo de fondos de pensiones colombianos (AFP) hacia fabricantes de armas usados en Gaza. 50+ fuentes citadas, 15 pruebas documentales.` | **171** |
| `keywords` | `Colombia, pensiones, AFP, Gaza, Valorem, Santo Domingo, La Pulla, Thomas Greg, Cerimedo, USAID, periodismo de investigación` | 123 |
| `author` | `Lerius` | 6 |
| `robots` | `index, follow` | 13 |
| `canonical` | `https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/` | 55 |
| `og:type` | `article` | 7 |
| `og:title` | `Tu plata en la guerra, tu opinión en venta` | 42 |
| `og:description` | `El dinero de las pensiones colombianas termina en fábricas que bombardean Gaza. Esta investigación sigue la cadena, con 50+ fuentes citadas y 15 pruebas documentales.` | 166 |
| `og:url` | `https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/` | 55 |
| `og:site_name` | `Tu plata en la guerra` | 21 |
| `og:locale` | `es_CO` | 5 |
| `og:image` | `…/evidencia/prueba-01-sentencia-consejo-estado-1412-mesas.jpg` | 114 |
| `og:image:width` | `1200` | 4 |
| `og:image:height` | `630` | 3 |
| `og:image:alt` | `Captura de la sentencia del Consejo de Estado con la cita '3.630 registros (1.412 mesas)' resaltada en amarillo` | 114 |
| `twitter:card` | `summary_large_image` | 19 |
| `twitter:title` | `Tu plata en la guerra, tu opinión en venta` | 42 |
| `twitter:description` | `Investigación: el dinero de las pensiones colombianas en fabricantes de armas usados en Gaza. 50+ fuentes citadas.` | 114 |
| `twitter:image` | `…/evidencia/prueba-01-sentencia-consejo-estado-1412-mesas.jpg` | 114 |
| `twitter:image:alt` | `Sentencia del Consejo de Estado con cita resaltada` | 50 |

> Total: 22 meta tags parseados (3 del pre-impl + 19 nuevos). Salida cruda del re-audit en este directorio (`_step1_audit.js` y consola).

## Salida del validador (`tools/audit_seo.js`)

```
=== ISSUES RESTANTES ===
Total issues: 1
  - [warning] description: description tiene 171 chars (máximo recomendado: 160)

=== COBERTURA ===
Tags REQUIRED presentes: 14/14
Tags faltantes: (ninguno)
```

Único issue residual: `description` excede el máximo recomendado de 160 caracteres en 11 unidades (171 − 160 = 11). No es bloqueante (es warning, no error) y los buscadores suelen tolerar hasta ~155-170 chars antes de truncar.

## Validación JSON-LD NewsArticle (local)

Bloque extraído con regex `/<script type="application\/ld\+json">([\s\S]+?)<\/script>/`, parseado con `JSON.parse` nativo de Node 22. **Resultado: JSON válido, schema NewsArticle correcto.**

### Estructura

```json
{
  "@context": "https://schema.org",
  "@type": "NewsArticle",
  "headline": "Tu plata en la guerra, tu opinión en venta",
  "description": "Investigación periodística sobre el flujo de fondos de pensiones colombianos hacia fabricantes de armas usados en Gaza.",
  "image": "https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/evidencia/prueba-01-sentencia-consejo-estado-1412-mesas.jpg",
  "datePublished": "2026-09-01",
  "dateModified": "2026-09-06",
  "author": { "@type": "Person", "name": "Lerius" },
  "publisher": {
    "@type": "Organization",
    "name": "Investigación independiente",
    "logo": { "@type": "ImageObject", "url": "…/prueba-01-sentencia-consejo-estado-1412-mesas.jpg" }
  },
  "mainEntityOfPage": { "@type": "WebPage", "@id": "https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/" },
  "inLanguage": "es-CO"
}
```

### Checklist de campos requeridos (NewsArticle según Google Search Central)

| Campo requerido | Estado | Detalle |
|---|---|---|
| `@context` | ✅ | `https://schema.org` |
| `@type` | ✅ | `NewsArticle` (válido) |
| `headline` | ✅ | 42 chars |
| `image` | ✅ | URL absoluta https válida (114 chars) |
| `datePublished` | ✅ | `2026-09-01` (ISO 8601 YYYY-MM-DD) |
| `author` | ✅ | `Person` con `name` |
| `publisher` | ✅ | `Organization` con `name` y `logo` (`ImageObject` con `url`) |
| **Campos opcionales presentes** | ✅ | `description`, `dateModified` (2026-09-06), `mainEntityOfPage` (WebPage con @id), `inLanguage` (es-CO) |
| **Total de keys top-level** | — | 11 keys |

### Validaciones adicionales

- **Fechas:** ambas en formato ISO 8601 (`YYYY-MM-DD`), válidas.
- **URLs:** las 3 URLs presentes (`image`, `mainEntityOfPage.@id`, `publisher.logo.url`) son absolutas con `https://` y dominio `lerius700-cmyk.github.io`.
- **Tipos anidados:** `author` es `Person`, `publisher` es `Organization`, `publisher.logo` es `ImageObject`, `mainEntityOfPage` es `WebPage`. Todos los `@type` son valores válidos según schema.org.
- **Inferencia de Rich Result elegible:** Google Search Central lista `NewsArticle` como tipo que puede generar `Article rich result` (no garantizado sin validación final del crawler).

## Validación Google Rich Results Test (no ejecutada — limitación documentada)

⚠️ **Limitación operacional documentada:**

1. La rama `audit/2026-09-06-editorial` **NO está desplegada** en GitHub Pages. Solo `main` se deploya automáticamente.
2. Se intentó `web_fetch` contra `https://search.google.com/test/rich-results?url=https%3A%2F%2Flerius700-cmyk.github.io%2Ftu-plata-en-la-guerra%2F`:
   - **Status:** HTTP 200 (la página del test carga)
   - **Tipo de página:** SPA de Google (framework interno "SearchConsoleUi" / closure / Wiz)
   - **Estado renderizado:** el shell HTML se sirve, pero el test real requiere JavaScript del lado del cliente para ejecutarse. `web_fetch` no ejecuta JS ni interactúa con el botón "Test URL".
   - **Indicador observable en el HTML servido:** literal `Not a valid URL` aparece en el estado inicial antes de cualquier interacción (placeholder).
3. Se verificó que la URL objetivo `https://lerius700-cmyk.github.io/tu-plata-en-la-guerra/` está en línea (HEAD → 200), pero sirve la versión de `main` que **no contiene los meta tags nuevos** (verificado por fetch completo: `description` 197 chars, sin `og:*`, sin `twitter:*`, sin JSON-LD). Por lo tanto, aún con un agente capaz de ejecutar el test, validaría contra HTML sin los cambios del commit `3344d2d`.

**Conclusión:** la validación contra Google Rich Results requiere (a) merge a `main`, (b) esperar el redeploy de GitHub Pages (~30-60 s), y (c) un agente/browser con ejecución de JavaScript para interactuar con la SPA de Google. Ninguna de las tres condiciones se cumple en este momento.

**Acción para Fase 7** (después del merge):
- Manual con navegador: `https://search.google.com/test/rich-results?url=https%3A%2F%2Flerius700-cmyk.github.io%2Ftu-plata-en-la-guerra%2F`
- API programática (alternativa): Google Search Console API / URL Inspection API requiere OAuth + propiedad verificada.

## Preview esperado al compartir el link (post-merge)

Cuando los meta tags estén en producción (post-Fase 7), al compartir el link en WhatsApp, Twitter/X, Facebook, LinkedIn, Slack, Discord, Telegram, iMessage se verá:

- **Título:** `Tu plata en la guerra, tu opinión en venta`
- **Descripción:** `El dinero de las pensiones colombianas termina en fábricas que bombardean Gaza. Esta investigación sigue la cadena, con 50+ fuentes citadas y 15 pruebas documentales.`
- **Imagen:** Captura de la sentencia del Consejo de Estado con la cita `3.630 registros (1.412 mesas)` resaltada en amarillo
- **Dominio mostrado:** `lerius700-cmyk.github.io`

(Para Twitter/X con `twitter:card=summary_large_image`, la imagen se renderiza grande arriba del texto. Para LinkedIn/Facebook con `og:type=article`, se renderiza como tarjeta de artículo.)

## Issues pendientes (deuda técnica para Fase 7)

| # | Sev | Descripción | Acción |
|---|---|---|---|
| SEO-1 | warning | `description` 171 chars (max recomendado 160) | Recortar a ~155 chars |
| SEO-2 | warning | `og:image:width`/`og:image:height` declaran 1200×630 pero la imagen real es **1265×1236** (verificado con `[System.Drawing.Image]`) | Corregir dimensiones declaradas, o reemplazar `og:image` por una versión 1200×630 |
| SEO-3 | follow-up | `publisher.logo` apunta a la misma imagen OG (prueba-01) en vez de un logo cuadrado dedicado | (Opcional) generar logo cuadrado para `publisher.logo` |

### Detalle de SEO-2 (medición real)

```
Archivo: evidencia/prueba-01-sentencia-consejo-estado-1412-mesas.jpg
Tamaño:  356 722 bytes
Dimensiones reales: 1265 × 1236 px
Declarado en og:image:width:  1200
Declarado en og:image:height: 630
```

Implicación: Twitter y LinkedIn pueden usar las dimensiones declaradas para decidir el layout, y si la imagen no las cumple会出现裁剪 o aspect ratio inesperado. Google Search Console en su report de "Mobile Usability" / "Image" no falla por esto, pero es buena práctica.

## Acciones para Fase 7

1. **Recortar `description`** a ~155 chars. Sugerencia: `"El dinero de las pensiones colombianas termina en fábricas que bombardean Gaza. 50+ fuentes citadas."` (93 chars — más punchy) o mantener la actual y reducir las cifras.
2. **Corregir `og:image:width` y `og:image:height`** a las dimensiones reales (`1265` y `1236`) **o** generar una variante OG 1200×630 con tipografía/branding.
3. **(Opcional)** generar un logo cuadrado (mínimo 60×60, recomendado 512×512) para `publisher.logo` en vez de reusar la imagen OG.
4. **(Opcional)** separar `og:description` y `twitter:description` — la OG actual (166 chars) también está sobre el máximo recomendado de 100 para OG estricto, aunque Facebook/LinkedIn aceptan más.
5. **Después del merge a `main`:** ejecutar Google Rich Results Test manualmente y documentar el resultado en `04_seo_og_post_merge.md` (apéndice futuro).

## Validación de la propia auditoría

- ✅ `tools/audit_seo.js` re-ejecutado, output consistente con el commit `3344d2d`.
- ✅ JSON-LD parseado limpio con `JSON.parse` (Node 22 nativo, sin polyfills).
- ✅ Imagen real inspeccionada con `[System.Drawing.Image]` (lectura de header, no renderizado).
- ⚠️ Google Rich Results Test no ejecutable (limitación documentada arriba, no inventada).
- ⚠️ URL canónica NO se pudo validar contra el sitio en vivo (porque el sitio en vivo = `main` sin los nuevos tags).

## Referencias

- Script de validación: `tools/audit_seo.js` (líneas 5-20 = `REQUIRED_TAGS`)
- HTML auditado: `index.html` (líneas 3-60, bloque `<head>`)
- Commit que introduce los tags: `3344d2d` — "feat(seo): meta tags Open Graph, Twitter Card, JSON-LD NewsArticle"
- Línea base pre-impl: `04_seo_current_state.md` (3/14 tags, 13 issues)
- Brief de esta tarea: `.superpowers/sdd/2026-09-06-audit-editorial/task-4.4-4.5-brief.md`
- Especificación schema.org: https://schema.org/NewsArticle
- Google Search Central — Article structured data: https://developers.google.com/search/docs/appearance/structured-data/article
- Google Rich Results Test: https://search.google.com/test/rich-results

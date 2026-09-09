# Estado actual de meta tags SEO (2026-09-06)

**Pre-impl:** 2026-09-06 (línea base antes de Task 4.3)
**Target:** `index.html` (raíz del proyecto)
**Auditoría generada por:** `tools/audit_seo.js` (Task 4.1)
**Output completo:** `04_seo_audit.json` (en este mismo directorio)
**Tamaño HTML auditado:** 172 568 bytes

## Resumen ejecutivo

- **3** meta tags presentes de los **14** REQUIRED_TAGS definidos por el script
- **13** issues detectados: **10 errores** + **3 advertencias**
- Cobertura actual: **21 %** (3/14) — sólo `title`, `viewport` y `description` están definidos
- Brecha para cerrar en Task 4.3: **11 tags** (todos los OG + todos los Twitter Card + canonical) + recortar `description` a ≤ 160 chars

> **Nota:** el brief de Task 4.2 esperaba "0 tags SEO presentes, 14 issues". El estado real difiere: `index.html` ya tiene `<meta name="description">` desde antes de esta auditoría (línea 7), por eso hay 3 tags presentes y 13 issues en vez de 14. El script de auditoría funciona correctamente; la suposición del brief era incorrecta. Ver sección "Discrepancia con el brief" al final.

## Tags presentes (3/14)

| Tag | Valor | Longitud |
|---|---|---|
| `title` | `Tu plata en la guerra, tu opinión en venta — Investigación independiente` | 71 |
| `viewport` | `width=device-width, initial-scale=1.0` | 42 |
| `description` | `Investigación periodística sobre la cadena de dinero colombiano que financia (presuntamente) la guerra en Gaza, la red de medios que la cubre, y el ecosistema digital que moldea la opinión pública.` | 197 |

> El `viewport` no está en la lista REQUIRED_TAGS del script (es técnica, no SEO), pero aparece parseado. El `description` está sobre el máximo recomendado (160) — por eso genera 1 warning, no se cuenta como "presente y correcto".

## Tags faltantes (11/14)

Los siguientes tags de `REQUIRED_TAGS` no se encontraron en `index.html`:

1. `og:title` (severity: error)
2. `og:description` (severity: error)
3. `og:image` (severity: error)
4. `og:url` (severity: error)
5. `og:type` (severity: error)
6. `og:site_name` (severity: warning)
7. `og:locale` (severity: warning)
8. `twitter:card` (severity: error)
9. `twitter:title` (severity: error)
10. `twitter:description` (severity: error)
11. `twitter:image` (severity: error)
12. `canonical` (severity: error)

> Nota: la lista de "faltantes" suma 12. Pero el total de issues es 13 porque también hay 1 warning sobre la longitud de `description`.

## Issues detectados por `audit_seo.js`

| Severidad | # |
|---|---|
| error | 10 |
| warning | 3 |
| **Total** | **13** |

### Desglose de advertencias (3)

| # | Tag | Mensaje |
|---|---|---|
| 1 | `description` | tiene 197 chars (máximo recomendado: 160) |
| 2 | `og:site_name` | Tag `og:site_name` no encontrado |
| 3 | `og:locale` | Tag `og:locale` no encontrado |

### Desglose de errores (10)

| # | Tag | Mensaje |
|---|---|---|
| 1 | `og:title` | Tag `og:title` no encontrado |
| 2 | `og:description` | Tag `og:description` no encontrado |
| 3 | `og:image` | Tag `og:image` no encontrado |
| 4 | `og:url` | Tag `og:url` no encontrado |
| 5 | `og:type` | Tag `og:type` no encontrado |
| 6 | `twitter:card` | Tag `twitter:card` no encontrado |
| 7 | `twitter:title` | Tag `twitter:title` no encontrado |
| 8 | `twitter:description` | Tag `twitter:description` no encontrado |
| 9 | `twitter:image` | Tag `twitter:image` no encontrado |
| 10 | `canonical` | Tag `canonical` no encontrado |

## Cobertura por familia de tags

| Familia | Presentes | Faltantes | Cobertura |
|---|---|---|---|
| Básico (title, description) | 2/2 | 0 | 100 % |
| Open Graph (og:*) | 0/7 | 7 | 0 % |
| Twitter Card (twitter:*) | 0/4 | 4 | 0 % |
| Otros (canonical) | 0/1 | 1 | 0 % |
| **Total SEO** | **2/14** | **12** | **14 %** |

> Si contamos `viewport` (técnico, no SEO estricto), la cobertura cruda es 3/14 = 21 %.

## Acciones para Task 4.3

Task 4.3 debe cerrar **todos** los issues detectados. Lista priorizada:

### Errores bloqueantes (10)

1. Agregar `<meta property="og:title" content="...">`
2. Agregar `<meta property="og:description" content="...">`
3. Agregar `<meta property="og:image" content="...">`
4. Agregar `<meta property="og:url" content="...">`
5. Agregar `<meta property="og:type" content="...">`
6. Agregar `<meta name="twitter:card" content="summary_large_image">`
7. Agregar `<meta name="twitter:title" content="...">`
8. Agregar `<meta name="twitter:description" content="...">`
9. Agregar `<meta name="twitter:image" content="...">`
10. Agregar `<link rel="canonical" href="...">`

### Advertencias (3)

11. Agregar `<meta property="og:site_name" content="...">`
12. Agregar `<meta property="og:locale" content="es_CO">`
13. Acortar `description` a 70–160 chars (actual: 197)

### Decisiones de contenido que Task 4.3 debe tomar

- **URL canónica y `og:url`:** ¿cuál es la URL final pública del proyecto? (dominio o path local `file://` para pre-impl)
- **Imagen OG/Twitter:** ¿se genera o se usa una existente? ¿qué dimensiones mínimas (1200×630 recomendado)?
- **Valores `og:title` / `og:description`:** ¿reutilizan el `title`/`description` actual o son versiones adaptadas (típicamente `og:title` ≤ 60 chars, `og:description` ≤ 100 chars)?
- **`twitter:card`:** `summary` vs `summary_large_image` (recomendado el segundo si la imagen OG cumple 1200×630)
- **`og:type`:** `website` o `article` (esta es una investigación, pero el HTML actual no usa markup de artículo; `website` es más conservador)
- **`og:locale`:** `es_CO` (Colombia) o `es_ES` (España neutral)
- **Recorte de `description`:** ¿qué frase del contenido se conserva? El actual mezcla tema (Gaza), fuente de dinero (Colombia), y ángulo (ecosistema digital)

## Discrepancia con el brief

El brief de Task 4.2 decía: *"Estado actual esperado: el HTML tiene `<title>`, `<meta name="viewport">` pero NO tiene meta description, OG tags, Twitter Card, ni JSON-LD"*. La realidad:

- ✅ `title` presente (correcto)
- ✅ `viewport` presente (correcto)
- ❌ `description` SÍ está presente (197 chars), contrario a lo que el brief asumió
- ❌ OG tags siguen ausentes (correcto)
- ❌ Twitter Card sigue ausente (correcto)
- ➖ JSON-LD no es parte de REQUIRED_TAGS del script, por lo que el audit no lo valida (es decisión de scope de Task 4.1)

**Implicación:** el total de issues es 13, no 14. Task 4.3 debe planificar el cierre de 13 issues (1 corrección + 12 adiciones), no 14.

## Referencias

- Script: `tools/audit_seo.js` (líneas 5–20 definen `REQUIRED_TAGS`)
- Output JSON completo: `04_seo_audit.json` (en este directorio)
- HTML auditado: `index.html` (líneas 3–7: bloque `<head>`)
- Commit de esta auditoría: ver `task-4.2-report.md`

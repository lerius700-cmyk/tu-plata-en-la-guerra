# Auditoría WCAG 2.1 con axe-core (2026-09-06)

**Target:** `index.html` (172 KB, 1911 líneas)
**Herramienta:** axe-core 4.13.0 + jsdom 30.0.1 (Node-based, sin browser real)
**Fecha de ejecución:** 2026-09-06
**Estándar evaluado:** WCAG 2.0 A+AA + WCAG 2.1 A+AA
**Tags ejecutadas:** `wcag2a`, `wcag2aa`, `wcag21a`, `wcag21aa`

## Cambio de metodología vs. commit anterior

- **Antes (commit `49b0050`):** `npx axe` CLI con `chromedriver` + WebView2 → **bloqueado** por incompatibilidad de versiones de navegador.
- **Ahora (este commit):** `axe-core` API + `jsdom` directamente, sin browser. Migración de `tools/audit_accessibility.js` y `tools/test_audit_accessibility.js`.

## Limitación técnica documentada

axe-core con jsdom **no puede evaluar reglas que requieren rendering visual real** (CSS computed styles, layout, geometría). En este audit:

- **`color-contrast`** (impacto `serious`) se reporta como `incomplete` — jsdom no implementa `getComputedStyle()` para pseudo-elementos y estilos cross-origin de Google Fonts.
- Reglas estructurales (HTML semántico, ARIA, alt text, labels, lang, contraste estructural, jerarquía de headings) **sí se evalúan correctamente** porque dependen solo del DOM parseado, no de pixels.

## Resumen de resultados

| Severidad | # Violaciones | # Nodos afectados |
|---|---|---|
| Critical | 0 | 0 |
| Serious | 1 | 2 |
| Moderate | 0 | 0 |
| Minor | 0 | 0 |
| **Total** | **1** | **2** |

> **1 regla** activa con **2 instancias** en el documento. No hay violaciones críticas ni moderadas.

## Violaciones detectadas (detalle)

### 1. `nested-interactive` — `serious` (2 nodos)

**Regla WCAG:** [2.1.1 Keyboard](https://www.w3.org/WAI/WCAG21/Understanding/keyboard.html) (Nivel A) + Best Practice `TTv5 TT6.a`.
**Descripción:** Interactive controls must not be nested (cuando controles focusable están anidados dentro de otro control focusable, los lectores de pantalla y la navegación por teclado pueden fallar).
**Help:** https://dequeuniversity.com/rules/axe/4.13/nested-interactive?application=axeAPI

**Nodos afectados (2):**

1. **`.panel:nth-child(7) > summary`** (línea ~958 de `index.html`)
   ```html
   <summary>La propuesta de <a class="inline-link" href="https://es.wikipedia.org/wiki/Gustavo_Petro" target="_blank" rel="noopener">Petro</a>: repatriar $100 billones en 5 años</summary>
   ```
   - **Problema:** `<a>` (enlace) está anidado dentro de `<summary>` (control expandible/colapsable). Ambos son focusables.

2. **`.panel:nth-child(8) > summary`**
   ```html
   <summary>El precedente chileno: <a class="inline-link" href="https://www.ciperchile.cl/" target="_blank" rel="noopener">CIPER</a> Chile, oct 2025</summary>
   ```
   - **Mismo problema:** `<a>` dentro de `<summary>`.

**Contexto positivo:** otros 27 nodos del documento (todos los demás `<summary>` del archivo) **sí pasan** esta regla — solo estos 2 paneles son problemáticos.

**Failure summary de axe:** `Element has focusable descendants` (los dos casos).

## Reglas que NO se pudieron evaluar (`incomplete`)

| Rule ID | Impacto declarado | Por qué no se evaluó |
|---|---|---|
| `color-contrast` | serious | jsdom no implementa `getComputedStyle()` con pseudo-elementos; Google Fonts cargadas vía `@import` no se resuelven en este entorno |

Esto significa que **contraste de color real (foreground vs background)** queda como **riesgo residual no verificado** por este audit. Si en Fase 7 se requiere garantía de contraste, se debe complementar con un audit visual (Playwright/Chrome real) o un script que evalúe los pares de colores del CSS directamente.

## Reglas que PASAN (top 18 — cobertura del audit)

| Rule ID | Nodos que pasan | Significado |
|---|---|---|
| `aria-hidden-body` | 1 | `aria-hidden="true"` no está en `<body>` |
| `avoid-inline-spacing` | 107 | No hay `style="letter-spacing"` o `word-spacing` inline |
| `button-name` | 3 | Los 3 `<button>` tienen nombre accesible |
| `bypass` | 1 | Existe mecanismo de bypass (skip link o landmarks) |
| `document-title` | 1 | El `<title>` está presente y no está vacío |
| `form-field-multiple-labels` | 1 | No hay inputs con múltiples `<label>` |
| `html-has-lang` | 1 | El `<html>` tiene atributo `lang` |
| `html-lang-valid` | 1 | El valor de `lang` es un BCP-47 válido |
| `image-alt` | 16 | Las 16 imágenes tienen `alt` apropiado |
| `label` | 1 | El `<input>` está asociado a un `<label>` |
| `link-name` | 388 | Los 388 enlaces tienen texto discernible |
| `list` | 27 | Las 27 listas están estructuradas correctamente |
| `listitem` | 136 | Los 136 `<li>` están dentro de `<ul>`/`<ol>` |
| `meta-viewport` | 1 | `meta viewport` permite zoom |
| `nested-interactive` | 27 | 27 nodos con anidación focusable están OK (la regla pasa para ellos) |
| `summary-name` | 10 | Los 10 `<summary>` tienen nombre accesible |
| `td-headers-attr` | 8 | Los 8 `<td>` con `headers` son válidos |
| `th-has-data-cells` | 8 | Los 8 `<th>` tienen celdas de datos |

**Reglas no aplicables:** 43 (reglas que requieren elementos/patrones que este HTML no tiene — ej. `audio-caption` si no hay `<audio>`, `marquee` si no hay `<marquee>`, etc.).

## Acciones para Fase 7 (integración)

| # | Severidad | Acción | Esfuerzo |
|---|---|---|---|
| **P0-1** | serious | **Mover los 2 `<a>` fuera de los `<summary>`** (panel "Propuesta Petro" línea ~958 y panel "Precedente chileno"). Opciones: (a) dejar el enlace en el cuerpo del `<details>` en lugar del `<summary>`; (b) usar `<button>` para expandir y separar visualmente la palabra "Petro"/"CIPER" del enlace; (c) eliminar el enlace inline del summary y referenciarlo desde el cuerpo. | 5 min |

**Criterio de éxito (post-fixes):**
- ✅ 0 violaciones críticas WCAG 2.1 nivel A
- ✅ 0 violaciones serias (una vez corregido `nested-interactive` en los 2 paneles)
- (P1/P2/P3 se atienden si el tiempo lo permite)

**Riesgo residual conocido (no resuelto por este audit):**
- `color-contrast` no se pudo evaluar en jsdom → en Fase 7, **validar contraste con herramienta visual** (axe-core en browser real, Playwright, Stark, o inspección manual de pares fg/bg del CSS) antes de declarar Fase 7 como completa.

## Artefactos presentes en este directorio

- `03_axe_results.md` (este archivo) — reporte de resultados reales
- `03_axe_raw.json` (687 KB) — output crudo completo de axe-core (passes, violations, incomplete, inapplicable)
- `axe_run.log`, `axe_run.err.log`, `03_axe_raw_stdout.txt` — artefactos del intento anterior con CLI; **se pueden eliminar** (ya no aplican al nuevo flujo).

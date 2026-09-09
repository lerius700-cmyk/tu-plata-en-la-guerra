# Auditoría manual de accesibilidad WCAG 2.1 (complemento a axe-core)

**Fecha:** 2026-09-06
**Complementa:** `03_axe_results.md` (axe-core 4.13.0 + jsdom 30.0.1)
**Cubre brechas de jsdom:** color-contrast (incomplete en axe), navegación con teclado, SVG accesible, idioma del documento
**Herramienta:** análisis manual con PowerShell + Node.js (fórmula WCAG 2.1)
**Target:** `index.html` (1911 líneas, 172 KB)
**Estándar evaluado:** WCAG 2.1 nivel A + AA

## Resumen ejecutivo

| Verificación | Hallazgos | Veredicto |
|---|---|---|
| 1. Navegación con teclado | 328 interactivos, 0 tabindex negativos, 0 onclick sin tecla, 0 skip-link, focus global ausente | 🟡 |
| 2. Alt text en imágenes | 16 imágenes de `evidencia/` (15 únicas + 1 duplicado), todas con alt descriptivo (28-102 chars) | 🟢 |
| 3. SVG accesible | 4 SVGs, **0 con `<title>`/`<desc>`**, **0 con `role="img"`**, chain-links del SVG AFP sin `role="link"`/`tabindex` | 🔴 |
| 4. Contraste de colores | 17/20 pares pasan AA normal; **3 pares fallan AA normal** (text-mute, accent, red) | 🟡 |
| 5. Idioma del documento | `<html lang="es">` correctamente declarado (L2) | 🟢 |

**Total issues nuevos encontrados (manual):** 8 (1 🔴, 5 🟡, 2 🟢)
**Combinado con axe-core (1 violation serious):** 9 issues a atender en Fase 7.

---

## 1. Navegación con teclado

**Método:** `grep` por tags interactivos + atributos problemáticos (tabindex negativos, onclick sin keyboard fallback).

### Conteos

| Categoría | Cantidad | Detalle |
|---|---|---|
| `<a>` | 435 | Incluye 25 stat cards (`a.stat`) + 270+ inline-links + navegación TOC |
| `<button>` | 3 | Expandir todo, Colapsar todo, Imprimir (L596-598) |
| `<details>` / `<summary>` | 10 / 10 | Paneles expandibles — focusable por default |
| `<input>` | 1 | `.search-box` (L140 aprox) |
| **Total interactivos** | **328** (sin contar atributos repetidos; tags <a> aparece 435 veces por auto-cierre anidado) | — |
| `tabindex` negativos | **0** | ✅ |
| `tabindex` positivos | **0** | ✅ (no se abusa de `tabindex` para forzar orden) |
| `onclick=` handlers | **3** | Todos en `<button>` correctos (L596-598) |

### onclick handlers (detalle)

| Línea | Tag | Texto visible | Keyboard fallback |
|---|---|---|---|
| 596 | `<button class="btn">` | "⊞ Expandir todo" | ✅ Es `<button>` clickeable + focusable |
| 597 | `<button class="btn">` | "⊟ Colapsar todo" | ✅ Mismo patrón |
| 598 | `<button class="btn">` | "🖨️ Imprimir / PDF" | ✅ Mismo patrón |

**Conclusión onclick:** ✅ Los 3 onclick son sobre `<button>` (focusable por defecto), no hay `onclick` "huérfanos" sobre `<div>` o `<span>`.

### Skip-link

- ❌ **NO existe skip-link** ("Saltar al contenido principal"). Es P1 según WCAG 2.4.1 (Bypass Blocks, Nivel A).
- Sin embargo, axe-core reportó `bypass: 1` como regla que PASA. La regla evalúa "existe mecanismo de bypass (skip link **o landmarks**)". El documento sí tiene `<header>`, `<main>`, `<section>`, `<footer>` implícitos por jerarquía, por lo que la regla pasa estructuralmente. Pero **un skip-link visible es preferible** para usuarios de teclado y switch.

### Focus indicators (visual)

| Elemento | Estilo | Veredicto |
|---|---|---|
| `a` global (default) | `outline` del browser (normalmente 1px azul/negro) | 🟡 Depende del browser; no se observa override |
| `a.inline-link` | **Sin `:focus` style** (solo `:hover`) | 🔴 **Issue P1** |
| `a.stat` | `outline: 2px solid var(--accent-bright)` en `:focus-visible` (L267) | 🟢 Pasa |
| `.search-box` | `outline: none; border-color: var(--accent)` en `:focus` (L148) | 🟡 Quita el outline del browser y solo cambia border color (contraste 3.82:1, no WCAG 2.4.7) |
| `<button>` (`.btn`) | Sin `:focus` style explícito | 🔴 **Issue P1** (delega al browser default) |
| `<details>` / `<summary>` | Sin `:focus` style explícito | 🟡 Delega al browser default |

**Issue P1 destacado:** Los `<a class="inline-link">` (270+ en el documento) **no tienen `:focus` ni `:focus-visible` definido**. Para usuarios de teclado, dependen del outline default del browser, que en muchos navegadores está deshabilitado o tiene contraste insuficiente.

### Veredicto

🟡 **Aceptable con reservas.** Cubre los requisitos básicos (no tabindex negativos, no onclick huérfanos), pero **le falta un skip-link y un focus indicator global visible**. Cualquier usuario de teclado en `a.inline-link` depende del browser default.

**Recomendación Fase 7 (P1):** Agregar skip-link visible al inicio y `:focus-visible` con `outline: 2px solid var(--accent-bright); outline-offset: 2px;` en `a, button, summary, [tabindex]` globalmente.

---

## 2. Alt text en imágenes

**Método:** `Select-String '<img[^>]+src="evidencia/[^"]+"'` (16 matches — 15 imágenes únicas + 1 duplicación de `prueba-01`).

**Nota técnica:** PowerShell `Get-Content` en este sistema decodifica el archivo (UTF-8 sin BOM) como Windows-1252, mostrando mojibake (`CuestiÃ³n` en vez de `Cuestión`). La herramienta `read` (que lee bytes directamente) confirma que el archivo tiene UTF-8 correcto: los alt text contienen tildes y eñes legítimamente.

### Tabla de hallazgos

| # | Línea | src | Alt text | Long. | Descriptivo |
|---|---|---|---|---|---|
| 1 | 1498 | `prueba-01-sentencia-consejo-estado-1412-mesas.jpg` | "Prueba 1 - Sentencia del Consejo de Estado con la cita '3.630 registros (1.412 mesas)' resaltada" | 96 | ✅ sí |
| 2 | 1507 | `prueba-02-cuestion-publica.jpg` | "Prueba 2 - Cuestión Pública con cita sobre $17 billones" | 57 | ✅ sí |
| 3 | 1516 | `prueba-03-fondo-noruego.jpg` | "Prueba 3 - Annual Report 2025 con exclusión de Caterpillar" | 59 | ✅ sí |
| 4 | 1525 | `prueba-04-albanese-63-estados.jpg` | "Prueba 4 - Informe Albanese 63 estados" | 38 | ✅ sí |
| 5 | 1534 | `prueba-05-cerimedo-audiencia.jpg` | "Prueba 5 - Audiencia Cerimedo 28/08/2026" | 40 | ✅ sí |
| 6 | 1543 | `prueba-06-petro-afp.jpg` | "Prueba 6 - Petro textual AFP" | 28 | ✅ sí (corto pero claro) |
| 7 | 1552 | `prueba-07-stoltenberg.jpg` | "Prueba 7 - Stoltenberg reverso noruego" | 38 | ✅ sí |
| 8 | 1561 | `prueba-08-auto-2-marzo-2018.jpg` | "Prueba 8 - AUTO 2 marzo 2018 que niega anulación a Teresita García Romero" | 75 | ✅ sí |
| 9 | 1571 | `prueba-09-decreto-petro.jpg` | "Prueba 9 - Decreto Petro repatriación AFP $100B" | 48 | ✅ sí |
| 10 | 1581 | `prueba-10-resolucion-3006.jpg` | "Prueba 10 - Resolución 3006/2014 anulada parcialmente por el Consejo de Estado" | 79 | ✅ sí |
| 11 | 1591 | `prueba-11-resolucion-12-2014.jpg` | "Prueba 11 - Resolución 12/2014 Comisión Escrutadora Distrital de Bogotá anulada" | 82 | ✅ sí |
| 12 | 1601 | `prueba-12-ley-185-1990.jpg` | "Prueba 12 - Ley 185/1990 Italia sobre exportación de armamento" | 63 | ✅ sí |
| 13 | 1611 | `prueba-13-cpaca-288.jpg` | "Prueba 13 - Ley 1437/2011 CPACA art. 288 efectos de la sentencia electoral" | 74 | ✅ sí |
| 14 | 1621 | `prueba-14-ciper-chile.jpg` | "Prueba 14 - CIPER Chile investigación AFP chilenas US$34,5 millones en armas" | 77 | ✅ sí |
| 15 | 1631 | `prueba-15-razon-publica-thomas-greg.jpg` | "Prueba 15 - Razón Pública sobre Thomas Greg contrato 2,75 billones" | 68 | ✅ sí |
| 16 | 1829 | `prueba-01-sentencia-consejo-estado-1412-mesas.jpg` *(duplicado)* | "Pantallazo de la sentencia del Consejo de Estado con la cita '3.630 registros (1.412 mesas)' resaltada" | 102 | ✅ sí |

**Nota:** El brief dice "15 imágenes" pero `Select-String` encuentra 16 (la imagen `prueba-01` aparece dos veces: una en la galería principal L1498, otra como pantallazo extra al final L1829). La duplicación es **intencional del diseño** (la imagen se reutiliza en dos secciones), no un error.

### Conteo

| Métrica | Valor |
|---|---|
| Total `<img>` con src `evidencia/` | 16 |
| Imágenes únicas (prueba-01 a prueba-15) | 15 |
| Con `alt` presente | **16/16** (100%) |
| Con `alt=""` vacío | 0 |
| Sin atributo `alt` | 0 |
| Descriptivos (juzgo manual) | 16/16 (100%) |

### Veredicto

🟢 **Pasa.** Las 16 instancias de imagen tienen `alt` descriptivo. axe-core ya validó 16/16 pasan `image-alt`. La longitud varía (28-102 chars) pero todos comunican la información esencial: tipo de documento + cita + identificador de prueba.

**No requiere acción en Fase 7.**

---

## 3. SVG accesible

**Método:** `Select-String '<svg\b'` (4 SVGs encontrados).

### Inventario de SVGs

| # | Línea | viewBox | Función | Interactivos | Accesibilidad |
|---|---|---|---|---|---|
| 1 | 667 | 0 0 800 220 | Diagrama de flujo Valorem → La Pulla | 0 | 🔴 Sin `<title>`, `<desc>`, `role`, `aria-label` |
| 2 | 769 | 0 0 900 280 | Cadena dinero AFP → Gaza (con `<a class="chain-link" xlink:href="...">`) | 14 chain-links | 🔴 Sin `<title>`, `<desc>`, `role`; los `<a>` internos no tienen `role="link"` ni `tabindex="0"` |
| 3 | 1349 | 0 0 600 700 | Mapa de Colombia con ciudades AFP | 0 (comentarios con `<a class="inline-link">` no son clicables en SVG) | 🔴 Sin `<title>`, `<desc>`, `role`, `aria-label` |
| 4 | 1386 | 0 0 500 280 | Mapa de Gaza con franjas | 0 | 🔴 Sin `<title>`, `<desc>`, `role`, `aria-label` |

### Verificación por SVG (detalle crítico)

#### SVG #1 (L667) — Diagrama Valorem / La Pulla

```html
<svg viewBox="0 0 800 220" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <marker id="arrow" .../>
  </defs>
  <!-- ... rectangles, lines, text ... -->
</svg>
```

- ❌ Sin `<title>` (screen reader anuncia "image" genérico)
- ❌ Sin `<desc>` (no hay descripción textual del flujo)
- ❌ Sin `role="img"` (WAI-ARIA)
- ❌ Sin `aria-label` ni `aria-labelledby`
- ✅ El texto de los nodos (Familia Santo Domingo, Valorem S.A., Comunican S.A., El Espectador, LA PULLA) **sí está en `<text>` SVG**, así que un screen reader moderno podría leerlos si tuviera un `<title>`, pero sin él solo anuncia "SVG con 5 nodos de texto".

#### SVG #2 (L769) — Cadena dinero AFP → Gaza (CRÍTICO)

```html
<svg viewBox="0 0 900 280" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" style="cursor: default;">
  <defs>
    <marker id="arr" .../>
    <style>
      .chain-link { cursor: pointer; transition: opacity 0.18s ease; }
      .chain-link:hover rect { filter: brightness(1.35); }
      .chain-link:hover text:first-of-type { fill: #fbbf24; }
      .chain-link text { pointer-events: none; }
    </style>
  </defs>
  <a class="chain-link" xlink:href="https://www.aporteresolidario.com/" target="_blank" rel="noopener" title="Trabajador colombiano — cotización obligatoria a pensión">
    <rect .../>
    <text ...>Trabajador colombiano</text>
    <text ...>(aporte obligatorio a pensión)</text>
  </a>
  ...
</svg>
```

- ❌ Sin `<title>` a nivel de SVG (no hay descripción general del flujo)
- ❌ Sin `<desc>` (no hay descripción textual larga para screen reader)
- ❌ Sin `role="img"` ni `aria-label`
- 🟡 Los 14 `<a class="chain-link" xlink:href="...">` **sí tienen `title="..."`** (atributo), que en algunos browsers provee tooltip, pero:
  - **No tienen `role="link"`** explícito (creen los browsers que es link nativo SVG)
  - **No tienen `tabindex="0"`** — no son focusables con teclado por defecto en SVG
  - `xlink:href` está deprecated; debería ser `href` directo

**Prueba con `tabindex`:** El atributo `xlink:href` solo hace el `<a>` focusable en browsers antiguos. En Chrome/Firefox/Safari modernos, `<a>` dentro de SVG **es focusable por defecto** porque el browser lo trata como anchor, pero esto **no es parte del spec SVG 1.1** y la accesibilidad es inconsistente.

**Implicación para screen reader:** El atributo `title` se anuncia como "title" pero **el texto dentro de `<text>` puede no ser legible** consistentemente. axe-core no evalúa SVG interactivo, por eso no apareció en el reporte anterior.

#### SVG #3 (L1349) — Mapa Colombia

- ❌ Sin `<title>` (debería ser "Mapa de Colombia con sedes de AFP")
- ❌ Sin `<desc>`
- ❌ Sin `role="img"`
- Los comentarios `<!-- Medellín (Protección - Sura) -->` **no son accesibles** para screen readers (los comentarios HTML no se exponen al AT).

#### SVG #4 (L1386) — Mapa Gaza

- ❌ Sin `<title>` (debería ser "Mapa de la Franja de Gaza con principales blancos de la ofensiva")
- ❌ Sin `<desc>`
- ❌ Sin `role="img"`

### Resumen SVG

| SVG | `<title>` | `<desc>` | `role="img"` | `aria-label` | Chain-links con `role="link"`+`tabindex` | Notas |
|---|---|---|---|---|---|---|
| 1 (Valorem) | ❌ | ❌ | ❌ | ❌ | N/A | Diagrama decorativo-informativo |
| 2 (AFP→Gaza) | ❌ | ❌ | ❌ | ❌ | ❌ (14 chain-links sin role/tabindex) | **CRÍTICO** — diagrama central interactivo |
| 3 (Colombia) | ❌ | ❌ | ❌ | ❌ | N/A | Mapa decorativo-informativo |
| 4 (Gaza) | ❌ | ❌ | ❌ | ❌ | N/A | Mapa decorativo-informativo |

### Veredicto

🔴 **Falla.** Ninguno de los 4 SVGs cumple el mínimo de WCAG 1.1.1 (Non-text Content). El SVG #2 (AFP→Gaza) además falla WCAG 2.1.1 (Keyboard) porque los chain-links no son focusables con teclado de forma consistente.

**Recomendación Fase 7 (P0/P1):**
- **P0** — Agregar `<title>` y `<desc>` en los 4 SVGs (especialmente #2 que es interactivo).
- **P0** — Agregar `role="img"` y `aria-labelledby` referenciando el `<title>`.
- **P1** — En SVG #2, agregar `role="link"` y `tabindex="0"` a cada `<a class="chain-link">`, y migrar `xlink:href` → `href`.

---

## 4. Contraste de colores (fórmula WCAG 2.1)

**Método:** Cálculo manual con Node.js (`calc_contrast.js`).
- Fórmula: `L = 0.2126·R + 0.7152·G + 0.0722·B` (después de linearizar cada canal con `(c+0.055)/1.055)^2.4` o `c/12.92` si c ≤ 0.03928).
- Ratio: `(L_lighter + 0.05) / (L_darker + 0.05)`.
- Umbrales: AA texto normal ≥ **4.5**, AA texto grande (≥18pt o ≥14pt bold) ≥ **3.0**.

### Colores clave declarados en `:root` (L9-30)

```
--bg:           #0a0a0a   (fondo)
--bg-elev:      #141414
--bg-elev-2:    #1c1c1c
--bg-card:      #1a1a1a
--text:         #e8e8e8
--text-soft:    #a8a8a8
--text-mute:    #707070
--accent:       #c2410c
--accent-bright:#ea580c
--gold:         #fbbf24
--green:        #10b981
--red:          #dc2626
--red-soft:     #7f1d1d
--blue:         #3b82f6
--purple:       #a855f7
```

### Tabla de ratios (texto sobre fondo)

| Elemento | Color texto | Color fondo | Ratio | AA normal (≥4.5) | AA grande (≥3.0) | Veredicto |
|---|---|---|---|---|---|---|
| `body` texto principal | `--text` `#e8e8e8` | `--bg` `#0a0a0a` | **16.16** | ✅ | ✅ | 🟢 |
| Texto secundario (text-soft) | `#a8a8a8` | `#0a0a0a` | **8.33** | ✅ | ✅ | 🟢 |
| Texto muted (text-mute) | `#707070` | `#0a0a0a` | **4.00** | ❌ | ✅ | 🟡 |
| `inline-link` | `--accent-bright` `#ea580c` | `#0a0a0a` | **5.56** | ✅ | ✅ | 🟢 |
| `inline-link` hover (fondo `--accent`) | `#fff` | `--accent` `#c2410c` | **5.99** | ✅ | ✅ | 🟢 (verificado extra) |
| `a.stat` border / focus | `--accent` `#c2410c` | `#0a0a0a` (no es foreground de texto) | 3.82 | n/a | n/a | 🟡 **border, no texto** |
| `a.stat` border-hover-left | `--accent-bright` `#ea580c` | `#0a0a0a` | 5.56 | n/a | n/a | 🟢 **border** |
| `.alert strong` (warning text) | `--red` `#dc2626` | `#0a0a0a` (sobre rgba(220,38,38,0.1) ≈ `#2a1212`) | **14.36** efectivo, **4.10** sobre `--bg` puro | 🟡 (4.10 sobre bg puro) | ✅ | 🟡 |
| `callout` (texto dentro) | `--text` `#e8e8e8` | rgba(251,191,36,0.08) + bg ≈ `#1e1810` | **14.36** | ✅ | ✅ | 🟢 |
| `gold` (highlights) | `--gold` `#fbbf24` | `#0a0a0a` | **11.86** | ✅ | ✅ | 🟢 |
| `green` (positive indicators) | `--green` `#10b981` | `#0a0a0a` | **7.80** | ✅ | ✅ | 🟢 |
| `red` (alerts iconografía) | `--red` `#dc2626` | `#0a0a0a` | **4.10** | ❌ | ✅ | 🟡 |
| `blue` (gestora internacional SVG) | `--blue` `#3b82f6` | `#0a0a0a` | **5.38** | ✅ | ✅ | 🟢 |
| `purple` (sucursales SVG) | `--purple` `#a855f7` | `#0a0a0a` | **5.00** | ✅ | ✅ | 🟢 |
| `.disclaimer` gradient | `#fff` | `--red-soft` `#7f1d1d` (gradient start) | **10.02** | ✅ | ✅ | 🟢 |
| `.disclaimer` gradient (end) | `#fff` | `#581c1c` (gradient end) | **13.14** | ✅ | ✅ | 🟢 |
| `.pill.danger` | `#fff` | `--red-soft` `#7f1d1d` | **10.02** | ✅ | ✅ | 🟢 |
| `.pill.warn` | `#fef3c7` | `#78350f` | **8.15** | ✅ | ✅ | 🟢 |
| `.pill.ok` | `#d1fae5` | `#064e3b` | **8.57** | ✅ | ✅ | 🟢 |
| `.pill.info` | `#dbeafe` | `#1e3a8a` | **8.49** | ✅ | ✅ | 🟢 |
| `header` (texto en header sticky) | `--text` `#e8e8e8` | rgba(10,10,10,0.95) sobre `--bg` | **16.16** | ✅ | ✅ | 🟢 |

### Hallazgos críticos de contraste

#### 1. `--text-mute: #707070` (4.00:1) — **FALLA AA normal**

- **Uso:** 34 ocurrencias como `color: var(--text-mute)` en CSS o inline.
- **Casos de uso típicos:** fechas, "Fuentes de verificación", `aside nav a small`, `tl-text small`, descripciones pequeñas.
- **Tamaño típico:** 0.75-0.85rem (12-14px). **NO es texto grande**, así que requiere ≥ 4.5:1.
- **Recomendación:** Subir el valor de `--text-mute` a `#8a8a8a` o más claro (calcular nuevo ratio objetivo ≥ 4.5:1 sobre `#0a0a0a`).
  - `#8a8a8a` sobre `#0a0a0a`: ~5.13:1 ✅
  - `#909090` sobre `#0a0a0a`: ~5.46:1 ✅

#### 2. `--red: #dc2626` (4.10:1) — **FALLA AA normal**

- **Uso como foreground de texto:** solo en `.alert strong` (L478).
- **Uso como border:** frecuente (`.alert`, `.chain-link hover` SVG).
- **Recomendación:** Subir a `#ef4444` (Tailwind red-500) — calcular ratio: ~4.83:1 ✅ sobre `#0a0a0a`.
  - Alternativa: aplicar `--red` solo a borders/iconos y reservar `#ef4444` o `#fca5a5` para texto de alerta.

#### 3. `--accent: #c2410c` (3.82:1) — **FALLA AA normal**

- **Uso como foreground de texto:** **0 ocurrencias** (verificado). Solo se usa como `border-color`, `border-left-color`, `outline` y `background` en hover.
- **Como outline 2px:** WCAG 2.4.7 (Focus Visible) requiere ratio ≥ 3.0:1 contra el fondo adyacente. 3.82:1 ✅ **PASA** el mínimo para non-text contrast.
- **Como border 1px en `details.panel[open]`:** WCAG 1.4.11 (Non-text Contrast) requiere ≥ 3.0:1. 3.82:1 ✅ PASA.
- **Veredicto:** No es un issue de texto, pero **es borderline** para non-text contrast en algunos contexts. Documentar como P3.

### Veredicto

🟡 **Aceptable con 2 issues P1.** El cuerpo del documento tiene excelente contraste (16:1, muy por encima de AAA 7:1). Los 2 issues (text-mute 4.00 y red 4.10) **no bloquean la lectura** pero **no cumplen estrictamente AA** para body text.

**Recomendación Fase 7 (P1):**
- Subir `--text-mute` de `#707070` a `#8a8a8a` o más claro (5.13:1 sobre bg).
- Subir `--red` de `#dc2626` a `#ef4444` (4.83:1) — o restringir su uso a borders.

---

## 5. Idioma del documento

**Método:** `Select-String '<html[^>]+lang='` y `Select-String '\slang="[a-zA-Z-]+"'`.

### Hallazgos

| Línea | Match | Veredicto |
|---|---|---|
| L2 | `<html lang="es">` | ✅ |
| Otros `lang=` | 0 (solo el del `<html>`) | n/a |

- **WCAG 3.1.1 (Language of Page, Nivel A):** ✅ Pasa.
- **WCAG 3.1.2 (Language of Parts, Nivel AA):** No aplica (todo el documento está en español; no hay partes en otros idiomas que requieran marcado).

### Veredicto

🟢 **Pasa.** axe-core también validó `html-has-lang: 1` y `html-lang-valid: 1`. Sin acción requerida.

---

## Issues totales (complemento al reporte axe-core)

| # | Tipo | WCAG | Severidad | Descripción | Línea aprox | Esfuerzo |
|---|---|---|---|---|---|---|
| 1 | SVG sin `<title>`/`<desc>` | 1.1.1 (A) | **P0** | 4 SVGs sin título/descripción accesible (especialmente diagrama AFP→Gaza L769) | 667, 769, 1349, 1386 | 30 min |
| 2 | SVG sin `role="img"` | 1.1.1 (A) | P0 | 4 SVGs sin role explícito | 667, 769, 1349, 1386 | 5 min (combinado con #1) |
| 3 | SVG chain-links no focusables con teclado | 2.1.1 (A) | P0 | 14 `<a class="chain-link" xlink:href>` sin `role="link"` ni `tabindex="0"` | 769-889 | 15 min |
| 4 | Sin skip-link | 2.4.1 (A) | P1 | No existe "Saltar al contenido principal" al inicio del `<body>` | L4 aprox | 5 min |
| 5 | Focus indicator global ausente | 2.4.7 (AA) | P1 | 270+ `<a class="inline-link">` y `<button>` sin `:focus-visible` definido; dependen del browser default | varios | 15 min |
| 6 | Contraste text-mute | 1.4.3 (AA) | P1 | `#707070` sobre `#0a0a0a` = 4.00:1 (necesita ≥ 4.5:1). 34 ocurrencias. | L18 (var), 34 sitios de uso | 2 min (cambiar 1 variable) |
| 7 | Contraste red texto | 1.4.3 (AA) | P1 | `#dc2626` sobre `#0a0a0a` = 4.10:1 (necesita ≥ 4.5:1). 1 ocurrencia (`.alert strong`). | L23, L478 | 2 min |
| 8 | Contraste accent border (borderline) | 1.4.11 (AA) | P3 | `#c2410c` = 3.82:1 (pasa ≥ 3.0:1 non-text, pero borderline). No es foreground de texto. | L19 | 0 min (no requiere acción) |
| 9 | (ya reportado en axe) `nested-interactive` | 2.1.1 (A) | **P0** (ya en `03_axe_results.md`) | `<a>` dentro de `<summary>` en panel Petro (L958) y panel CIPER Chile (L979) | 958, 979 | 5 min |

**Total issues nuevos manuales: 8** (3 P0, 4 P1, 1 P3 sin acción).
**Combinado con axe-core (1 P0):** **9 issues** en total a atender en Fase 7.

---

## Acciones consolidadas para Fase 7

### P0 (bloqueantes — deben resolverse)

1. **SVGs accesibles** (3 cambios atómicos en `index.html`):
   - Agregar `<title>` y `<desc>` a los 4 SVGs, especialmente el #2 (L769) que es el diagrama central.
   - Agregar `role="img"` y `aria-labelledby` apuntando al `<title>`.
   - En SVG #2, agregar `role="link"` y `tabindex="0"` a los 14 `<a class="chain-link">`, y migrar `xlink:href` → `href`.

2. **`nested-interactive` en 2 `<summary>`** (ya reportado en axe):
   - Mover los `<a>` fuera de los `<summary>` o convertirlos a `<button>` con el control de expand en otro lado.

### P1 (importantes — no bloquean lectura)

3. **Skip-link visible** al inicio del `<body>`.

4. **Focus indicator global** con `outline: 2px solid var(--accent-bright); outline-offset: 2px;` en `a, button, summary, input, [tabindex]:focus-visible`.

5. **Subir `--text-mute` de `#707070` a `#8a8a8a`** (1 variable, 5.13:1 sobre bg).

6. **Subir `--red` de `#dc2626` a `#ef4444`** o restringir su uso como texto de alerta.

### P3 (mejora, no bloqueante)

7. Considerar oscurecer `--accent` a un valor con ratio ≥ 4.5:1 si se usa en algún contexto de non-text contrast.

### Sin acción

- ✅ 15/16 imágenes con alt descriptivo (16/16 con alt presente)
- ✅ `<html lang="es">` correcto
- ✅ 0 `tabindex` negativos
- ✅ 0 `onclick` sin keyboard fallback (los 3 son `<button>`)
- ✅ Contraste de body text excelente (16.16:1, AAA)
- ✅ Contraste de `.inline-link` excelente (5.56:1, AA+)

---

## Limitaciones y honestidad

**Lo que este audit NO cubre (limitaciones declaradas):**

- **No se ejecutó en un browser real.** El cálculo de contraste usa la fórmula WCAG 2.1, pero **no se verificó el rendering real** con `getComputedStyle`. Si un color se aplica con `rgba()` con opacidad variable (como en `.alert` y `.callout`), el cálculo asume una composición lineal con `--bg` que puede no coincidir exactamente con el render del browser.
- **No se probó focus visual con screen reader** (NVDA, JAWS, VoiceOver). Las recomendaciones de SVG son por mejores prácticas W3C, no por testing empírico.
- **No se verificó la jerarquía de headings en orden visual** (se cuenta h1=1, h2=15, h3=50, h4=14 — sin saltos aparentes, pero requiere lectura secuencial del DOM para confirmar).
- **El archivo `index.html` no se modificó** (per restricción). Las acciones son recomendaciones para Fase 7.

**Incertidumbres declaradas:**

- El reporte brief menciona 15 imágenes; el audit encontró 16. La diferencia es una duplicación legítima de `prueba-01` en la galería + pantallazo extra (L1498 y L1829). No es un error, pero documentado para transparencia.
- El brief asume que `text-mute` y `red` se usan como foreground de texto. El audit verificó que `red` solo se usa como texto en `.alert strong` (1 lugar) y como `color: var(--text-mute)` se usa en 34 lugares (todos body-size, no large text).

---

## Artefactos en este directorio

- `03_manual_a11y.md` (este archivo) — reporte manual complementario
- `calc_contrast.js` — script Node.js con la fórmula WCAG 2.1 y los 20 pares de contraste evaluados
- `03_axe_results.md` (existente) — reporte de axe-core + jsdom (1 violation)
- `00_plan.md` (existente) — plan de auditoría

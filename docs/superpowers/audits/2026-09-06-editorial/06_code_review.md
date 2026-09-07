# Code review del HTML (Fase 6.2)

**Fecha:** 2026-09-06
**Target:** `D:\AI\Investigaciones\Periodismo politico-economico\index.html`
**Líneas:** 2128 (no 1911 como decía el brief original — el archivo creció durante Fases 1–5)
**Tamaño:** 175 700 bytes (~172 KB)
**Branch:** `audit/2026-09-06-editorial`
**Commit base:** `8e37024`

> **Nota de alcance:** Esta Fase es **AUDITORÍA**, no implementación. No se aplicaron fixes; todos los issues quedan listados para que Fase 7 priorice y corrija.

---

## 1. IDs duplicados

**Resultado:** 0 IDs duplicados. ✓

| Métrica | Valor |
|---|---|
| IDs totales (`id="..."`) | 33 |
| IDs únicos | 33 |
| Duplicados | 0 |

---

## 2. Anclas rotas (sidebar → secciones)

**Resultado:** 0 anclas rotas. ✓

| Métrica | Valor |
|---|---|
| Anclas internas (`href="#..."`) | 41 |
| Anclas que resuelven a ID existente | 41 (100%) |
| Anclas rotas | 0 |

---

## 3. Imágenes sin alt text

**Resultado:** 0 imágenes sin alt, 0 con alt vacío. ✓

| Métrica | Valor |
|---|---|
| Total `<img>` | 16 |
| Con `alt="..."` (no vacío) | 16 (100%) |
| Sin atributo `alt` | 0 |
| Con `alt=""` (vacío) | 0 |

**Observación de calidad:** los 16 `alt` siguen el formato consistente `Prueba N - <descripción>` y son descriptivos (no decorativos). Las 15 pruebas documentales más 1 imagen referenciada dos veces en línea 1883. Calidad alta.

---

## 4. SVG accesible (title/desc/role)

**Resultado:** 0 SVGs con markup accesible. ✗

| Métrica | Valor |
|---|---|
| Total `<svg>` | 4 |
| Con `<title>` hijo | 0 |
| Con `<desc>` hijo | 0 |
| Con `role="img"` | 0 |
| Con `aria-label="..."` | 0 |
| Con `aria-hidden="true"` | 0 |

**Detalle de los 4 SVGs:**

| # | Línea | Contenido | ¿Es decorativo? |
|---|---|---|---|
| 1 | 721 | Cadena de propiedad (Valorem → El Espectador → La Pulla) | NO — diagrama informativo |
| 2 | 823 | Cadena de intermediación financiera (trabajador → AFP → gestoras → fabricantes → Gaza) | NO — diagrama informativo (core de la investigación) |
| 3 | 1403 | Mapa 1 — Colombia: dónde quedan las AFP | NO — mapa informativo |
| 4 | 1440 | Mapa 2 — Franja de Gaza: principales blancos | NO — mapa informativo |

**Severidad:** P2 (accesibilidad). Todos los SVGs tienen un `<h3>` o `<h4>` inmediatamente antes que describe el contenido, así que la información está disponible para usuarios con screen reader. Pero la convención WCAG 1.1.1 recomienda `role="img"` + `aria-label` (o `<title>`/`<desc>` hijos) para que el screen reader anuncie el diagrama explícitamente.

**Recomendación para Fase 7:** añadir `role="img"` + `aria-label="<descripción corta del diagrama>"` a cada `<svg>`, o como mínimo `<title>` hijo.

---

## 5. HTML5 structural issues

### Métricas estructurales

| Métrica | Valor | Estado |
|---|---|---|
| DOCTYPE | `<!DOCTYPE html>` | ✓ |
| `<html lang="es">` | presente | ✓ |
| `<meta charset="UTF-8">` | presente | ✓ |
| `<meta viewport>` | presente | ✓ |
| `<title>` | presente | ✓ |
| `<main>` count | 1 | ✓ (esperado: 1) |
| `<h1>` count | 1 | ✓ (esperado: 1) |
| Balance de tags estructurales (html/head/body/section/article/aside/nav/main/header/footer/details/summary/div/figure/figcaption/blockquote/table/ul/ol/dl/form) | 243 open / 243 close | ✓ |
| `<h2>` count | 15 | ✓ |
| `<h3>` count | 50 | ✓ |
| `<h4>` count | 14 | ✓ |
| `<h5>`/`<h6>` count | 0 | OK (no se necesitan) |

### Uso de elementos semánticos

| Elemento | Count | Uso |
|---|---|---|
| `<header>` | 1 | Header global |
| `<aside>` | 1 | Sidebar con índice |
| `<nav>` | 2 | Navs de navegación |
| `<main>` | 1 | Contenido principal |
| `<section>` | 14 | Secciones temáticas |
| `<article>` | 15 | Pruebas documentales |
| `<details>` | 10 | Paneles colapsables |
| `<summary>` | 10 | Encabezados de details |
| `<table>` | 9 | Datos tabulares |
| `<thead>` | 9 | Headers de tabla |
| `<tbody>` | 9 | Bodies de tabla |
| `<th>` | 25 | Celdas de header |
| `<tr>` | 79 | Filas |
| `<td>` | 204 | Celdas de datos |
| `<blockquote>` | 16 | Citas textuales |
| `<cite>` | 10 | Attribution de citas |
| `<time>` | 0 | ⚠ No usado (fechas en texto plano) |
| `<figure>`/`<figcaption>` | 0 | ⚠ No usado (imágenes en `<img>` directas) |
| `<dl>`/`<dt>`/`<dd>` | 0 | OK (no hay listas de definición) |
| `<form>`/`<label>` | 0/0 | OK (solo 1 input de búsqueda) |

### Issues estructurales

| # | Tipo | Severidad | Descripción |
|---|---|---|---|
| 5.1 | Accesibilidad | P2 | `<input type="text" id="searchBox">` (línea 613) no tiene `<label>` ni `aria-label`. El placeholder no es accesible para screen readers. |
| 5.2 | Accesibilidad | P2 | Cero elementos con `role="..."` o atributos `aria-*` en todo el documento. Falta semántica ARIA para componentes interactivos (search box, expand/collapse buttons). |
| 5.3 | Semántica | P3 | No se usa `<figure>`/`<figcaption>` para las 16 imágenes. Actualmente van en `<article>` con `<h4>` propio, lo cual es válido pero `<figure>` es más semántico para contenido ilustrativo. |
| 5.4 | Semántica | P3 | No se usa `<time datetime="...">`. Fechas como "01 de septiembre de 2026" están en texto plano. Beneficio: permite a parsers extraer fechas automáticamente. |
| 5.5 | Seguridad | P1 | 92 anchors con `target="_blank"` SIN `rel="noopener"` (riesgo tabnabbing — el destino puede manipular `window.opener`). Ver sección 7. |

---

## 6. CSS issues (observaciones)

| # | Tipo | Severidad | Descripción |
|---|---|---|---|
| 6.1 | Inline styles | P3 | 114 atributos `style="..."` inline. No es crítico pero dificulta mantenimiento; ideal moverlos a clases en `<style>` o CSS externo. |
| 6.2 | CSS muerto | — | No se puede auditar fácilmente sin un análisis del CSS embebido (no estaba en el alcance de esta fase; se podría hacer en Fase 7 con herramientas como PurifyCSS/uncss). |

---

## 7. JS issues

### 7.1 jshint (de 6.1)

Con config `esversion: 6` (necesario por uso de `const` y arrow functions): **0 issues**. Detalle en `06_jshint.txt`.

### 7.2 Inline event handlers (CSP / separación de responsabilidades)

| # | Línea | Handler | Acción |
|---|---|---|---|
| 7.1 | (button "Expandir todo") | `onclick="document.querySelectorAll('details.panel').forEach(d => d.open = true)"` | P3 — preferir `addEventListener` en el bloque `<script>` |
| 7.2 | (button "Colapsar todo") | `onclick="document.querySelectorAll('details.panel').forEach(d => d.open = false)"` | P3 — idem |
| 7.3 | (button "Imprimir / PDF") | `onclick="window.print()"` | P3 — idem |

**Severidad:** P3 (cosmético / CSP). 3 inline handlers en una página de 2128 líneas es bajo. No bloquea publicación.

---

## 8. Otros issues (seguridad, SEO residual)

### 8.1 Tabnabbing — P1

| # | Severidad | Descripción |
|---|---|---|
| 8.1 | **P1** | **92 anchors con `target="_blank"` SIN `rel="noopener"`.** Mitigación: el destino puede usar `window.opener.location = 'phishing-site'` (reverse tabnabbing). Líneas aproximadas: 806–811 (primeras), 1047–1050, 1883, 2033–2037 (últimas). El patrón es consistente: son anchors del formato `<a href="URL" target="_blank">` sin `rel`. |

**Fix para Fase 7:** find-replace global: `<a href="X" target="_blank">` → `<a href="X" target="_blank" rel="noopener">`. O script Node/PowerShell que parsee los 92 anchors.

### 8.2 Charset declaration position — OK

`<meta charset="UTF-8">` está en la primera línea del `<head>` (línea 4). ✓ Cumple HTML5 spec (debe estar en los primeros 1024 bytes).

### 8.3 Open Graph / Twitter Card / JSON-LD — OK (cubierto en Fase 4)

Ya auditado en `04_seo_og.md`. No se re-audita aquí.

---

## 9. Resumen de issues por severidad

| Severidad | Count | Detalle |
|---|---|---|
| **P0** (bloquea publicación) | 0 | — |
| **P1** (importante, fix pronto) | 1 | Tabnabbing en 92 anchors (#8.1) |
| **P2** (accesibilidad / W3C) | 3 | SVG sin role/aria-label (#4), input sin label (#5.1), cero ARIA (#5.2), validación W3C formal pendiente (de 6.1) |
| **P3** (cosmético / nice-to-have) | 4 | Inline styles (#6.1), inline event handlers (#7.1-7.3), no `<figure>` (#5.3), no `<time>` (#5.4) |

---

## 10. Acciones priorizadas para Fase 7

1. **P1 — Tabnabbing (92 anchors):** script de fix que añade `rel="noopener"` a los 92 anchors. Verificar con regex que no se duplica si ya lo tienen.
2. **P2 — Accesibilidad SVG:** añadir `role="img"` + `aria-label` a los 4 SVGs (textos: "Cadena de propiedad Valorem", "Cadena de intermediación financiera", "Mapa Colombia AFP", "Mapa Franja de Gaza blancos ofensiva").
3. **P2 — Search input:** añadir `aria-label="Buscar en la investigación"` al `<input id="searchBox">`.
4. **P2 — W3C validation formal:** después del merge a `main`, subir a https://validator.w3.org/nu/#file y archivar output en `07_w3c_validation.md`.
5. **P3 — Inline event handlers:** mover los 3 `onclick` al bloque `<script>` con `addEventListener` (mejora CSP-compliance).
6. **P3 — Inline styles:** considerar refactor a clases (no urgente, decisión editorial).

---

## 11. Observaciones fuera de alcance (no aplicables en este audit)

- **Performance:** no auditado en esta fase. Hay 16 imágenes; convendría verificar que todas tienen tamaño razonable y formato moderno (WebP/AVIF). Pendiente para fase dedicada.
- **Accesibilidad profunda con axe-core:** ya auditada en Fase 3 (`03_axe_results.md`). No se re-audita.
- **SEO meta tags:** auditado en Fase 4 (`04_seo_og.md`). No se re-audita.
- **Coherencia narrativa:** auditado en Fase 5 (`05_coherence_threads.md`). No se re-audita.

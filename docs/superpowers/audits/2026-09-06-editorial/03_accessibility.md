# Auditoría de accesibilidad WCAG 2.1 — Reporte consolidado

**Fecha:** 2026-09-06
**Target:** index.html (1911 líneas, 172 KB)
**Estándar evaluado:** WCAG 2.1 niveles A y AA
**Herramientas:**
- axe-core 4.13.0 (librería) + jsdom 30.0.1 (Node, sin browser real)
- Auditoría manual complementaria (5 verificaciones: teclado, alt, SVG, contraste, lang)

## Resumen ejecutivo

| Categoría | Total |
|---|---|
| axe-core violations | 1 |
| Issues manuales | 8 |
| **Total issues** | **9-10** |

| Severidad | Count |
|---|---|
| Críticos (P0) | 3 |
| Altos (P1) | 4 |
| Medios (P2) | 1-2 |
| Bajos (P3) | 1 |

## Cumplimiento WCAG 2.1

| Criterio | Estado | Notas |
|---|---|---|
| 1.1.1 Non-text Content (A) | 🟢 | 16/16 imágenes con alt |
| 1.3.1 Info and Relationships (A) | 🟡 | HTML5 semántico, pero nested-interactive viola |
| 1.4.3 Contrast Minimum (AA) | 🔴 | text-mute y red fallan AA normal |
| 2.1.1 Keyboard (A) | 🟡 | Sin skip-link, outline:none sin focus-visible |
| 2.4.1 Bypass Blocks (A) | 🟡 | axe pasa por landmarks, sin skip-link explícito |
| 2.4.7 Focus Visible (AA) | 🔴 | Sin focus-visible global |
| 3.1.1 Language of Page (A) | 🟢 | `<html lang="es">` declarado |
| 4.1.1 Parsing (A) | 🟢 | HTML5 válido (verificar en Fase 6) |
| 4.1.2 Name, Role, Value (A) | 🔴 | 4 SVGs sin title/desc/role |

## Hallazgos detallados

### P0 — Críticos (bloquean lectura o accesibilidad severa)

#### P0-1: SVGs sin accesibilidad (4 instancias)
- **Línea 667:** SVG de cadena de propiedad (Valorem)
- **Línea 769:** SVG del flujo AFP→Gaza (EL BIT)
- **Línea 1349:** SVG de mapa Colombia
- **Línea 1386:** SVG de cadena de custodia boliviana
- **Issue:** falta `<title>`, `<desc>`, `role="img"`
- **Impacto WCAG:** 1.1.1, 4.1.2
- **Fix:** agregar title/desc/role="img" en cada SVG

#### P0-2: nested-interactive (axe-core)
- **Líneas 958 y 979:** `<a>` dentro de `<summary>` (panel "Propuesta Petro" y "Precedente chileno")
- **Issue:** elementos interactivos anidados
- **Impacto WCAG:** 2.1.1 (keyboard)
- **Fix:** mover `<a>` fuera de `<summary>` o reemplazar `<summary>` con estructura diferente

#### P0-3: SVG chain-links sin role/tabindex (SVG #2)
- **Línea 769 (SVG AFP→Gaza):** 14 chain-links sin `role="link"` ni `tabindex="0"`
- **Issue:** enlaces SVG no son focusables ni identificables por screen reader
- **Impacto WCAG:** 2.1.1, 4.1.2
- **Fix:** agregar `role="link"`, `tabindex="0"`, y `aria-label` a cada chain-link

### P1 — Altos (degradan experiencia)

#### P1-1: Contraste de --text-mute falla AA
- **Color:** `#707070` sobre `#0a0a0a` = **4.00:1** (falla AA normal 4.5:1)
- **34 ocurrencias** en el HTML
- **Fix:** subir a `#8a8a8a` (5.13:1) — cambio de 1 variable

#### P1-2: Contraste de --red falla AA como texto
- **Color:** `#dc2626` sobre `#0a0a0a` = **4.10:1**
- **1 uso** en `.alert strong` (línea 478)
- **Fix:** considerar crear `--red-text` separado o subir el valor

#### P1-3: outline:none sin :focus-visible global
- **Línea 148:** `.search-box:focus { outline: none; }` sin fallback
- **270+ inline-links** sin focus-visible
- **Fix:** agregar `:focus-visible { outline: 2px solid var(--accent-bright); }` global

#### P1-4: Sin skip-link explícito
- **Issue:** axe pasa `bypass` por landmarks pero no hay skip-link
- **Fix:** agregar `<a href="#resumen" class="skip-link">Saltar al contenido</a>` al inicio del body

### P2 — Medios (mejora notable pero no bloquea)

#### P2-1: (opcional) validación visual de contraste en browser real
- **Limitación:** jsdom no evalúa color-contrast pixel-perfect
- **Acción:** renderizar en Chrome real y validar con WebAIM Contrast Checker

### P3 — Bajos (cosmético)

#### P3-1: aria-label en stat cards (25 instancias)
- Las stat cards son enlaces pero no tienen `aria-label` descriptivo más allá del texto
- **Fix:** opcional, no urgente

## Acciones para Fase 7 (integración)

| # | Prioridad | Acción | Esfuerzo |
|---|---|---|---|
| 1 | P0-1 | Agregar title/desc/role="img" a 4 SVGs | 15 min |
| 2 | P0-2 | Mover `<a>` fuera de `<summary>` (2 instancias) | 10 min |
| 3 | P0-3 | Agregar role/tabindex/aria-label a 14 chain-links | 15 min |
| 4 | P1-1 | Cambiar `--text-mute` de #707070 a #8a8a8a (1 línea) | 2 min |
| 5 | P1-2 | Decidir acción sobre `--red` (subir valor o crear variable) | 10 min |
| 6 | P1-3 | Agregar `:focus-visible` global en CSS | 10 min |
| 7 | P1-4 | Agregar skip-link al inicio del body | 5 min |
| 8 | P2 | Validar contraste en browser real (manual) | 30 min |

**Total esfuerzo estimado:** ~1.5 horas para P0 + P1.

## Limitaciones conocidas

- **jsdom no evalúa color-contrast** con `getComputedStyle` real. Los ratios calculados con `calc_contrast.js` son teóricos (basados en valores hex del CSS); el render real del browser puede variar.
- **axe-core + jsdom no evalúa focus-visible**, target-size visual, ni reglas que requieren interactividad real.
- **Validación con browser real** (Chrome, Firefox) es necesaria para garantizar cumplimiento WCAG 2.1 nivel AA al 100%.

## Criterio de éxito (post-Fase 7)

- [ ] 0 violaciones críticas WCAG 2.1 nivel A
- [ ] 0 violaciones axe-core en re-run (Fase 7.2)
- [ ] Contraste AA cumplido en todos los colores
- [ ] SVGs con title/desc/role
- [ ] Focus visible en todos los interactivos
- [ ] Skip-link funcional
- [ ] (Opcional) validación con Chrome real + WebAIM Contrast Checker

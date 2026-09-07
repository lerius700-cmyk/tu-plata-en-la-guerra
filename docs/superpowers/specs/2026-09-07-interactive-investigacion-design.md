# Design — Investigación Interactiva

**Fecha**: 2026-09-07
**Estado**: Aprobado (brainstorming completado 7 secciones)
**Autor**: Lerius + Mavis

## Objetivo

Convertir la investigación periodística en una experiencia de verificación pública donde cada afirmación es clickeable y muestra su fuente con cita textual. La gente puede no creerle al autor; el sitio les da las herramientas para que verifiquen ellos mismos.

## Arquitectura

**2 páginas separadas + 1 archivo**:

| Archivo | Función | Estado |
|---|---|---|
| `index.html` | Portada — hook visual, 4 actos resumidos | ✅ Construido |
| `investigacion.html` | Cuerpo — investigación completa, 14 secciones, todas las fuentes con patrón D | 🔨 A construir |
| `dashboard.html` | Archivo — vista densa imprimible, links plain | ✅ Existe |

**URL flow**: portada → click → investigacion.html (la historia completa) → click en cada 📎 → expande cita + link al original → click en link → abre fuente.

## Componente central: `<citation>`

```html
<citation
  data-source="Cuestión Pública"
  data-url="https://cuestionpublica.com/..."
  data-date="2025-12-15"
  data-quote="cita textual exacta">
  $17 billones
</citation>
```

**Comportamiento**:
- Renderiza el texto con ícono 📎
- Click 1 → expande in-situ con cita + fuente + fecha + botón "Leer en [fuente]"
- Click 2 sobre el link → abre nueva pestaña
- Click fuera o Escape → cierra
- Múltiples pueden estar abiertas simultáneamente
- Mobile: tap funciona igual

## Stack técnico

- HTML5 estático (sin build step)
- CSS3 con custom properties (dark theme ya definido)
- Vanilla JavaScript (ES2020)
- Three.js v0.160+ desde CDN (`unpkg.com`), con fallback a canvas 2D si WebGL no disponible
- Sin frameworks, sin Google Fonts, sin analytics

## Sistema visual

- **Paleta**: dark theme `#0a0a0a` / accent `#c2410c` / gold `#fbbf24` para citas textuales
- **Tipografía**: Georgia (serif, títulos) + system sans (body) + system mono (datos)
- **Motion**: cubic-bezier(0.16, 1, 0.3, 1) para entradas, 200-700ms según jerarquía
- **Responsive**: mobile < 640, tablet 640-1024, desktop > 1024

## Cobertura de errores y accesibilidad

- **WCAG AAA contraste** (16:1 texto principal)
- **prefers-reduced-motion** desactiva animaciones
- **`<noscript>` fallback** con links directos
- **Three.js fail** → canvas 2D fallback
- **WebGL no disponible** → canvas 2D fallback
- **Mobile-first** responsive
- **Aria roles** correctos en citations (button, expanded, region)

## Contenido

14 secciones del dashboard migradas con patrón D en cada claim:

1. Resumen ejecutivo
2. Quién controla La Pulla
3. Pensiones → Gaza
4. Precedente noruego
5. Albanese 63 estados
6. Caso Italia
7. Empresas beneficiarias
8. Pruebas periodísticas (15 piezas)
9. Cerimedo y Numen
10. Negre y La Derecha Diario
11. Bautista / Thomas Greg
12. Elecciones 2026
13. Financiamiento de medios
14. Metodología

**Estimación**: ~80-120 claims con cita explícita. La cita textual debe ser **exacta** (preservar erratas con [sic] si las hay).

## Performance

- FCP < 1.5s en 3G
- TTI < 2.5s en 3G
- HTML total ~250KB sin comprimir
- Three.js: 150KB (CDN, cacheable)
- CSS/JS inline: ~25KB

## Verificación

Pirámide (de más a menos crítico):

1. **Citas precisas** — cada cita textual debe coincidir exactamente con la fuente. Verificación manual de Lerius. NO negociable.
2. **Funcionalidad del componente** — click expande, click cita abre link, Escape cierra, mobile ok
3. **Visual polish** — Lerius aprueba
4. **Performance** — Lighthouse ≥ 85
5. **Accesibilidad** — Lighthouse a11y ≥ 95
6. **Cross-browser** — Chrome, Firefox, Edge, Safari últimas versiones

## Deploy

Una sola URL pública (vía `website_deploy`). El sitio entero se sube de una vez.

## Lo que NO se hace

- SEO avanzado (schema ya está, no es prioridad)
- Cross-browser legacy
- Carga de estrés
- Integración social (Open Graph sí, share buttons no)
- Modo claro/oscuro toggle
- Newsletter
- Analytics

## Iteración con Lerius

1. Construyo estructura + componente + 10-15 citas de muestra
2. Lerius revisa look + mecánica + tono
3. Termino las ~100 citas restantes
4. Lerius revisa veracidad de las citas (solo él puede)
5. Deploy

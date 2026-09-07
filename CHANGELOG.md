# Changelog

Todas las versiones notables de esta investigación se documentan aquí.

## [v1.0] — 2026-09-07

### Primera publicación pública

**Sitio desplegado**: https://2q5a5sdg8o2sn.space.minimax.io

### Estructura

- **3 páginas autocontenidas** (sin dependencias de servidor)
  - `/` — Portada con 7 stat cards animadas, panel "Verificable en 30 segundos" (5 claims linkeables a fuentes), narrativa de 4 actos
  - `/investigacion.html` — 252KB · 14 secciones + Cierre · 125 citations clickeables
  - `/dashboard.html` — Vista densa de archivo (sin iterar más)

### Contenido

- **14 secciones narrativas** con visual propio en 11 de ellas
- **125 citations** (patrón D: click → expand inline → cita textual + fuente + fecha + link)
- **15 pruebas documentales** en `evidencia/` (JPG + HTML editable)
- **~60 fuentes únicas** en la bibliografía autogenerada
- **19 eventos cronológicos** en la tabla de tiempo maestra (2018-2026)
- **Principio rector** (en Cierre): "mostrar el dinero, no editorializar"

### Diagramas SVG propios (10)

| Sección | Visual |
|---|---|
| 01 Quién paga | Bipartito donantes→medios |
| 02 Pensiones | Flujo 4 etapas AFP→gestoras→armas→Gaza |
| 03 Noruega | Timeline 3 eventos + contraste colombiano |
| 04 Albanese | Barras top proveedores + 63 estados por categoría |
| 05 Italia | Cadena italiana + 4 denunciados CPI |
| 06 Pruebas | Distribución 15 piezas por tipo |
| 07 Cerimedo | Radial Numen (13 países + clientes presidenciales) |
| 08 Negre | Timeline 6 hitos + red 5 personas |
| 09 Thomas Greg | Waffle 27 contratos + concentración 62,5% |
| 10 Elecciones | Tabla resultados + margen + comparativa 1v vs 2v |

### Navegación

- Mini-TOC al inicio del cuerpo (grid 14 cards)
- Botón flotante "↑ Volver arriba" (aparece tras 600px de scroll)
- Panel "Verificable en 30 segundos" en portada

### Técnico

- `robots.txt` configurado (permite portada y cuerpo, excluye dashboard)
- SEO: OpenGraph, Twitter Card, JSON-LD NewsArticle schema
- Accesibilidad: ARIA labels en citations, prefers-reduced-motion respetado
- Responsive: grids `auto-fit minmax()` colapsan a 1 columna en mobile
- Cross-deploy in-place: el `node_id` del primer deploy se mantiene estable

### Legal

- Disclaimer "presuntamente" en toda afirmación sobre responsabilidad penal/civil
- Presunción de inocencia explícita
- "La conclusión sobre a quién defiende cada medio la saca el lector"
- Sin editorialización: solo se documentan cadenas de intermediación financiera

---

## Próximas versiones

Esta es la v1.0 — primera publicación pública. Las actualizaciones se etiquetarán v1.1, v1.2, etc. a medida que se agreguen correcciones o evidencia nueva. La decisión de cuándo lanzar una nueva versión la tiene el autor.

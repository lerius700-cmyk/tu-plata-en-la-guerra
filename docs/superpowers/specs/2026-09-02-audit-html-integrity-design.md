# Plan de auditoría de integridad del HTML

**Fecha:** 2026-09-02
**Proyecto:** Periodismo político-económico
**Solicitado por:** Lerius
**Aprobación:** pendiente

## Contexto

El HTML `index.html` (167 KB, 1906 líneas, 306 `<a>` totales) es el entregable principal de la investigación periodística. Tras múltiples iteraciones añadiendo pruebas visuales, hyperlinks y cards interactivas, el documento requiere una auditoría completa de:

1. **Integridad gramatical, semántica y sintáctica** del texto en español
2. **Integridad de cada hyperlink** (306 enlaces: externos, internos, mailto, anclas)
3. **Errores factuales** latentes (typos, cifras infladas, atribuciones incorrectas)

El usuario ya detectó un error en la línea 1023: `"cacas de combate"` debe ser otra palabra (probable `"armas"`). Esto valida la sospecha de que hay más errores que no se han visto.

## Objetivos

1. **Encontrar todos los errores** gramaticales, semánticos, sintácticos y factuales en el HTML
2. **Validar los 306 links** con verificación HTTP real
3. **Producir un reporte accionable** con fixes priorizados
4. **Aplicar los fixes** sin romper la interactividad recién añadida
5. **Dejar trazabilidad**: cada fix debe tener una razón documentada

## Arquitectura (4 fases)

### Fase 1 — Auditoría de links (~20-30 min)

**Herramienta:** Node script `tools/audit_links.js`

**Acciones:**
- Extraer todos los `href` de `<a>`, `xlink:href` de SVG, `src` de `<img>`
- Categorizar: externos (http/https), internos (anclas), mailto, recursos locales
- HEAD request paralelo a cada link externo (concurrencia: 10, timeout: 8s, retry: 1)
- Detectar: 200 OK, 3xx (redirects), 4xx (broken), 5xx (server error), timeout, DNS fail
- Validar anclas internas (`#prueba-N`, `#seccion`) contra IDs reales del HTML
- Output: `link_audit_report.md` + `link_audit_report.json`

**Skill usada:** `superpowers:test-driven-development` (escribir tests para casos edge: redirects, anchors, timeouts)

### Fase 2 — Linter ortográfico/gramatical (~30-45 min)

**Herramienta:** LanguageTool API pública (`https://api.languagetool.org/v2/check`) — Spanish (`es`)

**Acciones:**
- Extraer todo el texto visible del HTML (sin código, sin atributos)
- Procesar en chunks de 5000 caracteres (límite API pública)
- Categorizar errores: TYPOS (ortografía), GRAMMAR (concordancia, tiempos), STYLE (estilo, redundancia)
- Output: `grammar_audit_report.md` con ubicación (línea aprox), tipo, sugerencia, contexto

**Limitación conocida:** LanguageTool API gratuita tiene rate limit (20 req/min). Para 140K caracteres → ~28 requests. Asumiendo ~5 seg/req → ~2.5 min solo de red.

**Alternativa si falla:** usar `languagetool-python` local con modelo descargado, o fallback a revisión manual con subagente.

**Skill usada:** N/A (uso directo de la API)

### Fase 3 — Revisión semántica/sintáctica con subagentes (~60-90 min)

**Herramienta:** 4 subagentes en paralelo usando `task` con `agent_name=explorer` (read-only)

**Acciones:**
- Dividir el HTML en 4-5 secciones grandes:
  - 0. Resumen ejecutivo + 1. La Pulla + 2. Pensiones
  - 3. Noruega + 4. Albanese + 5. Italia
  - 6. Empresas + 7. Cerimedo + 8. Negre
  - 9. Bautista + 10. Elecciones + 11. Medios + 12. Metodología
  - 6.6 Pruebas (gallery)
- Cada subagente lee su sección y produce:
  - Lista de errores factuales (cifras, fechas, atribuciones)
  - Lista de problemas semánticos (afirmaciones que no se sostienen)
  - Lista de problemas sintácticos (oraciones confusas, estructura rota)
  - Lista de redundancias o repeticiones innecesarias
- Output consolidado: `semantic_audit_report.md`

**Skill usada:** `superpowers:dispatching-parallel-agents`

### Fase 4 — Aplicación de fixes (~60-90 min)

**Herramienta:** `worker` agent con scope acotado por fase

**Acciones:**
- Agrupar fixes por tipo: ortografía, links rotos, semántica, factual
- Aplicar fixes en batches, validando después de cada batch:
  - Re-correr link checker
  - Re-leer las secciones modificadas
- Documentar cada cambio en `fixes_applied.md` con: antes/después, razón, source verificado
- Re-correr Fase 1 + Fase 2 al final para confirmar 0 errores

**Skill usada:** `superpowers:verification-before-completion` (no declarar terminado hasta verificar)

## Skills de MAVIS / superpowers a usar

| Skill | Cuándo | Por qué |
|-------|--------|---------|
| `superpowers:brainstorming` | ahora | Ya en uso (este doc es el spec) |
| `superpowers:writing-plans` | siguiente paso | Crear plan de implementación ejecutable |
| `superpowers:test-driven-development` | Fase 1 | Para el script de link checker (casos edge) |
| `superpowers:dispatching-parallel-agents` | Fase 3 | 4 subagentes en paralelo, lectura independiente |
| `superpowers:verification-before-completion` | Fase 4 | No declarar "listo" sin verificar |
| `superpowers:systematic-debugging` | durante todas | Si aparecen errores del propio script |
| `mcode-tools-master` | Fase 1 | Para ejecutar Node script + web_fetch si necesito verificar manualmente |
| `humanizer` | Fase 4 (opcional) | Para pulir el texto post-fix |

## Entregables

1. `tools/audit_links.js` — script Node para Fase 1
2. `link_audit_report.md` + `.json` — resultados Fase 1
3. `grammar_audit_report.md` — resultados Fase 2
4. `semantic_audit_report.md` — resultados Fase 3
5. `fixes_applied.md` — log de cambios Fase 4
6. **HTML actualizado** con todos los fixes aplicados

## Riesgos y mitigación

- **Riesgo:** LanguageTool API rate limit / caída temporal
  **Mitigación:** Fallback a `languagetool-python` local o revisión manual con subagente

- **Riesgo:** Links a fuentes que ahora son pago o moved (ej. VLex, El Tiempo premium)
  **Mitigación:** Marcar como "redirected" pero no broken, no eliminar

- **Riesgo:** Fixes que rompen interactividad (e.g., renombrar sección rompe anclas)
  **Mitigación:** Re-correr Fase 1 después de cada batch, validar que anclas internas siguen funcionando

- **Riesgo:** Cambios en el texto que alteran el sentido periodístico
  **Mitigación:** Subagente con instrucciones explícitas de "marcar, no corregir" cuando hay duda semántica; usuario revisa fixes sensibles

## Out of scope (explícito)

- Reescritura del estilo narrativo
- Cambios en la estructura de secciones (solo el texto dentro)
- Modificación de las pruebas visuales (ya validadas)
- Cambios al dosier en markdown (DOSIER_COMPLETO.md) — solo HTML

## Criterio de éxito

- 0 errores ortográficos/gramaticales reportados por linter
- 0 broken links (4xx/5xx) en externos
- 0 anclas internas rotas
- 0 typos factuales sin corregir
- Cada fix documentado con razón
- HTML sigue funcionando offline (no se introducen dependencias externas)
- Las 15 pruebas visuales y los 209 elementos interactivos intactos

## Decisiones a confirmar

1. **¿Qué hacer con anchors rotos?** (e.g., si una sección fue renombrada)
   - Recomendación: actualizar el href en lugar de eliminar la referencia
2. **¿Qué hacer con links a contenido paywalled?** (VLex, El Tiempo premium)
   - Recomendación: marcar como "paywalled" pero mantener el link
3. **¿Aplicar fixes automáticamente o esperar aprobación por cada batch?**
   - Recomendación: aplicar ortográficos/links rotos automáticamente; pedir aprobación para semánticos/factuales
4. **¿El typo "cacas" en línea 1023 — es "armas" u otra palabra?**
   - Recomendación: cambiar a "armas" y flaggear para verificación

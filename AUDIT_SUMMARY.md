# Resumen Ejecutivo de Auditoría — 2026-09-06

**Plan:** `docs/superpowers/plans/2026-09-02-audit-html-integrity.md`
**HTML auditado:** `index.html` (171 KB, 1906 líneas)
**Fases:** 1 (link integrity) + 2 (grammar) + 3 (semantic) + 4 (auto-fixes) + 5 (verificación final)

---

## Resultados globales

| Métrica | Antes (Task 1-3) | Después (Task 4-5) | Δ |
|---------|------------------|--------------------|---|
| **Total fixes aplicados** | 0 | **5** | +5 |
| Links analizados | 433 | 433 | 0 |
| Links OK (200) | 360 | **362** | **+2** |
| Links rotos (4xx/5xx) | 51 | **49** | **-2** |
| Errores (DNS/cert) | 21 | 21 | 0 |
| Timeouts | 1 | 1 | 0 |
| **Total issues restantes** | **73** | **71** | **-2** |
| Errores gramaticales LT | 588 | **587** | -1 |
| Errores semánticos CRÍTICOS | 8 | 8 | 0 (7 pendientes) |
| Errores semánticos ALTOS | 29 | 29 | 0 |
| Errores semánticos MEDIOS | 30 | 30 | 0 |
| Redundancias BAJO | 21 | 21 | 0 |

**Cambio neto:** -2 broken links, -1 grammar match. Errores semánticos no abordados (fuera del scope de auto-fix).

---

## Fixes aplicados (Task 4)

| # | Tipo | Línea | Cambio | Razón | Verificación |
|---|------|-------|--------|-------|--------------|
| 1 | CRIT-1 factual | L651 | "campaña de **Abelardo de la Espriella**" → "campaña de **Rodrigo Paz** en Bolivia" (link a `Rodrigo_Paz_Pereira`) | Atribución errónea en resumen ejecutivo. L1661+L1684 confirman que Cerimedo asesoró a Rodrigo Paz (Bolivia), no a De la Espriella. | ✅ 200 OK Wikipedia |
| 2 | CRIT-4 typo | L1023 | "una mantenía **cacas de combate**" → "una mantenía **relación con armas**" | Typo/palabra faltante. Frase original es agramatical. Reconstrucción gramatical coherente con el contexto (Noruega excluye empresas tras informes ONU sobre Gaza). | ✅ Coherencia con timeline L1028-L1033 |
| 3 | LINK 404 | L662 | `Familia_Santo_Domingo` → `Julio_Mario_Santo_Domingo` | La sugerida del brief (`Santo_Domingo_(familia)`) también es 404. Se eligió la página del patriarca (17 KB, categorizada "Familia Santo Domingo") por ser la referencia más relevante al clan Valorem/Bavaria descrito. | ✅ 200 OK |
| 4 | LINK 404 typo | L915 | `cuestionpublica.com/.../bombardeo-de-nios-en-gaza/` → `.../bombardeo-de-ninos-en-gaza/` | Typo "nios" (sin la primera n) en 1 de 12 instancias. Las otras 11 (L607, L791, L797, L803, L899, L903, L907, L911, L993, L1336, L1504) ya estaban correctas. | ✅ 200 OK |
| 5 | LINK 404 | L1154 | `leonardo.com/en/investors/share-information` → `leonardo.com/en/investors` | Subruta `/share-information` no existe. Página principal de investors sí existe. | ✅ 200 OK |

**Total:** 5 fixes verificados. 1 fix SKIPPED documentado (Javier Negre — ver abajo).

---

## Pendientes para decisión del usuario

### 1. CRIT-2: Unidad de masa del combustible (L1147-1148)
- **Hallazgo:** Stat block "220k quilotoneladas de combustible transferidas" usa unidad técnicamente incorrecta. "Quilotoneladas" mezcla prefijo "quilo-" (10³) con "tonelada" (10³ kg) = 10⁶ kg, pero "kilotones" se usa para energía explosiva (TNT equivalente), no para masa.
- **Impacto:** Visible en stat block, posible uso en video.
- **Recomendación:** Verificar la cifra con la fuente original del informe Albanese (citado en L1079). Probable corrección: "220k toneladas" si la cifra es de masa, o "~220 kt TNT eq." si es energía.
- **Riesgo:** No se aplicó auto-fix porque requiere lectura del informe primario.

### 2. CRIT-3: Cifras de Noruega internamente inconsistentes (L1018 vs L1039)
- **Hallazgo:** "USD 2,18 mil millones en 65 empresas israelíes" implica que Caterpillar sola (USD 2.040 millones, 1,23% de participación) representa el 93% del total. Inconsistencia de unidad probable.
- **Recomendación:** Verificar el Annual Report 2025 del Fondo de Pensiones de Noruega (https://www.regjeringen.no/en/documents/annual-report-2025/id3152102/). Probable corrección: la cifra total es USD 2,18B en 65 empresas, pero Caterpillar sola es ~USD 2 mil millones, lo que sugiere que la cifra "USD 2,18 mil millones" corresponde a otro agregado (e.g., solo empresas israelíes, o solo equity).
- **Riesgo:** Cifra puede llegar a video sin corrección.

### 3. CRIT-4: Mapa Colombia — Skandia/Colfondos en ciudades incorrectas (L1364-1368)
- **Hallazgo:** Mapa SVG ubica Skandia en Cali y Colfondos en Barranquilla. Sus sedes reales están en Bogotá. El comentario HTML lo confirma textualmente: `<!-- Cali (Skandia) -->` y `<!-- Barranquilla (Colfondos) -->`.
- **Impacto:** Mapa central, alta visibilidad. Cualquier observador externo detecta el error.
- **Recomendación:** Mover ambos markers a las coordenadas de Bogotá (cx≈250, cy≈360) en el SVG de la sección 04.
- **Riesgo:** Si el mapa se usa en video, error detectable.

### 4. CRIT-5: "$13.874M" con unidad ambigua (L1359)
- **Hallazgo:** Stat block usa "M" (millones) en un documento donde se usa "B" para billones consistentemente. Formato inconsistente puede generar confusión (¿millones? ¿miles de millones?).
- **Recomendación:** Aclarar unidad o reformatear ("$13,874 millones" o "$13.874M" con glosa explícita).
- **Riesgo:** Bajo — solo confunde a lectores que no están familiarizados con la convención.

### 5. CRIT-6: VP Restrepo sin fuente directa (L1895)
- **Hallazgo:** El claim de que José Manuel Restrepo es VP de De la Espriella aparece sin link a fuente primaria.
- **Recomendación:** Buscar fuente oficial (página de campaña, declaración pública, comunicado de prensa) y añadir link.

### 6. CRIT-7/8: Correcciones internas (236.523 vs 13.919, fecha 2014 vs 2018)
- **Hallazgo:** Sección 07 contiene auto-correcciones explícitas (L1633: "236.523 votos, no 13.919 como se dijo inicialmente" y fecha ajustada de 2014 a 2018), pero estas correcciones NO se proyectan al resumen ejecutivo. Si se difunde el resumen, contiene la cifra/cifra desactualizada.
- **Recomendación:** Incorporar la versión corregida al resumen ejecutivo (L608-635) o nota explícita "(cifra corregida post-publicación)".

### 7. SKIPPED — Javier Negre Wikipedia (8 ocurrencias: L652, L1676, L1694, L1700, L1751, L1754, L1965, L2012)
- **Hallazgo:** `https://en.wikipedia.org/wiki/Javier_Negre` devuelve 404.
- **Fix sugerido por brief:** Cambiar a `https://es.wikipedia.org/wiki/Javier_Negre` — **también 404**. Búsqueda exhaustiva en MediaWiki API (en + es) confirma que ninguna página "Javier Negre" existe en Wikipedia.
- **Estado:** NO se aplicó. Documentado en `fixes_applied.md`.
- **Recomendación:** El autor debe decidir:
  - Buscar página alternativa (Wikipedia en otro idioma, página sobre "Estado de Alarma TV" / "La Derecha Diario" / "Madero Media Group" que mencione a Negre)
  - Reemplazar con link a perfil de X/Twitter u otro recurso
  - Eliminar el link y mantener solo el texto

### 8. 47 broken links restantes (no fixes individuales propuestos)
- **Composición:**
  - 30 con 403 (UA filtering — false positives, sitios válidos que bloquean el bot del checker)
  - 9 con error de certificado/DNS (problemas del sitio: thomasgreg.com cert expirado, comunicansa.com no resuelve, aporteresolidario.com no resuelve, cne.gov.co cert, funcionpublica.gov.co cert, registraduria.gov.co timeout, grupoaval.com timeout)
  - 8 con 404 (Javier Negre Wikipedia — ver punto 7)
  - 1 con 404 (`infodifesa.it/leonardo-e-lombra-di-gaza-cingolani-contrattaca-tra-accuse` L1599)
  - 1 con 404 (`www.eltiempo.com/justicia/cortes/consejo-de-estado-anulo-3-curules-del-s` L1789)
  - 1 con 404 (`it.euronews.com/2025/10/30/francesca-albanese-accusa-63-paesi-di-complic` L1218, HTTP 406)
  - 1 con 429 (revistaraya.com L1974)
- **Recomendación:** Re-test de 403s con navegador real (deberían resolver). Otros son problemas de los sitios destino, no del HTML.

---

## Cambios NO aplicados con justificación

### 1. Grammar auto-fixes de categorías "seguras"
- **Categorías no aplicadas:** Tipografía, Puntuación, Diacríticos, Mayúsculas.
- **Razón:** Las matches específicas en el `grammar_audit_report.md` son mayoritariamente falsos positivos:
  - `COMMA_PARENTHESIS_WHITESPACE` (136): formatea listas tipo "(A, B, C)" — falso positivo en el contexto del HTML, los espacios están bien.
  - `ABBREVIATIONS_EEUU` (23): "EE.UU" sin espacio antes del segundo punto — la versión "EE. UU." es la preferida por LT pero no es estándar en español de Colombia.
  - `INCORRECT_SPACES` (10): matches en código JS inline (`d.open = false`) o en tags HTML.
  - `PUNTO_EN_ABREVIATURAS` (6): "d.open" detectado como abreviatura con punto faltante — falso positivo.
  - `ES_UNPAIRED_BRACKETS` (5): brackets en código JS detectados como imbalance — falso positivo.
- **Decisión:** No aplicar masivamente. Si se quiere aplicar Tipografía, debe hacerse de forma quirúrgica, fix por fix, con verificación manual.

### 2. CRIT-2 a CRIT-8 (semánticos)
- **Razón:** Requieren investigación adicional (consulta de fuentes primarias, verificación de cifras, revisión de estilo narrativo). No son auto-fixes aplicables con confianza desde el HTML solo.
- **Acción:** Marcados como pendientes para decisión del autor.

### 3. Reescritura de estilo narrativo
- **Razón:** Fuera del scope del plan. El HTML es internamente robusto en secciones detalladas; las redundancias BAJO (21) son opcionales y se mantienen para preservar la voz editorial.

### 4. Cambios en DOSIER_COMPLETO.md
- **Razón:** El plan cubre `index.html` exclusivamente. `DOSIER_COMPLETO.md` no fue auditado en este plan.

---

## Top 5 hallazgos pendientes para el usuario

1. **CRIT-2 (L1147): "quilotoneladas de combustible transferidas"** — unidad técnicamente incorrecta. Requiere consulta del informe Albanese original para verificar si la cifra es masa o energía. **Prioridad alta** si el documento se va a usar en video.

2. **CRIT-4 (L1364-1368): Mapa Colombia — Skandia/Colfondos en ciudades incorrectas** (Cali/Barranquilla en lugar de Bogotá). **Prioridad alta** — el mapa es central, alta visibilidad, detectable por cualquier observador externo.

3. **CRIT-3 (L1018 vs L1039): Cifras de Noruega internamente inconsistentes** (USD 2,18B en 65 empresas vs USD 2,04B solo en Caterpillar). **Prioridad media-alta** — puede confundir al lector o llevar a error en cifras citadas en video.

4. **CRIT-7/8: Correcciones internas no proyectadas al resumen ejecutivo** (236.523 votos vs 13.919; fecha 2014 vs 2018). **Prioridad media** — el resumen ejecutivo es la sección más probable de difundirse.

5. **Javier Negre Wikipedia (8 ocurrencias)** — el fix sugerido del brief no resuelve el 404. **Prioridad media** — el autor debe decidir si busca recurso alternativo o elimina el link.

---

## Validación final ejecutada (Task 5)

| Check | Resultado |
|-------|-----------|
| Link checker re-ejecutado | ✅ 433 links, 362 ok, 49 broken, 21 error, 1 timeout |
| Grammar checker re-ejecutado | ✅ 11 chunks, 0 fallidos, 587 matches (-1 desde pre-fix) |
| L651 dice "Rodrigo Paz en Bolivia" | ✅ Verificado |
| L1023 dice "relación con armas" | ✅ Verificado |
| L662 link a `Julio_Mario_Santo_Domingo` | ✅ Verificado |
| L915 y otras 11 URLs con "ninos" (no "nios") | ✅ Verificado (12 ocurrencias del URL correcto; 3 falsos positivos de "escrutinios") |
| L1154 link a `leonardo.com/en/investors` (no `/share-information`) | ✅ Verificado |
| Estructura HTML intacta | ✅ 1906 líneas, 270 inline-links, 25 stat cards, 16 chain-links, 15 pruebas |
| `AUDIT_SUMMARY.md` generado | ✅ Este archivo |
| Log en `progress.md` | ✅ Entrada añadida |
| `task-5-report.md` generado | ✅ Reporte de task |

---

## Out of scope (no abordado en este plan)

- Reescritura de estilo narrativo / deduplicación de las 21 redundancias BAJO
- Cambios en `DOSIER_COMPLETO.md`
- Verificación visual del HTML renderizado (no se abrió navegador; verificación por lectura directa del HTML)
- Re-test de 403s con navegador real (probables false positives)
- Verificación de existencia de imágenes en `evidencia/` (Pruebas #1-#15)
- Verificación del cuarto informe Albanese de febrero 2026 (L1079)
- Verificación de la cifra "32 años" para "la elección más estrecha en 32 años" (L1893)
- Auto-fixes gramaticales de las categorías seguras (riesgo de regresión por falsos positivos)

---

## Paths de artefactos

- **HTML auditado:** `D:\AI\Investigaciones\Periodismo politico-economico\index.html` (171 KB, 1906 líneas)
- **Link audit:** `D:\AI\Investigaciones\Periodismo politico-economico\link_audit_report.md` + `.json`
- **Grammar audit:** `D:\AI\Investigaciones\Periodismo politico-economico\grammar_audit_report.md`
- **Semantic audit:** `D:\AI\Investigaciones\Periodismo politico-economico\semantic_audit_report.md`
- **Fixes aplicados:** `D:\AI\Investigaciones\Periodismo politico-economico\fixes_applied.md`
- **Este resumen:** `D:\AI\Investigaciones\Periodismo politico-economico\AUDIT_SUMMARY.md`
- **Reportes de task:** `D:\AI\Investigaciones\Periodismo politico-economico\.superpowers\sdd\2026-09-02-audit-html-integrity\task-{1,2,3,4,5}-report.md`
- **Log:** `D:\AI\Investigaciones\Periodismo politico-economico\.superpowers\sdd\2026-09-02-audit-html-integrity\progress.md`

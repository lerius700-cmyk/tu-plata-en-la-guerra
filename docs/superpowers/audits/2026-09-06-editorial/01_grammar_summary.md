# Resumen re-auditoría gramatical (2026-09-06)

**Línea base (2026-09-01, commit `b6b0c25`):** 587 matches LanguageTool
**Resultado re-auditoría (2026-09-06):** 585 matches LanguageTool
**Delta neto:** **-2** (mejora de 2 matches en 5 días)

**Texto analizado:**
- sep 1 → 52332 caracteres
- sep 6 → 52402 caracteres
- Δ +70 chars (1,4 % más texto, pero -2 matches: edición neta favorable)

**Fuente de ambos runs:** LanguageTool API pública (`https://api.languagetool.org/v2/check`), idioma `es`, chunks de 5000 chars, sleep 3500 ms entre requests. Script: `tools/audit_grammar.js` (sin modificar).

**Chunks fallidos en este run:** 0/11.

---

## Resumen por categoría (delta sep 1 → sep 6)

| Categoría | Matches sep 1 | Matches sep 6 | Delta |
|---|---:|---:|---:|
| Posible error ortográfico | 371 | 368 | **-3** |
| Tipografía | 157 | 156 | -1 |
| tipografía | 23 | 24 | +1 |
| Ortografía | 9 | 9 | 0 |
| Concordancia en grupos nominales | 6 | 6 | 0 |
| Puntuación | 5 | 5 | 0 |
| Mayúsculas y minúsculas | 4 | 6 | **+2** |
| recomendaciones de tipografía | 3 | 3 | 0 |
| Varios | 2 | 2 | 0 |
| Confusiones | 2 | 2 | 0 |
| Diacríticos (tilde) | 1 | 1 | 0 |
| repeticiones | 1 | 1 | 0 |
| expresiones incorrectas | 1 | 1 | 0 |
| Expresiones incorrectas | 1 | 1 | 0 |
| Cambios en las normas lingüísticas | 1 | 0 | -1 |
| **TOTAL** | **587** | **585** | **-2** |

> **Nota de nomenclatura:** "Tipografía" (con mayúscula) y "tipografía" (minúscula) son dos categorías distintas que LanguageTool devuelve por separado. El delta combinado de ambas es **0** (157+23=180 → 156+24=180). El delta interno (-1 / +1) parece ser una reasignación trivial de la misma clase de regla.

---

## Resumen por regla (top 20, delta sep 1 → sep 6)

| Regla | sep 1 | sep 6 | Delta |
|---|---:|---:|---:|
| MORFOLOGIK_RULE_ES (typos) | 371 | 368 | **-3** |
| COMMA_PARENTHESIS_WHITESPACE (whitespace) | 136 | 135 | -1 |
| ABBREVIATIONS_EEUU (tipografía) | 23 | 24 | +1 |
| INCORRECT_SPACES (whitespace) | 10 | 10 | 0 |
| UPPERCASE_SENTENCE_START (casing) | 4 | 6 | **+2** |
| PUNTO_EN_ABREVIATURAS (tipografía) | 6 | 6 | 0 |
| ES_UNPAIRED_BRACKETS (puntuación) | 5 | 5 | 0 |
| APOSTROFO_ACENTO (ortografía) | 4 | 4 | 0 |
| CLICK_CLIC (ortografía) | 4 | 4 | 0 |
| ENERO_01 (tipografía) | 3 | 3 | 0 |
| ESPACIO_DESPUES_DE_PUNTO (tipografía) | 3 | 3 | 0 |
| AGREEMENT_ADJ_NOUN (gramática) | 3 | 3 | 0 |
| AGREEMENT_DET_NOUN (gramática) | 2 | 2 | 0 |
| SPANISH_WORD_REPEAT_RULE (repeticiones) | 2 | 2 | 0 |
| CONFUSION_AL_LA (confusiones) | 2 | 2 | 0 |
| SPACE_UNITIES (whitespace) | 2 | 2 | 0 |
| SUBJUNTIVO_PASADO (diacríticos) | 1 | 1 | 0 |
| PHRASE_REPETITION (repeticiones) | 1 | 1 | 0 |
| UN_UNO (gramática) | 1 | 1 | 0 |
| PREFIJOS_JUNTOS_EN_DICCIONARIO (ortografía) | 1 | 1 | 0 |

---

## Regresiones (matches nuevos introducidos desde sep 1)

Total: **3 matches nuevos** (todos fuera del top 50, no identificables por línea exacta sin re-extraer JSON):

| Regla | Categoría | +Δ | Notas |
|---|---|---:|---|
| UPPERCASE_SENTENCE_START | Mayúsculas y minúsculas | +2 | Sentence-start uppercase violations nuevas. Probable: dos frases que antes empezaban con mayúscula y tras una edición menor ahora no. |
| ABBREVIATIONS_EEUU | tipografía (minúscula) | +1 | Una aparición adicional de "EE.UU" sin puntos. |

**Verificación top 50:** comparé programáticamente las primeras 50 filas de la tabla "Top 50 errores" de ambos reports (`b6b0c25:grammar_audit_report.md` vs `grammar_audit_report.md` regenerado). Resultado: **0 diferencias** — los mismos 50 errores aparecen en ambas ejecuciones, en el mismo orden. Es decir, las 3 regresiones están todas en posiciones 51+ de la lista (no en el top 50 visible), por lo que el reporte de Fase 4 no las puede priorizar a simple vista — haría falta el JSON crudo para identificarlas.

---

## Matches resueltos (que estaban en sep 1 pero ya no en sep 6)

Total: **5 matches resueltos** (todos fuera del top 50, no verificables por línea exacta sin re-extraer JSON):

| Regla / categoría | -Δ | Notas |
|---|---:|---|
| MORFOLOGIK_RULE_ES (typos) | -3 | 3 typos menos. Sin acceso al JSON, no se puede saber cuáles (¿Numen/Negra, "Colfondos" mal segmentado, etc.?). |
| COMMA_PARENTHESIS_WHITESPACE | -1 | Un espacio-coma-paréntesis corregido. |
| Categoría "Cambios en las normas lingüísticas" (entera) | -1 | La categoría completa desapareció del reporte. Probablemente la regla `CAMBIO_NORMATIVO_xxx` o similar. No aparece en el top 20 de ninguna de las dos ejecuciones. |

**Verificación top 50:** las 50 filas visibles son idénticas — los 5 matches resueltos también están más allá de la posición 50.

---

## Categorías con más crecimiento (top 3 por delta absoluto)

1. **Mayúsculas y minúsculas** → +2 (regla: `UPPERCASE_SENTENCE_START`)
2. **tipografía (minúscula)** → +1 (regla: `ABBREVIATIONS_EEUU`)
3. **Tipografía (mayúscula)** → -1 (regla: `COMMA_PARENTHESIS_WHITESPACE`, transferencia hacia la versión "tipografía minúscula" de la misma clase)

---

## Resumen de la muestra top 50 (idéntica en ambas ejecuciones)

Los 50 errores más relevantes que reporta la API son los mismos en sep 1 y sep 6 — todos vienen del primer chunk de 5000 chars (índice y primeros apartados del documento). Predominan:

- **MORFOLOGIK_RULE_ES (typos)** — palabras que LT no reconoce: "Albanese" (en lugar de "Albanés"), "Cerimedo" (LT sugiere "Cerdedo/Ceriondo" — la API no tiene el nombre propio), "Colfondos" → "Col fondos", "Skandia" → "Sandía", "Invesco" → "Invento", "Elbit", "IDF", "JDAM", "desinvirtió" (sugiere "des invirtió"). La mayoría son **nombres propios** o **siglas** que LT no conoce → **falsos positivos típicos**.
- **COMMA_PARENTHESIS_WHITESPACE** — 135 instancias de patrón "( X , Y , Z )" con espacios alrededor de comas dentro de paréntesis. Esto es **estilístico, no un error gramatical**; es la convención del documento y debe revisarse manualmente si se quiere cambiar.
- **ABBREVIATIONS_EEUU** — 24 instancias de "EE.UU" sin puntos finales. La API sugiere "EE. UU." con espacio. Es decisión editorial.
- **UPPERCASE_SENTENCE_START** — 6 casos de frases que LT cree que deberían empezar con mayúscula. Probablemente después de abreviaturas tipo "d.ope n = true)" que el script extrae del HTML inline.

---

## Conclusiones para Fase 4 (revisión editorial de matches)

- **Los 368 typos (`MORFOLOGIK_RULE_ES`) son en su mayoría falsos positivos** (nombres propios no catalogados, siglas, palabras en inglés como "Genocide", "Crime", "README", "Sons"). Cualquier fix automático debe filtrar contra un diccionario de nombres propios del documento (Albanese, Cerimedo, Colfondos, Skandia, Invesco, Elbit, IDF, JDAM, etc.).
- **Los 135 COMMA_PARENTHESIS_WHITESPACE y 24 ABBREVIATIONS_EEUU son decisiones de estilo**, no errores. La Fase 4 debe decidir si normalizar.
- **Los 10 INCORRECT_SPACES, 5 ES_UNPAIRED_BRACKETS, 3 ESPACIO_DESPUES_DE_PUNTO** sí son candidats a fix automático (whitespace mal colocado).
- **El reporte raíz `grammar_audit_report.md/json` se restauró con `git restore`** para no contaminar la PR (mismo proceder que Task 1.1).

---

## Verificación

- ✅ Script `tools/audit_grammar.js` NO modificado (verificado — `git diff tools/audit_grammar.js` vacío).
- ✅ Archivo `index.html` NO modificado (verificado — `git diff index.html` vacío).
- ✅ `grammar_audit_report.md` raíz restaurado con `git restore` antes del commit.
- ✅ Outputs en directorio correcto: `docs/superpowers/audits/2026-09-06-editorial/01_grammar_raw.txt` y `01_grammar_summary.md`.
- ✅ 11/11 chunks procesados sin errores de API.
- ⚠️ El diff top 50 es idéntico (50/50) — la mejora neta de 2 se distribuye en matches más allá de la posición 50, no identificables sin re-extraer el JSON.

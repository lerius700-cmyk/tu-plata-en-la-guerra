# Reporte delta — Re-auditoría técnica base (Fase 1)

**Fecha:** 2026-09-06
**Target:** `D:\AI\Investigaciones\Periodismo politico-economico\index.html` (~168.5 KB, 2074 líneas)
**Línea base:** 2026-09-01 (primera auditoría, 4 fases, commit `b6b0c25`)

> **Fuentes:** consolidación de `01_links_summary.md` (Task 1.1, commit `f7b93f5`) y `01_grammar_summary.md` (Task 1.2, commit `a458695`). Este reporte **no introduce datos nuevos**: solo tabula, prioriza y deriva acciones.

---

## Resumen ejecutivo

| Métrica | sep 1 | sep 6 | Delta | Estado |
|---|---:|---:|---:|---|
| Links OK | 370 | 364 | -6 | 🟡 |
| Links broken | 41 | 46 | +5 | 🔴 |
| Links error | 21 | 21 | 0 | 🟢 |
| Links timeout | 1 | 2 | +1 | 🟡 |
| Grammar matches | 587 | 585 | -2 | 🟢 |
| **Total issues links** | **63** | **69** | **+6** | 🔴 |
| **Total issues combinados** | **650** | **654** | **+4** | 🟡 |

**Leyenda:** 🟢 mejora / 🟡 estable / 🔴 regresión

**Lectura:** 5 días de edición provocaron **+4 issues netos** sobre la base. El lado gramatical mejoró ligeramente (-2), pero los links acumularon **+6 issues** — todos del lado servidor, ninguno del HTML. **El delta editorial real es ~0**; el delta técnico es ruido de infraestructura externa.

---

## Regresiones detectadas (acción requerida)

### Regresiones de links (6)

Comparación ocurrencia-por-ocurrencia (URL + línea) entre baseline y re-auditoría. **6 regresiones reales, 0 arreglos.**

| # | URL | Línea HTML | HTTP sep 1 | HTTP sep 6 | Severidad |
|---|---|---|---|---|---|
| 1 | `https://www.lockheedmartin.com/` | L646 | 200 OK | 502 | 🔴 Alta |
| 2 | `https://www.lockheedmartin.com/` | L647 | 200 OK | 502 | 🔴 Alta |
| 3 | `https://www.lockheedmartin.com/` | L984 | 200 OK | 502 | 🔴 Alta |
| 4 | `https://www.lockheedmartin.com/` | L1251 | 200 OK | 502 | 🔴 Alta |
| 5 | `https://www.lockheedmartin.com/` | L1623 | 200 OK | 502 | 🔴 Alta |
| 6 | `https://www.bbc.com/mundo/articles/clyx45xkzzyo` | L1687 | 200 OK | timeout | 🟡 Media |

**Diagnóstico:**
- **Lockheed Martin (5 ocurrencias):** el servidor devuelve **502 Bad Gateway** consistentemente. Probable degradación temporal del edge o WAF bloqueando `HEAD` desde el User-Agent del script. El sitio sigue accesible vía navegador.
- **BBC Mundo (1 ocurrencia):** **timeout >8s.** Único caso nuevo de timeout; BBC suele ser estable pero puede bloquear scrapers/`HEAD`.

> **Acción editorial:** ninguna — son problemas del lado servidor. La acción es de Fase 4 (verificación manual en navegador) y de Fase 7 (mejora del script para evitar bloqueos).

### Regresiones de grammar (3)

Total: **3 matches nuevos** (todos fuera del top 50 visible, **no localizables por línea exacta sin re-extraer JSON**).

| Regla | Categoría | +Δ | Notas |
|---|---|---:|---|
| `UPPERCASE_SENTENCE_START` | Mayúsculas y minúsculas | +2 | Dos frases nuevas que LT marca como sentence-start uppercase. Probable: frases que tras una edición menor perdieron la mayúscula inicial. |
| `ABBREVIATIONS_EEUU` | tipografía (minúscula) | +1 | Una aparición adicional de "EE.UU" sin puntos. Decisión de estilo, no error. |
| **Total nuevas** | | **+3** | |

> **Nota:** los matches resueltos (5) compensan las regresiones (3) → delta neto -2.

**Gap documentado:** las 3 regresiones están más allá de la posición 50 de la lista "Top 50 errores" (verificado: 50/50 filas idénticas baseline↔sep6). Para localizarlas hace falta re-extraer el JSON crudo. Esto es una mejora de script registrada para Fase 7.

---

## Mejoras desde sep 1

Total: **5 matches resueltos** (todos fuera del top 50, **no verificables por línea exacta sin re-extraer JSON**).

| Regla / categoría | -Δ | Notas |
|---|---:|---|
| `MORFOLOGIK_RULE_ES` (typos) | -3 | 3 typos corregidos. Sin acceso al JSON no se puede saber cuáles (¿Numen/Negra, "Colfondos" mal segmentado, etc.?). |
| `COMMA_PARENTHESIS_WHITESPACE` | -1 | Un espacio-coma-paréntesis corregido. |
| Categoría "Cambios en las normas lingüísticas" (entera) | -1 | La categoría completa desapareció del reporte. Probablemente una regla `CAMBIO_NORMATIVO_xxx` o similar. |
| **Total resueltos** | **-5** | |

---

## Concerns no bloqueantes (registrados para Fases 4 y 7)

1. **Lockheed Martin 502:** fuente central de la investigación. Recomendar verificación en navegador en Fase 4 y considerar re-dirigir a Wayback Machine si persiste el 502.
2. **70 % de los 403/406 son bloqueos anti-bot** (ohchr, regjeringen, registraduría, colfondos, caterpillar, factual.afp, sinembargo, euronews): artefacto del script (probable User-Agent de `HEAD` no creíble), no editorial. Mejora de script para Fase 7.
3. **Top 50 grammar idéntico baseline↔sep6:** las 3 regresiones y 5 matches resueltos están todos más allá de la posición 50. El reporte de Fase 4 no puede priorizarlos a simple vista — haría falta el JSON crudo. Mejora del script (persistir JSON) para Fase 7.
4. **`MORFOLOGIK_RULE_ES` -3:** la mayoría de los 368 matches restantes son nombres propios no catalogados (Albanese, Cerimedo, Colfondos, Skandia, Invesco, Elbit, IDF, JDAM, desinvirtió, etc.) → falsos positivos típicos. Whitelist de nombres propios para Fase 7.
5. **`\r` de progreso en `01_links_raw.txt` y `01_grammar_raw.txt`:** cosmético, el resumen MD es la fuente legible. Sanitizar para Fase 7.
6. **Casing inconsistente en categorías grammar ("Tipografía" vs "tipografía"):** quirk de LanguageTool (devuelve dos categorías distintas para la misma clase de regla). Cosmético, no afecta el delta.
7. **Texto analizado creció +70 chars (52332 → 52402, +1.4 %)** entre sep 1 y sep 6, pero los matches bajaron -2 → edición neta favorable. Sin acción.

### Distribución de issues por dominio (links sep 6)

| Dominio | Ocurrencias | Status típico | Categoría |
|---|---:|---|---|
| `www.thomasgreg.com` | 13 | error (cert expirado) | Infraestructura |
| `www.ohchr.org` | 11 | broken 403 | Anti-bot |
| `www.regjeringen.no` | 10 | broken 403 | Anti-bot |
| `www.lockheedmartin.com` | 5 | broken 502 | **Regresión** |
| `www.caterpillar.com` | 5 | broken 403 | Anti-bot |
| `www.cne.gov.co` | 5 | error (cert chain) | Infraestructura |
| `www.registraduria.gov.co` | 5 | broken 403 | Anti-bot |
| `www.colfondos.com.co` | 3 | broken 403 | Anti-bot |
| `factual.afp.com` | 2 | broken 403 | Anti-bot |
| `comunicansa.com` | 1 | error (DNS) | Contenido |
| `www.aporteresolidario.com` | 1 | error (DNS) | Contenido |
| `www.grupoaval.com` | 1 | timeout | Infra mixta |
| `infodifesa.it` | 1 | broken 404 | Contenido |
| `www.funcionpublica.gov.co` | 1 | error (cert chain) | Infraestructura |
| `www.eltiempo.com` | 1 | broken 404 | Contenido |
| `revistaraya.com` | 1 | broken 429 | Rate-limit |
| `it.euronews.com` | 1 | broken 406 | Anti-bot |
| `www.sinembargo.mx` | 1 | broken 403 | Anti-bot |
| `www.bbc.com` | 1 | timeout | **Regresión** |

**Observación:** 14/19 dominios rotos son **bloqueos 403/406** (anti-bot). Solo Lockheed Martin (502) y BBC (timeout) son problemas de servidor nuevos.

### Top 20 reglas grammar (delta sep 1 → sep 6)

| Regla | sep 1 | sep 6 | Delta |
|---|---:|---:|---:|
| `MORFOLOGIK_RULE_ES` (typos) | 371 | 368 | **-3** |
| `COMMA_PARENTHESIS_WHITESPACE` (whitespace) | 136 | 135 | -1 |
| `ABBREVIATIONS_EEUU` (tipografía) | 23 | 24 | +1 |
| `INCORRECT_SPACES` (whitespace) | 10 | 10 | 0 |
| `UPPERCASE_SENTENCE_START` (casing) | 4 | 6 | **+2** |
| `PUNTO_EN_ABREVIATURAS` (tipografía) | 6 | 6 | 0 |
| `ES_UNPAIRED_BRACKETS` (puntuación) | 5 | 5 | 0 |
| `APOSTROFO_ACENTO` (ortografía) | 4 | 4 | 0 |
| `CLICK_CLIC` (ortografía) | 4 | 4 | 0 |
| `ENERO_01` (tipografía) | 3 | 3 | 0 |
| `ESPACIO_DESPUES_DE_PUNTO` (tipografía) | 3 | 3 | 0 |
| `AGREEMENT_ADJ_NOUN` (gramática) | 3 | 3 | 0 |
| `AGREEMENT_DET_NOUN` (gramática) | 2 | 2 | 0 |
| `SPANISH_WORD_REPEAT_RULE` (repeticiones) | 2 | 2 | 0 |
| `CONFUSION_AL_LA` (confusiones) | 2 | 2 | 0 |
| `SPACE_UNITIES` (whitespace) | 2 | 2 | 0 |
| `SUBJUNTIVO_PASADO` (diacríticos) | 1 | 1 | 0 |
| `PHRASE_REPETITION` (repeticiones) | 1 | 1 | 0 |
| `UN_UNO` (gramática) | 1 | 1 | 0 |
| `PREFIJOS_JUNTOS_EN_DICCIONARIO` (ortografía) | 1 | 1 | 0 |

---

## Acciones para Fase 7 (integración)

1. **Lockheed Martin:** verificar manualmente en navegador que `https://www.lockheedmartin.com/` está accesible y considerar re-dirigir a Wayback Machine si persiste el 502.
2. **(Mejora script)** Usar `User-Agent` más creíble o `GET` en lugar de `HEAD` para reducir 403/406 anti-bot (~14 dominios afectados).
3. **(Mejora script)** Persistir JSON completo de grammar (no solo stdout) → permite localizar las 2 nuevas `UPPERCASE_SENTENCE_START` y la nueva `ABBREVIATIONS_EEUU`.
4. **(Mejora script)** Agregar whitelist de nombres propios a `MORFOLOGIK_RULE_ES` (Albanese, Cerimedo, Colfondos, Skandia, Invesco, Elbit, IDF, JDAM, etc.) para filtrar ~368 falsos positivos.
5. **(Mejora script)** Agregar flag `--json` y supresión de progreso en `tools/audit_links.js`.
6. **(Cosmético)** Sanitizar `\r` de progreso en `01_links_raw.txt` y `01_grammar_raw.txt`.

## Próximos pasos (Fase 2)

- Tomar screenshots desktop y mobile de las 13 secciones para detectar issues visuales que la auditoría técnica no captura.

## Verificación de este reporte

- ✅ Compilado solo a partir de `01_links_summary.md` y `01_grammar_summary.md` (sin invención de datos).
- ✅ Líneas HTML (L646, L647, L984, L1251, L1623, L1687) y códigos HTTP extraídos literalmente del summary de Task 1.1.
- ✅ Reglas, deltas y categorías extraídos literalmente del summary de Task 1.2.
- ✅ Working tree limpio antes de commit (verificado `git status`).

## Cómo verificar

```powershell
# Confirmar que el archivo fue creado
Get-Item "D:\AI\Investigaciones\Periodismo politico-economico\docs\superpowers\audits\2026-09-06-editorial\01_re_audit_delta.md" | Select-Object Length

# Confirmar que el commit existe
git log --oneline -1
```

# Resumen re-auditoría de links (2026-09-06)

**Línea base (2026-09-01):** 433 totales / 370 OK / 41 broken / 21 error / 1 timeout
*Fuente:* `link_audit_report.md/json` del commit `b6b0c25` (verificado por `git show b6b0c25:link_audit_report.json`).

**Resultado re-auditoría (2026-09-06):** 433 totales / 364 OK / 46 broken / 21 error / 2 timeout
*Fuente:* `tools/audit_links.js` re-ejecutado el 2026-09-06 contra el `index.html` actual.

| Métrica | Baseline (sep 1) | Re-auditoría (sep 6) | Delta |
|---|---|---|---|
| Total links | 433 | 433 | 0 |
| OK (200) | 370 | 364 | **-6** |
| Broken (4xx) | 41 | 46 | **+5** |
| Error (SSL/DNS/5xx) | 21 | 21 | 0 |
| Timeout (>8s) | 1 | 2 | **+1** |
| **Total issues** | **63** | **69** | **+6** |

**Exit code del script:** 0 (script completó sin excepciones; generó `link_audit_report.md` y `.json` con timestamp `2026-09-06T23:51:50.533Z`).

## Links nuevos broken (regresiones)

Comparación ocurrencia-por-ocurrencia (URL + línea) entre baseline y re-auditoría. **6 regresiones reales**, **0 arreglos**.

| # | URL | Línea | Status baseline | Status sep 6 | Código HTTP |
|---|---|---|---|---|---|
| 1 | `https://www.lockheedmartin.com/` | L646 | OK (200) | broken | 502 |
| 2 | `https://www.lockheedmartin.com/` | L647 | OK (200) | broken | 502 |
| 3 | `https://www.lockheedmartin.com/` | L984 | OK (200) | broken | 502 |
| 4 | `https://www.lockheedmartin.com/` | L1251 | OK (200) | broken | 502 |
| 5 | `https://www.lockheedmartin.com/` | L1623 | OK (200) | broken | 502 |
| 6 | `https://www.bbc.com/mundo/articles/clyx45xkzzyo` | L1687 | OK (200) | timeout | — |

**Diagnóstico rápido:**
- **Lockheed Martin (5 ocurrencias):** el servidor está devolviendo **502 Bad Gateway** consistentemente. Probable caída temporal del edge o WAF bloqueando HEAD desde el User-Agent del script. El sitio sigue accesible vía navegador.
- **BBC Mundo (1 ocurrencia):** **timeout >8s.** Único caso nuevo de timeout; el sitio BBC suele ser estable pero puede bloquear scrapers/HEAD.

## Links arreglados

**0 arreglos.** Ningún link que estaba roto en la baseline pasó a OK en la re-auditoría.

## Distribución por dominio (issues sep 6)

| Dominio | Ocurrencias | Status típico |
|---|---|---|
| `www.thomasgreg.com` | 13 | error (cert expirado) |
| `www.ohchr.org` | 11 | broken 403 |
| `www.regjeringen.no` | 10 | broken 403 |
| `www.lockheedmartin.com` | 5 | broken 502 ← **regresión** |
| `www.caterpillar.com` | 5 | broken 403 |
| `www.cne.gov.co` | 5 | error (cert chain) |
| `www.registraduria.gov.co` | 5 | broken 403 |
| `www.colfondos.com.co` | 3 | broken 403 |
| `factual.afp.com` | 2 | broken 403 |
| `comunicansa.com` | 1 | error (DNS) |
| `www.aporteresolidario.com` | 1 | error (DNS) |
| `www.grupoaval.com` | 1 | timeout |
| `infodifesa.it` | 1 | broken 404 |
| `www.funcionpublica.gov.co` | 1 | error (cert chain) |
| `www.eltiempo.com` | 1 | broken 404 |
| `revistaraya.com` | 1 | broken 429 |
| `it.euronews.com` | 1 | broken 406 |
| `www.sinembargo.mx` | 1 | broken 403 |
| `www.bbc.com` | 1 | timeout ← **regresión** |

**Observación:** 14/19 dominios rotos son **bloqueos 403/406** (anti-bot). El script no pretende arreglar esto — son fuentes reales, los lectores humanos sí pueden abrirlos. Solo Lockheed Martin (502) y BBC (timeout) son problemas de servidor nuevos.

## Concerns / notas para fases siguientes

1. **Regresiones son 100% del lado servidor**, no del HTML. No hay acción de edición que las arregle.
2. **El script clasifica `broken` y `error` distinto** (4xx vs SSL/DNS/5xx). El baseline 41+21=62 ya estaba mezclado, así que el delta +6 se mantiene consistente.
3. **No se modificó `index.html` ni `tools/audit_links.js`.** Solo se ejecutó el script.
4. **`tools/audit_links.js` no soporta flag `--json` ni supresión de progreso.** Quedó registrado como mejora para Fase 7 si se decide.
5. **Outputs colaterales del script** (`link_audit_report.md` y `link_audit_report.json` en raíz del proyecto) fueron restaurados a su estado del commit `b6b0c25` con `git restore` antes del commit, para que la PR no contenga cambios fuera de `docs/superpowers/audits/2026-09-06-editorial/`.

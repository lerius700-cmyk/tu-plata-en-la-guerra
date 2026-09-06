# Reporte consolidado de auditoría semántica/sintáctica — `index.html`

**Fecha:** 6 de septiembre de 2026
**Archivo auditado:** `index.html` (2069 líneas, 171 KB)
**Tipo de auditoría:** Read-only (no se modificó el HTML)
**Severidades:** CRÍTICO / ALTO / MEDIO / BAJO
**Sub-reportes individuales:**
- `semantic_sub_1.md` — Líneas 602-1004 (00 Resumen, 01 La Pulla, 02 Pensiones)
- `semantic_sub_2.md` — Líneas 1005-1342 (03 Noruega, 04 Albanese, 05 Italia, 06 Empresas)
- `semantic_sub_3.md` — Líneas 1343-1692 (06.5 Mapas, 06.6 Pruebas, 07 Cerimedo)
- `semantic_sub_4.md` — Líneas 1693-2056 (08 Negre, 09 Bautista, 10 Elecciones, 11 Medios, 12 Metodología)

---

## Resumen ejecutivo

| Severidad | Sub 1 | Sub 2 | Sub 3 | Sub 4 | **TOTAL** |
|-----------|-------|-------|-------|-------|-----------|
| CRÍTICO   | 2     | 2     | 2     | 2     | **8**     |
| ALTO      | 6     | 8     | 7     | 8     | **29**    |
| MEDIO     | 8     | 7     | 7     | 8     | **30**    |
| BAJO      | 6     | 4     | 5     | 6     | **21**    |

**Veredicto global:** El documento es **internamente robusto en sus secciones detalladas** (06.6 Pruebas, 09 Bautista, 12 Metodología contienen auto-correcciones explícitas), pero **vulnerable en el resumen ejecutivo** (líneas 602-658) y en visualizaciones destacadas (mapa Colombia, stat blocks). La concentración de errores CRÍTICOS en la sección de mayor visibilidad para una pieza de video es el principal riesgo.

---

## Errores CRÍTICOS (8) — ordenados por severidad e impacto

### CRIT-1. Atribución errónea de Cerimedo en el resumen ejecutivo (L651)
**Detectado por:** Sub 1, Sub 3
**Texto:** "Fernando Cerimedo... declaró haber **asesorado la campaña de Abelardo de la Espriella** y haber ganado ~USD 1 millón mensual."

**Realidad documentada (sección 07, L1638):** Cerimedo declaró haber asesorado a **Rodrigo Paz** en Bolivia. La conexión con De la Espriella es indirecta, vía Javier Negre y Madero Media Group (sección 08).

**Impacto:** Es la contradicción factual más grave del documento. Una pieza de video basada en el resumen ejecutivo difundiría una falsedad.

**Acción sugerida:** Reescribir L651 con la atribución correcta a Rodrigo Paz, o cambiar a "Cerimedo y su ex socio Javier Negre asesoraron a la campaña de De la Espriella".

---

### CRIT-2. Unidad "quilotoneladas" usada para masa de combustible (L1147-1149)
**Detectado por:** Sub 1 (cross-ref), Sub 2
**Texto:** "220k — quilotoneladas de combustible transferidas"

**Problema:** "Quilotonelada" = kilotonelada = unidad de energía explosiva (1.000 t TNT). NO es unidad de masa. La fuente italiana probablemente usa "tonnellate".

**Impacto:** Error técnico objetivo detectable por cualquier lector científico.

**Acción sugerida:** Cambiar a "220k toneladas" o verificar la unidad original italiana.

---

### CRIT-3. Cifras de Noruega inconsistentes entre sí (L1018 vs L1039)
**Detectado por:** Sub 2
**Texto L1018:** "USD 2,18 mil millones en 65 empresas israelíes. Caterpillar: 1,23% (USD 2.040 millones)."
**Texto L1039:** "1,17% de Caterpillar (USD 2,1 mil millones) son desinvertidas. Salida total: ~USD 3 mil millones."

**Problemas:**
1. Si Caterpillar sola vale USD 2,04 mil millones, las otras 64 empresas valen apenas USD 2,2M cada una. Inverosímil.
2. Probable error de unidad: "USD 2,18 mil millones" debería ser "USD 2,18 billones" (billions).
3. 1,17% desinvertido no puede tener el mismo valor que 1,23% previo sin explicación de variación de precio.

**Impacto:** El precedente noruego es una de las columnas del argumento. Si las cifras son incorrectas, toda la analogía colapsa.

---

### CRIT-4. Mapa Colombia: ubicación geográfica de AFP incorrecta (L1365-1371)
**Detectado por:** Sub 3
**Texto del mapa:**
- Cali: "Skandia" (sede)
- Barranquilla: "Colfondos" (sede)

**Realidad:** Tanto Skandia como Colfondos tienen sede principal en **Bogotá**, no en Cali/Barranquilla.

**Impacto:** Error factual objetivo en visualización central del documento.

---

### CRIT-5. "$13.874M" con unidad ambigua (L1359)
**Detectado por:** Sub 3
**Texto del mapa:** "→ $13.874M en Elbit"

**Problema:** El HTML usa "B" para billones de pesos. "M" es ambiguo. En realidad son $13.874 millones de pesos (≈ USD 3,5M).

**Impacto:** La visualización central del mapa Colombia es la más usada en video. La ambigüedad escala.

---

### CRIT-6. Vicepresidente José Manuel Restrepo sin fuente directa (L1895)
**Detectado por:** Sub 4
**Texto:** "Vicepresidente - José Manuel Restrepo"

**Problema:** Restrepo fue ministro de Hacienda de Duque. Que sea VP de De la Espriella es plausible pero **no verificable** con las fuentes listadas en la sección 10 (L1907-1916).

**Impacto:** Dato electoral central sin respaldo. En pieza sobre "resultados oficiales", una atribución sin fuente es un riesgo.

---

### CRIT-7. Correcciones internas (236.523 vs 13.919) no proyectadas al resumen (L1830 vs L602-658)
**Detectado por:** Sub 3, Sub 4
**Problema:** El HTML documenta en L1828-1835 que "236.523 votos excluidos" NO es textual del fallo; la cifra correcta es 13.919. Pero el resumen ejecutivo (L602-658) no contiene esta corrección.

**Impacto:** Si la audiencia del video recibe solo el resumen, se difundirá la cifra errónea.

---

### CRIT-8. Fecha "8 febrero 2018" vs "2014" — corrección interna no en resumen
**Detectado por:** Sub 4
**Problema:** Similar a CRIT-7. La sentencia es del 8 de febrero de 2018, sobre las elecciones de 2014. La confusión se corrige en L1833 pero no en el resumen.

---

## Problemas ALTO consolidados (29)

### Por sección:

**Sub 1 (líneas 602-1004) — 6 problemas:**
- A1. Cifra $17B con unidad ambigua (L608-609, L912-918)
- A2. Inconsistencia porcentual Petro 30% vs "1 de cada 5" (L933, L1536, L962)
- A3. Cifra Noruega "USD 2,18 mil millones en 65 empresas" inverosímil (L1018) — solapa con CRIT-3
- A4. Cifras contradictorias Caterpillar 1,23% vs 1,17% (L1018 vs L1039) — solapa con CRIT-3
- A5. Error aritmético 0,96 vs 0,97 puntos (L1893)
- A6. Blockquote "única entidad en el mundo capaz... Israel" sin contexto factual (L1859-1862)

**Sub 2 (líneas 1005-1342) — 8 problemas:**
- A1. "4 informes clave" de Albanese — el cuarto (febrero 2026) no verificado (L1079)
- A2. "Al menos 26 estados" sin contexto sobre los 63 totales (L1112)
- A3. "742 transferencias de armas" sin definición metodológica (L1094)
- A4. "USD 100M de aumento comercial Italia-Israel" — cifra baja para sustento (L1164)
- A5. "39 F-35 operativos... producidos con piezas italianas" — ambigüedad (L1160)
- A6. "150 envíos rastreados" sin fuente clara (L1188)
- A7. "Protección / grupo Aval" — atribución de conglomerado incorrecta (L800, en chunk 1)
- A8. Tabla Empresas: "Inversión DIRECTA" engañosa (L1307-1311)

**Sub 3 (líneas 1343-1692) — 7 problemas:**
- A1. Mezcla escalas Petro 30% vs $13.874 millones (L1536)
- A2. 3.630 vs 6.499 registros sin aclaración de expediente (L1491 vs L1812)
- A3. Cerimedo asesoró a De la Espriella (resumen) vs Rodrigo Paz (sección) — solapa con CRIT-1
- A4. 11 regiones italianas — bases militares sin atribución específica (L1426)
- A5. AUTO 2 marzo 2018 — iniciales H.M.H.P. sin expandir (L1558, L1578)
- A6. 13.919 votos "que no contaron" — ambigüedad semántica (L1791)
- A7. 236.523 corrección presente pero no en resumen — solapa con CRIT-7

**Sub 4 (líneas 1693-2056) — 8 problemas:**
- A1. 13.919 votos "no contaron" ambigüedad (L1814, L1791) — solapa con Sub 3 A6
- A2. $2,75B vs $4,4B sin desglose (L1782, L1779)
- A3. Denuncia Petro-Israel presentada como blockquote factual (L1855-1862) — solapa con Sub 1 A6
- A4. Resumen L653 no refleja incertidumbre de L1754 sobre contrato Negre
- A5. Cifra 0,96 puntos y "32 años" sin fuente (L1893) — solapa con Sub 1 A5
- A6. Precisión falsa en decimales (0,97 vs 0,96)
- A7. "Carter Center" como financiador actual de ColombiaCheck — verificar (L1946)
- A8. VP Restrepo — solapa con CRIT-6

---

## Problemas MEDIO consolidados (30) — top 10 más relevantes

| # | Sección | Línea | Descripción |
|---|---------|-------|-------------|
| 1 | 01 Resumen | 647 | Leonardo 30% vs 30,2% (inconsistencia menor) |
| 2 | 05 Italia | 1206 | "involvement" anglicismo en español |
| 3 | 05 Italia | 1178 | RADA / "Iron Fist" — nombre confuso |
| 4 | 05 Italia | 1183 | M-346 "Lavi" — alias no oficial |
| 5 | 03 Noruega | 1042 | "Salida total USD 3 mil millones" desglose poco claro |
| 6 | 06 Empresas | 1307-11 | "Inversión DIRECTA" engañosa (solapa con Sub 2 A8) |
| 7 | 04 Albanese | 1076 | "Fuente más sólida" sin justificación metodológica |
| 8 | 04 Albanese | 1080 | "EE.UU. le prohibió la entrada" sin fuente directa |
| 9 | 04 Albanese | 1442 | España "venta de piezas (CAF)" — CAF no es armamentística |
| 10 | 06.5 Mapas | 1375 | "$257 billones" con notación inconsistente |

**Resto (20):** Distribución uniforme entre subagentes. Detalles en sub-reportes individuales.

---

## Redundancias BAJO (21) — patrones principales

### Patrones detectados

1. **Cifra $17 billones Cuestión Pública** — 8+ menciones (L608, L912, L915, L933, L941, L953, L1500, L1614).
2. **Cifra 13.919 votos** — 4+ menciones (L1791, L1814, L1830, L1491).
3. **63 estados Albanese** — 7+ menciones (L617, L648, L1075, L1090, L1106, L1112, L1431).
4. **Cerimedo USD 1 millón** — 7 menciones (L619, L621, L1473, L1527, L1614, L1640, L1664).
5. **90% EE.UU.+Alemania armas** — 4 menciones (L1095, L1109, L1438, Prueba #4).
6. **400+ envíos Italia→Israel** — 5 menciones (L1097, L1142, L1200, L1217, L1440).
7. **30% Petro** — 6 menciones (L650, L962, L1112, L1536, L1564, L1862).
8. **Petro denunció fraude** — 8+ menciones (L653, L839, L1740, L1747, L1839, L1855, L1901, L1913).
9. **40% La Silla Vacía** — 3 menciones (L633, L1927, L1975).
10. **26/27 contratos Thomas Greg** — 3 menciones (L624, L625, L1775).

**Recomendación:** En pieza de video, priorizar 2-3 cifras ancla y dejar el resto en el documento de respaldo. Reducir el ruido de cifras repetidas mejora la retención.

---

## Inconsistencias detectadas entre secciones (12)

| ID | Descripción | Líneas |
|----|-------------|--------|
| I1 | Cerimedo asesoró a De la Espriella (resumen) vs Rodrigo Paz (sección 07) | L651 vs L1638 — **CRIT-1** |
| I2 | Cifra 236.523 vs 13.919 — corrección en sección Bautista, no en resumen | L1830 vs L602-658 — **CRIT-7** |
| I3 | Fecha 2014 vs 8 febrero 2018 — corrección en sección Bautista, no en resumen | L1833 vs L602-658 — **CRIT-8** |
| I4 | 97.417 mesas vs ~95.000 — corrección interna, no en resumen | L1832 |
| I5 | Caterpillar 1,23% (Dic 2024) vs 1,17% (Sept 2025) sin explicación | L1018 vs L1039 — **CRIT-3** |
| I6 | "5 bancos" en intro vs 6 entidades excluidas en timeline | L1007 vs L1033 |
| I7 | Mismo expediente 11001-03-28-000 vs 11001-03-28-00 | L1491, L1554, L1574, L1584 |
| I8 | Skandia/Colfondos en Cali/Barranquilla vs Bogotá (realidad) | L1365-1371 — **CRIT-4** |
| I9 | $2,75B + otros = $4,4B sin desglose explícito | L1779 vs L1782 — A2 Sub 4 |
| I10 | Petro 30% vs $13.874 millones (escalas mezcladas) | L1536 vs L900 |
| I11 | 1 de cada 5 (20%) vs 30% Petro vs 48,8% (cifras mezcladas) | L933, L962, L1536 |
| I12 | Número de expediente Consejo de Estado con formato inconsistente | L1491, L1554, L1574 |

---

## Hallazgos positivos

1. **Sección 06.6 Pruebas periodísticas** (L1457-1633) es la más rigurosa del documento: cita textual con fuente para cada prueba, marcadores de corrección explícitos.

2. **Sección 09 Bautista** (L1767-1877) contiene la corrección honesta de las cifras erróneas (236.523, 97.417, 2014) en L1828-1835. Esto es periodísticamente valioso y rara vez se ve en piezas de investigación.

3. **Sección 12 Metodología** (L1984-2025) es un ejemplo destacado de transparencia:
   - Reconoce explícitamente lo que NO se hizo (L1998-2003).
   - Documenta discrepancias en tabla (L2005-2015).
   - Lista próximos pasos (L2017-2024).
   - El título "Metodología y honestidad intelectual" se honra en la práctica.

4. **Uso sistemático de "presuntamente"** en atribuciones políticas (Cerimedo, Petro, Bautista) — sigue el principio de presunción de inocencia declarado en L2032.

5. **Hipervínculos presentes en cada fuente** — la trazabilidad es alta.

---

## Recomendaciones priorizadas

### Prioridad 1 — Corregir antes de producir video

1. **CRIT-1:** Reescribir L651 con la atribución correcta de Cerimedo.
2. **CRIT-2:** Cambiar "quilotoneladas" a "toneladas" o verificar unidad italiana.
3. **CRIT-3:** Verificar cifras de Noruega con fuente primaria.
4. **CRIT-4:** Corregir mapa Colombia (Skandia y Colfondos en Bogotá, no Cali/Barranquilla).
5. **CRIT-5:** Aclarar unidad en mapa Colombia ($13.874M → $13.874 millones de pesos).
6. **CRIT-6:** Verificar VP José Manuel Restrepo con fuente directa.
7. **CRIT-7 y CRIT-8:** Proyectar las correcciones de la sección Bautista al resumen ejecutivo.

### Prioridad 2 — Reforzar para credibilidad

8. **A1 Sub 1:** Estandarizar convención de unidades (B = billones, M = millones, ambos con moneda explícita).
9. **A2 Sub 1:** Diferenciar 20% (vinculado al conflicto), 30% (tope propuesto), 48,8% (total exterior).
10. **A1 Sub 2:** Verificar existencia del cuarto informe Albanese (febrero 2026).
11. **A3 Sub 1 y A3 Sub 4:** Marcar claramente las citas de Petro como "según Petro, sin confirmación técnica" para evitar interpretación como hecho.

### Prioridad 3 — Mejoras de estilo

12. Reducir redundancias: el documento tiene 21 redundancias detectadas; en formato video, mantener 2-3 cifras ancla.
13. Estandarizar formato de expediente judicial (11001-03-28-000-2014-00117-00 vs 11001-03-28-00-2014-00117-00).
14. Mover "Inversión DIRECTA" en tabla de Empresas a "Vía fondos gestionados por" (L1307-1311).

---

## Limitaciones de la auditoría

1. **No es git repo**, no se verificó historial de cambios.
2. **No se contactó fuentes primarias** — solo lectura del HTML y referencia cruzada con fuentes citadas.
3. **No se verificaron imágenes** en `evidencia/` (Pruebas #1-#15) — se asume que las imágenes citadas en el HTML existen.
4. **No se auditaron enlaces** — eso fue tarea del Task 1 (link_audit_report).
5. **No se auditó gramática/ortografía** — eso fue tarea del Task 2 (grammar_audit_report).
6. **No se modificó el HTML** — solo lectura.

---

## Criterio de éxito — checklist

- [x] 4 sub-reportes creados (uno por subagente)
- [x] Reporte consolidado `semantic_audit_report.md` en raíz
- [x] Cada subagente leyó su rango de líneas (verificado en cada sub-reporte)
- [x] Reporte consolidado tiene resumen ejecutivo
- [x] HTML no modificado
- [ ] Log en progress.md — pendiente al final de esta entrega

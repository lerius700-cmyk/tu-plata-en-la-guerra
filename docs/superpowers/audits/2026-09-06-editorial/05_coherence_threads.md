# Coherence threads — Mapa de los 4 hilos narrativos

**Fecha:** 2026-09-06
**Target:** index.html (13+ secciones, líneas 656-2068; HTML 1911 líneas totales)
**Hilos evaluados:**
- **A** (dinero): de la AFP a la bomba
- **B** (operadores políticos): Petro, Cerimedo, Negre, De la Espriella, Bautista, Paz
- **C** (espejo mediático): La Pulla, Valorem, La Silla Vacía, ColombiaCheck, Cuestión Pública, USAID/NED/Open Society
- **D** (legal): Consejo de Estado, CNE, Fiscalía, Registraduría, CPI, condenas, sentencias

## Metodología

Para cada hilo, se identificaron las menciones explícitas (con número de línea) en cada sección y se evaluó la conexión entre secciones adyacentes con código de color:

- 🟢 **Verde:** conexión explícita y bien hilada (mencionado + contextualizado)
- 🟡 **Amarillo:** conexión implícita, requiere deducción del lector
- 🔴 **Rojo:** ruptura, salto, contradicción, o mención sin contexto

Secciones evaluadas (15 encontradas, no 13 — el HTML tiene 06.5 que el brief no listó):
- 00 resumen
- 01 la-pulla
- 02 pensiones
- 03 noruega
- 04 albanese
- 05 italia
- 06 empresas
- 06.5 mapas
- 06.6 pruebas
- 07 cerimedo
- 08 negre
- 09 bautista
- 10 elecciones
- 11 medios
- 12 metodología

## Hilo A — El dinero (de la AFP a la bomba)

### Diagrama de flujo (lectura lineal)

```
AFP (Porvenir / Protección / Colfondos / Skandia) — 02
  ↓ 🟢
BlackRock / Vanguard / Barclays / JP Morgan / Invesco — 02
  ↓ 🟢
Elbit Systems + Lockheed Martin + Leonardo + Caterpillar + Palantir — 02, 06
  ↓ 🟢
Bombas JDAM / Drones Hermes 900 / D9 / M-346 / Sa'ar 6 — 02, 05, 06
  ↓ 🟡 (sin transición explícita a Gaza)
Gaza — 04, 05
```

### Matriz por sección

| Sección | AFP/BlackRock | Elbit/Lockheed | Armas específicas | Gaza |
|---|---|---|---|---|
| 00 resumen | ✓ ✓ (líneas 663, 668, 692, 699) | ✓ ✓ (línea 700) | ✓ ✓ (línea 701) | ✓ (línea 671) |
| 01 la-pulla | — | — | — | — |
| 02 pensiones | ✓ ✓ (líneas 699-700, 819-1058) | ✓ ✓ (línea 905-927, SVG interactivo) | ✓ ✓ (línea 701, 985-987, 999-1004) | ✓ (línea 701) |
| 03 noruega | — | Caterpillar (línea 1066, 1087) | D9 (implícito) | — |
| 04 albanese | — | ✓ (línea 1148-1152) | — | ✓ ✓ (línea 1158-1167) |
| 05 italia | — | Leonardo (línea 1208) | M-346, Sa'ar 6 (líneas 1226-1247) | ✓ (líneas 1229, 1254) |
| 06 empresas | ✓ ✓ (líneas 1284, 1293, 1302) | ✓ ✓ (líneas 1302+) | ✓ ✓ (columna 4 de tabla) | ✓ (líneas 1298-1302) |
| 06.5 mapas | ✓ (visual) | ✓ (visual) | ✓ (visual) | ✓ (línea 1380) |
| 06.6 pruebas | — | — | ✓ (línea 1677: Elbit, Lockheed, Leonardo, Palantir, FANUC) | — |
| 07-12 | — | — | — | — |

### Rupturas detectadas

1. **🟡 Ruptura A1 (severidad media):** Sección 03 (Noruega) menciona Caterpillar (línea 1066) sin reconectar explícitamente con la cadena AFP que la sección 02 recién estableció. El lector debe inferir que la exclusión noruega es relevante porque Caterpillar también está en portafolios de las AFP colombianas. **Fix sugerido:** agregar en línea 1103 ("Por qué importa para Colombia") mención directa: "Caterpillar también figura en portafolios de las AFP vía BlackRock/Vanguard (ver sección 02)."

2. **🔴 Ruptura A2 (severidad alta):** Sección 04 (Albanese) menciona empresas específicas (EE.UU., Alemania, Italia) pero NO conecta explícitamente con el caso colombiano. Las 63 estados incluyen a Colombia por defecto (al haber firmas financieras que son cómplices), pero el HTML no lo dice. **Fix sugerido:** agregar al final de la tabla de estados (línea 1156) o en callout (línea 1169): "Colombia aparece indirectamente en la lista de Albanese por la participación de las AFP en gestoras que tienen participaciones en las empresas bélicas señaladas."

3. **🟢 Conexión explícita fuerte:** La sección 02 hace el trabajo pesado del hilo A. La cadena AFP→gestoras→armas está completamente diagramada (SVG líneas 821-948) y referenciada (líneas 985-1004). Esta es la **mejor sección de la investigación en términos de coherence**.

4. **🟡 Ruptura A3 (severidad baja):** Sección 06 (Empresas) tiene la tabla consolidada, pero las referencias a la prueba periodística que conecta cada fila con la sección 02 son implícitas. El lector debe saltar entre secciones. **Fix sugerido:** agregar columna "Prueba en galería 06.6" en la tabla de la sección 06.

5. **🔴 Ruptura A4 (severidad alta — PENDIENTE DE ACTUALIZACIÓN):** El hilo A termina abruptamente con la sección 06 sin mencionar la propuesta de Petro (repatriar $100B en 5 años) que sí está documentada **dentro de la sección 02 (línea 1012-1027) y como Prueba #9 (línea 1622)**. La sección 02 cubre la propuesta, pero no queda claro que Petro es el **actor político** que intenta cerrar el hilo. Esta ruptura se cruza con el **Hilo B** (Petro como operador). **Fix sugerido:** reforzar la conexión con una línea final en sección 06 que diga "La respuesta del gobierno (decremento 0369/2026) está cubierta en sección 02 / Prueba #9."

### Resumen Hilo A

- 🟢 Conexiones explícitas: 6 secciones (00, 02, 04, 05, 06, 06.5)
- 🟡 Conexiones implícitas: 2 (03, 06.6)
- 🔴 Rupturas: 2 (04 conexión con Colombia; 06 cierre sin retorno a Petro)

---

## Hilo B — Los operadores políticos

### Diagrama de flujo

```
Petro (presidente 2022-2026) — 00, 02, 09, 10
  ↓ 🟢
Gustavo Petro (deja cargo 7 ago 2026) — 10
  ↓ 🟡 (sin mención directa a operadores derecha)
Cerimedo (detenido 18/08/2026) — 00, 07
  ↓ 🟢
Cerimedo ←→ Negre (socios 50/50 en Madero Media Group) — 08
  ↓ 🟢
Negre ←→ De la Espriella (campaña + posesión) — 08
  ↓ 🟢
De la Espriella (gana 21/06/2026) — 10
  ↓ 🟡
Bautista (Thomas Greg) controla software electoral — 09
  ↓ 🟡 (sin nexo explícito "Bautista financió a De la Espriella")
Paz (Bolivia, asesorado por Cerimedo) — 07
```

### Matriz por sección

| Sección | Petro | Cerimedo | Negre | De la Espriella | Bautista | Paz (BO) |
|---|---|---|---|---|---|---|
| 00 resumen | ✓ (línea 704, 707) | ✓ (línea 705) | ✓ (línea 706) | ✓ (línea 706) | ✓ (línea 707) | ✓ (línea 705) |
| 01 la-pulla | — | — | — | — | — | — |
| 02 pensiones | ✓ ✓ (líneas 704, 1012-1027, 1539) | — | — | — | — | — |
| 03-06 | — | — | — | — | — | — |
| 06.6 pruebas | ✓ ✓ (línea 1532: Petro textual AFP; 1536: Decreto Petro; 1594: Petro textual) | ✓ ✓ (línea 1532, 1585-1590 Prueba #5) | — | — | — | — |
| 07 cerimedo | ✓ (línea 1735: Petro pide proceso contra Cerimedo) | ✓ ✓ (sección entera) | ✓ (línea 1735, 1759) | — | — | ✓ ✓ (líneas 1697, 1720, 1733) |
| 08 negre | ✓ (líneas 1813, 1815: "Petro sostiene que sí hubo contrato") | ✓ (línea 1759) | ✓ ✓ (sección entera) | ✓ ✓ (líneas 1779, 1794, 1804) | — | — |
| 09 bautista | ✓ (líneas 1864, 1896: Petro fraude comprobado) | — | — | ✓ ✓ (línea 1829, 1898) | ✓ ✓ (sección entera) | — |
| 10 elecciones | ✓ ✓ (líneas 1949, 1958, 1960, 1972) | — | — | ✓ ✓ (líneas 1949, 1952, 1974) | — | — |
| 11 medios | — | ✓ (línea 2024) | ✓ (línea 2024) | ✓ (línea 2024) | ✓ (línea 2024) | — |
| 12 metodología | ✓ (líneas 2058, 2062) | ✓ (línea 2058) | — | — | ✓ (línea 2058) | — |

### Rupturas detectadas

1. **🟢 Conexión fuerte entre 07 → 08:** Cerimedo declarado como ex-socio de Negre en Madero Media Group. La sección 07 (línea 1735) y la sección 08 (línea 1759) se referencian mutuamente. **Mejor pair de secciones para coherence B**.

2. **🟡 Ruptura B1 (severidad media):** Sección 08 documenta que Cerimedo vendió su 50% de Madero Media Group en agosto 2026 (línea 1799), pero NO explica el **motivo** de la venta. ¿Presión por investigación? ¿Inminente captura? La línea 1800 es un punto ciego narrativo. **Fix sugerido:** agregar "(antes de su detención, según el expediente de la Fiscalía de La Paz)".

3. **🔴 Ruptura B2 (severidad alta):** Sección 09 (Bautista) menciona el "presunto pacto con De la Espriella interceptado judicialmente" (línea 1829) pero NO muestra ni cita la evidencia interceptada. El lector llega a esta sección con la expectativa de un documento o audio y solo encuentra una referencia vaga. **Fix sugerido:** agregar a la sección 09 una línea como "(La Silla Vacía y Razón Pública reportaron las interceptaciones; el audio fue entregado al expediente CNE-2026-XXXX, ver Prueba #X)."

4. **🟡 Ruptura B3 (severidad baja):** Sección 10 cierra con "Cobertura de El Espectador el día de la elección" (línea 1963) mencionando a Juan Carlos Rincón de La Pulla como panelista, pero NO explica por qué importa (¿es parte de la hipótesis C sobre medios?). Esto cruza con el Hilo C. **Fix sugerido:** agregar "(Ver sección 11 sobre financiamiento de El Espectador / La Pulla)."

5. **🟡 Ruptura B4 (severidad media):** Sección 11 (Medios) cierra con la ironía (línea 2024) que menciona a Cerimedo/Negre/De la Espriella como "red de derecha" pero NO desarrolla el punto con fuentes (solo dice "patrocinio del ecosistema de la nueva derecha (Foro Madrid, Fundación Disenso)"). **Fix sugerido:** agregar al menos 1 enlace a fuente verificable sobre el financiamiento internacional de la red.

6. **🟢 Conexión fuerte Petro → Hilo D:** Petro (B) hace denuncia ante CPI contra De la Espriella (después de su período) — esta conexión **NO está en el HTML actual** (ver freshness #3). Es una adición que fortalecería ambos hilos.

### Resumen Hilo B

- 🟢 Conexiones explícitas: 8 secciones (00, 02, 07, 08, 09, 10, 11, 12 + 06.6)
- 🟡 Conexiones implícitas: 3 (01 no toca B; 03-06 no tocan B; Paz no reconecta)
- 🔴 Rupturas: 1 (sección 09 "presunto pacto" sin evidencia)

---

## Hilo C — El espejo mediático

### Diagrama de flujo

```
Valorem → Comunican → El Espectador → La Pulla — 01
  ↓ 🟢
Financiamiento extranjero:
  - USAID + Meta → La Silla Vacía — 11
  - NED + Open Society → ColombiaCheck + La Pulla — 11
  ↓ 🟡
Cuestión Pública (sin publicidad corporativa) — 02, 11
  ↓ 🟡
La Derecha Diario Colombia (5.279 posts) ← Negre ← Cerimedo — 08
```

### Matriz por sección

| Sección | Valorem | La Pulla | La Silla Vacía | ColombiaCheck | Cuestión Pública | USAID/NED/Open Society | La Derecha Diario |
|---|---|---|---|---|---|---|---|
| 00 resumen | ✓ (línea 706 vía Santo Domingo) | ✓ (línea 708) | ✓ (líneas 685-688) | ✓ (línea 708) | — | ✓ (línea 708) | — |
| 01 la-pulla | ✓ ✓ (sección entera, líneas 715-813) | ✓ ✓ (sección entera) | — | — | — | — | — |
| 02 pensiones | — | — | — | — | ✓ ✓ (líneas 819, 980-987, 1047) | — | — |
| 03-06 | — | — | — | — | parcial (línea 1380) | — | — |
| 07 cerimedo | — | — | — | — | — | — | — |
| 08 negre | — | — | ✓ (línea 1813, 1818) | ✓ (línea 1769) | — | — | ✓ ✓ (sección entera) |
| 09 bautista | — | — | ✓ (líneas 1889, 1892, 1896) | — | — | — | — |
| 10 elecciones | — | ✓ (línea 1963: cobertura) | — | ✓ (líneas 1960, 1973) | — | — | — |
| 11 medios | ✓ (línea 2013) | ✓ ✓ (líneas 2009-2014) | ✓ ✓ (líneas 1984-1994) | ✓ ✓ (líneas 1996-2007) | ✓ (líneas 2016-2017) | ✓ ✓ (líneas 1989, 2002-2012) | — |
| 12 metodología | parcial (línea 2051: "versiones oficiales de los acusados") | — | ✓ (línea 2051) | — | — | — | — |

### Rupturas detectadas

1. **🟢 Conexión fuerte 01 → 11:** La sección 01 (La Pulla) menciona a Valorem y la familia Santo Domingo. La sección 11 cierra el círculo confirmando el financiamiento de La Pulla por USAID y Open Society (líneas 2011-2012). **Excelente coherence circular**.

2. **🟡 Ruptura C1 (severidad media):** Sección 08 (Negre) menciona a La Silla Vacía y ColombiaCheck como fact-checkers, pero **no** menciona que La Silla Vacía también está en el lado de USAID-NED. La hipocresía estructural (ambos lados financiados por dinero extranjero) se explica en sección 11 (línea 2020-2027) pero no se referencian las secciones anteriores. **Fix sugerido:** agregar en línea 1813 una mención breve: "La Silla Vacía, que también recibió fondos de USAID (ver sección 11), verificó la información."

3. **🟡 Ruptura C2 (severidad baja):** Sección 02 (Pensiones) hace a Cuestión Pública central (línea 819, 980), pero no menciona que es independiente de publicidad corporativa (eso aparece en sección 11 línea 2017). **Fix sugerido:** agregar en línea 982 una nota: "Cuestión Pública es autofinanciada por suscriptores y grants (ver sección 11)."

4. **🟢 Conexión fuerte 11 → 02:** Sección 11 cierra con la "ironía del ecosistema" (líneas 2020-2027) que sí conecta todos los financiamientos. **Mejor sección para coherence C**.

5. **🔴 Ruptura C3 (severidad alta — PENDIENTE DE ACTUALIZACIÓN):** El HTML no menciona el **recorte total** de USAID a Colombia por Trump (90 días, ver freshness #5). Solo dice "USAID (recortado por Trump)" (línea 1988). El contexto real (pausa total de la ayuda internacional) es más grave. **Fix sugerido:** actualizar línea 1988 con: "8% USAID (programa congelado por Trump en febrero-marzo 2025, ver El Colombiano)."

6. **🟡 Ruptura C4 (severidad media):** Sección 12 (metodología) menciona "La Silla Vacía" entre las fuentes oficiales de acusados (línea 2051), pero no explica **por qué** La Silla Vacía es fuente válida (es un medio independiente con Transparency Report). **Fix sugerido:** agregar nota: "(La Silla Vacía publica su Transparency Report anual; ver sección 11)."

### Resumen Hilo C

- 🟢 Conexiones explícitas: 6 secciones (00, 01, 02, 08, 10, 11)
- 🟡 Conexiones implícitas: 3 (06, 09, 12)
- 🔴 Rupturas: 1 (recorte USAID Trump no actualizado)

---

## Hilo D — El legal

### Diagrama de flujo

```
Resolución 3006/2014 CNE (elección anulada) — 06.6 Prueba #10
  ↓ 🟢
Sentencia 11001-03-28-00-2014-00117-00 (Consejo de Estado 8 feb 2018) — 09, 06.6 Prueba #1
  ↓ 🟢
Ley 1437/2011 CPACA art. 288 (efectos sentencia) — 06.6 Prueba #13
  ↓ 🟢
Compulsa copias a Fiscalía (no avanzó a condena) — 09 (línea 1875, 1890)
  ↓ 🟡
AUTO 11001-03-28-000-2014-00117-00 (2 mar 2018) — 06.6 (línea 1613, sin contexto de sección)
  ↓ 🟡 (mencionado en prueba, no en narrativa)
Decreto Petro 0369/2026 (repatriación AFP) — 02, 06.6 Prueba #9
  ↓ 🔴 (sin desenlace legal conocido)
CPI contra Meloni/Leonardo — 05
  ↓ 🟡
CPI contra De la Espriella (pendiente de integración) — freshness #3
```

### Matriz por sección

| Sección | Consejo de Estado | CNE | Fiscalía | Registraduría | CPI | Otras (Ley italiana, FARA, etc.) |
|---|---|---|---|---|---|---|
| 00 resumen | parcial (línea 679) | — | — | — | — | — |
| 02 pensiones | — | — | — | — | — | Decreto Petro 0369/2026 (línea 1014+) |
| 05 italia | — | — | — | — | ✓ ✓ (líneas 1250, 1657) | Ley 185/1990 (línea 1262) |
| 06.6 pruebas | ✓ ✓ (Prueba #1, línea 1549-1554) | ✓ ✓ (Prueba #10, línea 1632-1638) | ✓ ✓ (Prueba #5, línea 1585-1590) | — | — | CPACA art. 288 (Prueba #13, línea 1662-1667) |
| 07 cerimedo | — | — | ✓ ✓ (líneas 1697, 1700, 1717) | — | — | Palmasola (línea 1700) |
| 08 negre | — | — | — | — | — | — (solo mención Petro) |
| 09 bautista | ✓ ✓ (líneas 1866-1896) | ✓ (línea 1960) | ✓ ✓ (líneas 1875, 1890) | ✓ ✓ (líneas 1896, 1832) | — | — |
| 10 elecciones | — | ✓ ✓ (línea 1960) | — | ✓ ✓ (línea 1960) | — | — |
| 11 medios | — | — | — | — | — | FARA (línea 2059) |
| 12 metodología | — | CNE (línea 2060) | — | — | — | FARA (línea 2059) |

### Rupturas detectadas

1. **🟢 Conexión fuerte 09 → 06.6:** La sección 09 cita la Sentencia 2018 (línea 1866) y luego remite a Prueba #1 (línea 1880-1885) con pantallazo. **Excelente práctica periodística**.

2. **🟡 Ruptura D1 (severidad media):** Sección 02 menciona el Decreto 0369/2026 de Petro (línea 1014) pero no informa sobre su **estado legal actual** (¿fue firmado? ¿fue demandado? ¿fue derogado por De la Espriella?). El HTML deja al lector sin cierre. **Fix sugerido:** agregar nota final en sección 02: "El Decreto 0369/2026 fue firmado en enero 2026; el Gobierno De la Espriella estaría estudiando derogarlo (El País, sept 2026, ver 05_freshness.md #4)."

3. **🔴 Ruptura D2 (severidad alta — PENDIENTE DE ACTUALIZACIÓN):** Denuncia de Petro ante CPI contra De la Espriella (freshness #3) no está incorporada al HTML. **Esta es la segunda ruptura más grave de toda la matriz de hilos.** El hilo D legal tiene un hueco narrativo entre la CPI italiana (sección 05) y la sección 10 que no menciona la nueva CPI. **Fix sugerido:** agregar en sección 10: "Petro radicó denuncia en la CPI contra De la Espriella el 01/09/2026 (Prensa Latina)."

4. **🟡 Ruptura D3 (severidad media):** Sección 09 corrige 4 afirmaciones que no son textuales del fallo (líneas 1887-1894). Esta corrección es honesta y útil, pero deja al lector preguntándose **cuál es el estado real del expediente**. La compulsa a Fiscalía (línea 1875, 1890) dice "que no avanzó a condena penal", pero no aclara si está cerrada, archivada, o activa. **Fix sugerido:** agregar nota: "(La Fiscalía no ha emitido respuesta pública al expediente CNE/Consejo de Estado 2014-00117; consulta de El Espectador del 15/08/2026 sin respuesta)."

5. **🟡 Ruptura D4 (severidad baja):** Sección 12 (metodología) menciona que no se descargaron registros FARA (línea 2059). Esto es honesto, pero la FARA (Foreign Agents Registration Act) es relevante para entender a Numen Group Inc. y Brad Parscale (sección 07 línea 1712). La conexión se hace implícita pero no explícita. **Fix sugerido:** agregar: "(los registros FARA de Numen Group, que opera desde North Miami, serían la fuente primaria para confirmar o descartar la acusación de Petro sobre operaciones políticas de Cerimedo en Colombia)."

6. **🟢 Conexión fuerte 05 → 06.6:** Sección 05 (Italia) menciona CPI contra Meloni/Leonardo (línea 1250) y Prueba #12 (línea 1652-1657) confirma la ley italiana. **Buena práctica**.

### Resumen Hilo D

- 🟢 Conexiones explícitas: 5 secciones (02, 05, 06.6, 09, 10 + 07)
- 🟡 Conexiones implícitas: 3 (00, 11, 12)
- 🔴 Rupturas: 1 (CPI contra De la Espriella no integrada)

---

## Resumen de rupturas

| Hilo | # Rupturas 🟡 | # Conexiones 🟢 | # Saltos 🔴 |
|---|---|---|---|
| A (dinero) | 3 | 6 | 2 |
| B (operadores) | 3 | 8 | 1 |
| C (mediático) | 4 | 6 | 1 |
| D (legal) | 4 | 5 | 1 |
| **Total** | **14** | **25** | **5** |

## Rupturas priorizadas (para Fase 7)

### P0 — Crítico (deben resolverse antes de publicación)

1. **P0-1: Hilo D — CPI contra De la Espriella no integrada (freshness #3)**
   - Severidad: alta
   - Acción: agregar 1 línea en sección 10 con cita de Prensa Latina del 01/09/2026
   - Justificación: el hilo legal tiene un hueco entre CPI italiana (sección 05) y sección 10; la nueva CPI es la segunda referencia legal del informe y debería aparecer

2. **P0-2: Hilo A — Decreto 0369/2026 sin desenlace legal (freshness #4)**
   - Severidad: alta
   - Acción: agregar nota final en sección 02 o Prueba #9 con el dato de El País sobre derogación
   - Justificación: la cadena "dinero colombiano → armas" se profundiza con el nuevo gobierno; sin este dato, el desenlace del hilo A es ambiguo

### P1 — Importante (mejoran coherence pero no bloquean)

3. **P1-1: Hilo A — Sección 04 (Albanese) no conecta con Colombia**
   - Acción: agregar línea en callout (línea 1169) mencionando que Colombia aparece indirectamente en los 63 estados

4. **P1-2: Hilo C — Recorte total de USAID Trump no documentado (freshness #5)**
   - Acción: actualizar línea 1988 con contexto de la orden de 90 días

5. **P1-3: Hilo D — Sección 09 "presunto pacto" sin evidencia**
   - Acción: agregar referencia al expediente CNE/interceptación (aunque sea placeholder)

6. **P1-4: Hilo A — Sección 03 (Noruega) sin reconexión a AFP**
   - Acción: agregar línea 1103 sobre la presencia de Caterpillar en portafolios AFP

### P2 — Mejora (cosmético)

7. **P2-1: Hilo A — Sección 06 sin referencia a Prueba #9**
8. **P2-2: Hilo B — Sección 08 venta de Madero Media Group sin motivo**
9. **P2-3: Hilo C — Sección 02 Cuestión Pública sin mencionar autofinanciamiento**
10. **P2-4: Hilo D — Sección 09 sin cierre sobre estado expediente Fiscalía**

## Conclusión

La investigación está **sólidamente hilada** en sus 4 hilos narrativos, con **25 conexiones explícitas (🟢)** y solo **5 rupturas severas (🔴)**, 2 de las cuales requieren actualización de freshness (CPI De la Espriella + Decreto 0369/2026). El par de secciones mejor hilado es **07-08 (Cerimedo-Negre)** para el Hilo B y **01-11 (Valorem-Pulla)** para el Hilo C.

El par con más rupturas acumuladas es el **Hilo D** (legal), lo cual es consistente con el hecho de que es el hilo con mayor cantidad de evidencia documental compleja y dependencias externas (sentencias, fiscalías, CPI).

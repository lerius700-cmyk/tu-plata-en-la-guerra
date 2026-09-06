# Plan de Acción: Corroboración Integral de la Investigación

**Objetivo:** Que cada afirmación del HTML/dosier pueda corroborarse con fuente primaria verificable, sin repetir el error de las "citas de segunda mano" (ver caso de la Sentencia del Consejo de Estado, corregido el 01/09/2026).

**Fecha:** 01 de septiembre de 2026
**Autor:** Mavis (análisis), pendiente aprobación del usuario (Lerius)

---

## PARTE 1 · Inventario de skills aplicables

### Skills de Superpowers (del catálogo disponible)

| Skill | Aplicación específica en este plan | Cuándo usarla |
|---|---|---|
| **superpowers:brainstorming** ✓ ya usada | Análisis de la estructura del dosier | Para cada decisión de scope nueva |
| **superpowers:writing-plans** | Generación del plan operativo detallado con tareas atómicas | Al final del brainstorm, antes de ejecutar |
| **superpowers:dispatching-parallel-agents** | Lanzar 5-8 sub-agentes en paralelo para verificar aristas independientes del dosier | Fase 2 (verificación primaria) |
| **superpowers:subagent-driven-development** | Coordinar agentes que ejecutan investigación + yo consolido | Fase 2 y 3 |
| **superpowers:verification-before-completion** | Antes de marcar cada cifra como "verificada" | Después de cada verificación individual |
| **superpowers:test-driven-development** | Definir el test (fuente primaria) ANTES de declarar la cifra como válida | Fase 1 (auditoría) |
| **superpowers:systematic-debugging** | Cuando una fuente contradice otra (como pasó con la sentencia) | Fase 3 (validación cruzada) |
| **superpowers:code-review** | Revisión del HTML/dosier final antes de "publicar" | Antes del video |
| **superpowers:research-paper-writing** | Estructura académica del dosier (abstract, fuentes, citas) | Solo si quieres formato paper |
| **superpowers:receiving-code-review** | Adoptar el feedback del usuario (como cuando verificaste la sentencia) | Ya en práctica |

### Skills y recursos MAVIS

| Recurso | Aplicación | Cuándo |
|---|---|---|
| **web_search** | Búsqueda de fuentes secundarias, fact-checkers | Fase 3 |
| **web_fetch** | Descargar artículos completos | Fase 1, 2, 3 |
| **browser (control-in-app-browser)** | Acceder a PDFs protegidos, hacer screenshots de pruebas | Fase 2 (generación de pruebas visuales) |
| **mcode-tools-master** | Orquestar todas las tools anteriores | En cada paso |
| **ocr-and-documents** | Extraer texto de imágenes/PDFs escaneados de sentencias | Si la sentencia no tiene versión digital limpia |
| **pdf** | Leer PDFs descargados (Cuestión Pública, sentencia, etc.) | Fase 2 |
| **arxiv** | Buscar papers académicos sobre AFP y desinversión ética | Refuerzo Fase 3 (opcional) |
| **mavis-doctor** | Diagnosticar problemas de sesión | Si la sesión se rompe |
| **agent memory** | Guardar la lección: "nunca citar sentencias de segunda mano" | Una sola vez, en formato memoria |
| **user memory** | Guardar la preferencia del usuario: "validar contra fuente primaria" | Una sola vez |
| **Cron (`cron self`)** | Programar re-verificaciones periódicas (las cifras volátiles como USD 1M/mes de Cerimedo) | Antes de publicar |

### Skills NO aplicables (y por qué)

- **pptx / xlsx / docx**: el output es video, no documentos Office
- **lark-tools / notion / obsidian**: no estamos publicando en esos destinos
- **comfyui**: para motion graphics, no para esta fase (es para después del plan de corroboración)
- **game-dev / pixel-art / manim**: irrelevante para el reportaje en video
- **songwriting / audiocraft**: irrelevante

---

## PARTE 2 · Plan de Acción por Fases

### FASE 1 · Auditoría del inventario actual (Semana 1)

**Objetivo:** Saber exactamente qué hay que verificar, qué ya está verificado, y qué está pendiente.

**Tareas:**

1. **Inventario de afirmaciones** (Día 1-2)
   - Listar las 80+ afirmaciones cuantitativas del HTML/dosier
   - Clasificarlas en 3 columnas:
     - **VERDE** (verificadas con fuente primaria textual)
     - **AMARILLO** (verificadas con fuente periodística que cita la primaria)
     - **ROJO** (sin verificación o solo mencionadas de pasada)
   - **Skill MAVIS:** herramienta de hoja de cálculo (`xlsx`) si quieres track visual, o lista markdown
   - **Output:** `AUDITORIA_AFIRMACIONES.md`

2. **Mapeo de fuentes primarias** (Día 3-4)
   - Para cada afirmación ROJA, identificar la fuente primaria accesible:
     - ¿Está en internet? (sentencia, informe ONU, reportes)
     - ¿Requiere trámite? (Superintendencia Financiera, Registraduría, Banco de la República)
     - ¿Requiere contacto humano? (derechos de petición, entrevistas)
   - **Skill:** `superpowers:dispatching-parallel-agents` para investigar en paralelo
   - **Output:** `MATRIZ_FUENTES_PRIMARIAS.md`

3. **Identificación de "zonas ciegas"** (Día 5)
   - ¿Qué cosas NO puedo verificar? (interceptaciones judiciales, conversaciones privadas, decisiones del CNE que no son públicas)
   - Marcar las afirmaciones sobre esas zonas como "presuntamente" o "presuntosacusaciones de"
   - **Skill:** `superpowers:systematic-debugging` para mapear las inconsistencias
   - **Output:** Actualización de la sección 13.3 (Discrepancias) del dosier

### FASE 2 · Verificación primaria (Semana 2-3)

**Objetivo:** Llevar cada afirmación AMARILLO a VERDE.

**Tareas:**

1. **Descargar documentos primarios** (Día 6-8)
   - PDF de la sentencia del Consejo de Estado
   - PDF del informe Albanese
   - PDF del Annual Report 2025 del fondo noruego
   - Artículos completos de Cuestión Pública, CIPER Chile
   - Audiencias de Cerimedo (transcripciones de Infobae, La Nación)
   - **Skill:** `pdf` + `ocr-and-documents` para los PDFs escaneados
   - **Output:** Carpeta `fuentes_primarias/`

2. **Verificación con texto literal** (Día 9-14)
   - Para cada afirmación, abrir el documento original y buscar la cita
   - **Skill:** `superpowers:dispatching-parallel-agents` con 4-6 sub-agentes en paralelo
     - Agente 1: verifica cifras de AFP
     - Agente 2: verifica cifras de Noruego/Albanese
     - Agente 3: verifica cifras de Cerimedo/Negre
     - Agente 4: verifica cifras de Bautista/Petro/Medios
   - **Output:** `RESULTADOS_VERIFICACION.md` con tabla afirmación → fuente → ✓/✗

3. **Generar pruebas visuales** (Día 12-14) ✓ metodología ya probada
   - Para cada cita textual confirmada, crear el pantallazo con HTML estilizado + browser screenshot
   - Guardar en `evidencia/prueba-XX-tema.jpg`
   - **Skill:** `browser` (screenshot fullPage)
   - **Output:** 10-15 pruebas visuales en `evidencia/`

### FASE 3 · Validación cruzada (Semana 3-4)

**Objetivo:** Que cada afirmación tenga al menos 2 fuentes independientes que la respalden.

**Tareas:**

1. **Búsqueda de fuentes secundarias** (Día 15-17)
   - Para cada cifra clave, buscar fact-checkers (ColombiaCheck, AFP Factual, La Silla Vacía) que confirmen
   - **Skill:** `web_search` con queries específicas por arista
   - **Output:** Tabla de triangulación

2. **Búsqueda de fuentes que contradigan** (Día 18-20)
   - **Crítico:** buscar activamente la posición del Thomas Greg, de Petro que exagera, de La Pulla, etc.
   - Si una fuente contradice, DOCUMENTAR (no ocultar)
   - **Skill:** `superpowers:systematic-debugging` + búsqueda dirigida
   - **Output:** Sección "Lo que el caso NO dice" (ya iniciada, expandir)

3. **Documentar discrepancias en formato periodístico** (Día 21-22)
   - Cada discrepancia debe tener: cifra A, cifra B, fuente A, fuente B, contexto, interpretación
   - **Output:** Actualización de la sección 13.3 del dosier

### FASE 4 · Endurecimiento y publicación (Semana 4-5)

**Objetivo:** El dosier y el HTML están listos para ser consumidos por la audiencia y por futuros verificadores.

**Tareas:**

1. **Code review del HTML y dosier** (Día 23-24)
   - **Skill:** `superpowers:code-review` aplicado al HTML/dosier
   - Buscar afirmaciones no etiquetadas, links rotos, errores de tipeo en citas
   - **Output:** Lista de issues + correcciones

2. **Generación del disclaimer final** (Día 25)
   - "Presuntamente" en todas las afirmaciones controversiales
   - Disclaimer de que las cifras pueden cambiar
   - **Output:** Revisión de la barra de disclaimer del HTML

3. **Programación de re-verificación** (Día 26)
   - **Skill:** `cron self` (recurso MAVIS)
   - Programar verificación de cifras volátiles cada 30 días:
     - Audiencia de Cerimedo (puede haber nuevas fechas)
     - Estado de la exclusión noruega
     - Cifras de AFP trimestrales
   - **Output:** Crons configurados con `cron self` de MAVIS

4. **Publicación controlada** (Día 27-28)
   - **Skill:** `superpowers:verification-before-completion` ANTES de publicar
   - Confirmación explícita del usuario antes de hacer público el HTML
   - **Output:** Versión final del HTML + dosier

---

## PARTE 3 · Cronograma Visual

```
Semana 1     Semana 2     Semana 3     Semana 4     Semana 5
[=========]  [=========]  [=========]  [=========]  [==]
Auditoría    Verif.       Validación   Endurec.     Pub.
del          primaria     cruzada      + review
inventario                                         [verif]

Skills clave:   dispatching    parallel       systematic     code-review
                parallel-      agents         debugging       
                agents         + browser      + web_search    
                + write-       screenshot                  
                plans                                   
```

---

## PARTE 4 · Tareas inmediatas (esta semana)

Si solo podés hacer 3 cosas esta semana:

1. **Hacer la auditoría de afirmaciones** → `AUDITORIA_AFIRMACIONES.md` con 80+ filas clasificadas por color
2. **Verificar 5 fuentes primarias clave** que aún están en AMARILLO:
   - Informe completo de Cuestión Pública de agosto 2025
   - Audiencia de Cerimedo del 28/08/2026 (transcripción textual, no periodística)
   - Cifra exacta de AFP trimestrales (último reporte de la Superintendencia Financiera)
   - Lista completa de los 63 estados del informe Albanese
   - Documento original del decreto de Petro de enero 2026
3. **Generar 3-5 pruebas visuales adicionales** para las afirmaciones que faltan (siguiendo el método HTML+screenshot ya probado)

---

## PARTE 5 · Riesgos identificados

| Riesgo | Mitigación |
|---|---|
| Fuente primaria inaccesible (pago, dominio privado) | Documentar la limitación y usar fuente periodística como sustituto explícito |
| Cifra cambia entre la verificación y la publicación | Programar re-verificación con `cron self` |
| Cita "de Petro" se revela como exagerada o falsa | Documentar la discrepancia con honestidad (como ya hicimos con la sentencia) |
| Acusación legal de algún implicado | Disclaimer "presuntamente" + cita textual + evidencia documentada |
| Pérdida de la sesión Mavis | Guardar PLAN_CORROBORACION.md en el proyecto, continuar desde ahí |

---

## PARTE 6 · Métricas de éxito

Antes de pasar a FASE 4 (publicación), la investigación debe cumplir:

- [ ] ≥90% de las afirmaciones cuantitativas en VERDE
- [ ] 0% de afirmaciones cuantitativas en ROJO
- [ ] Cada cita textual tiene pantallazo en `evidencia/`
- [ ] Cada afirmación controversial tiene una sección "lo que NO dice" o "lo que el caso NO dice"
- [ ] Cada link del HTML funciona y apunta a una fuente verificable
- [ ] El HTML pasa code-review con score ≥8/10

**Última actualización:** 01 de septiembre de 2026

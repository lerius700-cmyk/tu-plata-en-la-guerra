# Auditoría WCAG 2.1 con axe-core (2026-09-06)

**Target:** index.html (172 KB, 1911 líneas)
**Herramienta:** axe-core 4.13.0 (CLI + librería)
**Fecha:** 2026-09-06
**Estado:** ❌ **NO EJECUTADO — bloqueado por entorno**

## Resumen

| Severidad | # Violaciones | # Nodos afectados |
|---|---|---|
| Critical | — | — |
| Serious | — | — |
| Moderate | — | — |
| Minor | — | — |
| **Total** | **—** | **—** |

> **No se reportan conteos porque la ejecución de axe-core no produjo output.**
> Cualquier número en este reporte sería fabricación. Ver "Diagnóstico del bloqueo" abajo.

## Diagnóstico del bloqueo

`tools/audit_accessibility.js` (creado en Task 3.1, commit `03134f9`) envuelve `npx axe`, que usa **selenium-webdriver + chromedriver** para lanzar un navegador headless y ejecutar axe contra el HTML.

**Cadena de fallos observada:**

### Intento 1 — `npx axe` sin opciones
```
Error: spawn node_modules\chromedriver\lib\chromedriver\chromedriver.exe ENOENT
```
Causa: el postinstall de `chromedriver@152.0.3` no descargó el binario (probablemente falló la primera vez que se instaló la dep).

### Mitigación aplicada — `node node_modules/chromedriver/install.js`
Resultado: se descargó `chromedriver.exe` 152.0.7977.75 desde
`https://storage.googleapis.com/chrome-for-testing-public/152.0.7977.75/win64/chromedriver-win64.zip`
(10.9 MB → 23 MB extraído, ubicado en
`D:\AI\Investigaciones\Periodismo politico-economico\node_modules\chromedriver\lib\chromedriver\chromedriver.exe`).

### Intento 2 — `npx axe ... --chrome-path <msedge.exe>`
```
Error: SessionNotCreatedError: session not created
from unknown error: cannot find Chrome binary
```
Causa: el sistema **no tiene Chrome instalado**. axe-core CLI solo busca Chrome
explícitamente cuando se le pasa `--chrome-path`. Apunté a
`C:\Program Files (x86)\Microsoft\EdgeCore\152.0.4191.62\msedge.exe`
(única versión de Edge disponible — el binario es WebView2 Runtime, no un Edge "completo").

### Intento 3 — axe arranca msedge, pero chromedriver lo rechaza
```
Running axe-core 4.13.0 in chrome-headless
Error: SessionNotCreatedError: session not created
from unknown error: unrecognized Chrome version: Edg/152.0.4191.62
```
Causa raíz: **incompatibilidad de versión chromedriver ↔ navegador**.
- chromedriver instalado: 152.0.7977.75
- Edge WebView2 disponible: 152.0.4191.62
- chromedriver exige coincidencia exacta de major.minor.build.patch; no acepta el prefijo `Edg/` que reporta WebView2.

### Inventario de navegadores en el sistema
- ✅ `msedgewebview2.exe` (WebView2 runtime, 6 procesos corriendo, no es un navegador driverable)
- ✅ `msedge.exe` en `C:\Program Files (x86)\Microsoft\EdgeCore\152.0.4191.62\msedge.exe` (5.4 MB, WebView2 core)
- ✅ `msedge.exe` en `C:\Program Files (x86)\Microsoft\EdgeCore\152.0.4191.66\msedge.exe` (5.4 MB, otra copia)
- ❌ `chrome.exe` — no existe
- ❌ `msedge.exe` "completo" (no WebView2) — no existe
- ❌ `firefox.exe` — no existe

### Por qué no se resolvió automáticamente
- **No se puede instalar Chrome sin confirmación del usuario** (regla de la toolchain del sistema y preference del user: "Never auto-install software").
- **No se instaló jsdom + ejecución via API Node** porque viola "NO crear archivos fuera de `docs/superpowers/audits/2026-09-06-editorial/`" (jsdom iría a `node_modules/`).
- **No se modificó `tools/audit_accessibility.js`** (regla "NO modificar scripts existentes").

## Opciones para desbloquear (requieren decisión del padre)

1. **Instalar Chrome for Testing 152.0.7977.82** (coincide exacto con chromedriver 152.0.7977.75 ya presente).
   - URL: `https://storage.googleapis.com/chrome-for-testing-public/152.0.7977.82/win64/chrome-win64.zip`
   - ~170 MB, descarga única, sin instalador.
   - Padre debe aprobar la descarga.

2. **Instalar Chrome estable vía winget** (`winget install Google.Chrome`).
   - Requiere confirmación explícita del user.

3. **Reescribir `tools/audit_accessibility.js`** para usar axe-core directo en jsdom en lugar de selenium-webdriver.
   - Viola "NO modificar scripts existentes" — debe aprobarse como excepción.
   - jsdom no está instalado; requiere `npm install jsdom` (modifica `package.json`).
   - Limitación: reglas que requieren rendering visual (color-contrast) dan resultados parciales.

4. **Usar Playwright** (soporta msedge WebView2 y hace matching automático de versiones).
   - Requiere `npm install playwright` + `npx playwright install msedge`.
   - Cambio mayor al script existente.

## Artefactos presentes en este directorio

- `03_axe_results.md` (este archivo) — reporte de fallo
- `axe_run.log` — log de la última ejecución CLI
- `axe_run.err.log` — stack trace del error de chromedriver
- ❌ `03_axe_raw.json` — **no se creó** (axe nunca produjo output)

## Criterio de éxito (post-fixes)

Pendiente hasta que la ejecución se desbloquee. Una vez resuelto:
- ✅ 0 violaciones críticas WCAG 2.1 nivel A
- (P1/P2/P3 se atienden si el tiempo lo permite)

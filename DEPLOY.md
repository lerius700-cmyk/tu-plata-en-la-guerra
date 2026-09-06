# Guía de deploy a GitHub Pages

**Nombre sugerido del repo:** `tu-plata-en-la-guerra`

El HTML es self-contained (funciona offline), así que GitHub Pages lo sirve sin issues.

---

## Paso 1 — Crear el repo vacío en GitHub

1. Abre https://github.com/new en tu navegador
2. Configuración:
   - **Repository name:** `tu-plata-en-la-guerra` (o el nombre que prefieras)
   - **Description:** "Investigación periodística: dinero de pensiones colombianas en la guerra en Gaza"
   - **Visibilidad:** `Public` (necesario para GitHub Pages gratis)
   - **NO inicialices** con README, .gitignore ni license (ya tenemos todo local)
3. Click **Create repository**

## Paso 2 — Conectar el repo local y hacer push

GitHub te mostrará una URL del repo. Cópiala (algo como `https://github.com/TU-USER/tu-plata-en-la-guerra.git`).

Desde PowerShell en este directorio:

```powershell
cd "D:\AI\Investigaciones\Periodismo politico-economico"
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" remote add origin https://github.com/TU-USER/tu-plata-en-la-guerra.git
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" branch -M main
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" push -u origin main
```

**Si te pide autenticación:**
- Username: tu usuario de GitHub
- Password: usa un **Personal Access Token** (PAT), no tu contraseña normal
  - Generar PAT: https://github.com/settings/tokens/new
  - Scopes: marca solo `repo` (acceso completo a repos)
  - Copia el token y úsalo como password

## Paso 3 — Activar GitHub Pages

1. Ve a https://github.com/TU-USER/tu-plata-en-la-guerra/settings/pages
2. En **Source** selecciona:
   - Branch: `main`
   - Folder: `/ (root)`
3. Click **Save**
4. Espera ~1 minuto

## Paso 4 — Tu URL pública

La página quedará accesible en:

```
https://TU-USER.github.io/tu-plata-en-la-guerra/
```

(Sustituye `TU-USER` por tu nombre de usuario de GitHub)

---

## Verificación rápida

Una vez deployed, abre la URL y verifica:
- [ ] La página carga sin errores 404
- [ ] Las 15 pruebas visuales aparecen (sección 06.6)
- [ ] El SVG de la cadena AFP es clickeable
- [ ] Los hyperlinks a fuentes externas funcionan
- [ ] El search box funciona

## Updates futuros

Cada vez que cambies algo y quieras actualizar la página:

```powershell
cd "D:\AI\Investigaciones\Periodismo politico-economico"
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" add -A
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" commit -m "Descripción del cambio"
& "C:\Users\Lerius\AppData\Local\hermes\git\cmd\git.exe" push
```

La página se actualiza en ~1 minuto automáticamente.

## Si algo falla

- **404 al cargar la página:** verifica que el branch y folder en Settings → Pages sean `main` y `/ (root)`
- **404 en imágenes:** las imágenes referencian `evidencia/*.jpg` (ruta relativa). Verifica que la carpeta `evidencia/` esté en el repo
- **Push rechazado:** probablemente el repo en GitHub no está vacío (revisar que no se inicializó con README)
- **Token comprometido:** rotarlo en https://github.com/settings/tokens

## Privacidad

Este es un repo público. Ten en cuenta:
- Nombres reales de personas públicas (Cerimedo, Petro, De la Espriella) son visibles
- Las "pruebas" son screenshots y citas textuales
- El DOSIER completo está en el repo
- Si quieres agregar DISCLAIMER, edita el bloque amarillo en la parte superior de `index.html`

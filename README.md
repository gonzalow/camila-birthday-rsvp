# Confirmación de Asistencia - Cumpleaños de Camila

🎉 App simple para confirmar asistencia al cumpleaños de Camila con registro de restricciones alimentarias.

## Características

- ✅ Formulario responsive y mobile-friendly
- ✅ Registro de nombre y restricciones alimentarias
- ✅ Integración con Google Sheets vía Apps Script
- ✅ Diseño moderno y accesible
- ✅ Sin servidor backend

## Restricciones Alimentarias

- Bajo sodio
- Vegano
- Vegetariano
- Sin gluten
- Sin lactosa
- Campo libre para otras restricciones/alergias

## Setup - Paso a Paso

### 1. Google Sheet + Apps Script

**Paso 1: Crear Google Sheet**
1. Ve a https://sheets.google.com
2. Crea una nueva Sheet
3. Agrega estos encabezados en la primera fila:
   - A1: `Timestamp`
   - B1: `Nombre`
   - C1: `Restricciones`
   - D1: `Otras Restricciones`

**Paso 2: Crear Apps Script**
1. En la Sheet, ve a: Extensiones → Apps Script
2. Elimina el código por defecto
3. Copia y pega este código:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSheet();
    const data = JSON.parse(e.postData.contents);

    const row = [
      data.timestamp,
      data.nombre,
      data.restricciones.join(', '),
      data.otras
    ];

    sheet.appendRow(row);

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      message: 'Confirmación registrada'
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

**Paso 3: Deploy como Web App**
1. Click en el botón "Deploy" (arriba a la derecha)
2. Selecciona "New deployment"
3. Tipo: "Web app"
4. Execute as: tu email
5. Who has access: "Anyone"
6. Click "Deploy"
7. **Copia la URL que aparece** (algo como: `https://script.google.com/macros/d/...../usercopy/exec`)

### 2. Configurar el Frontend

1. Abre el archivo `script.js` de este repositorio
2. Busca esta línea:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{APPS_SCRIPT_ID}/usercopy/exec';
```

3. Reemplaza `{APPS_SCRIPT_ID}` con la URL completa que copiaste en el paso anterior. Ejemplo:
```javascript
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/1abc2def3ghi4jkl5mno6pqr7stu8vwx/usercopy/exec';
```

### 3. Activar GitHub Pages

1. Ve a Settings del repositorio
2. Busca "Pages" en la izquierda
3. Source: "Deploy from a branch"
4. Branch: "main" / Folder: "/ (root)"
5. Click "Save"

**Tu sitio estará disponible en:** `https://gonzalow.github.io/camila-birthday-rsvp/`

## Estructura del Proyecto

```
├── index.html       # Formulario HTML
├── script.js        # Lógica del frontend
├── style.css        # Estilos CSS
└── README.md        # Este archivo
```

## Cómo Usar

1. Abre el link: `https://gonzalow.github.io/camila-birthday-rsvp/`
2. Ingresa tu nombre
3. Selecciona tus restricciones alimentarias (si aplica)
4. Agrega otras restricciones o alergias si es necesario
5. Click en "Confirmar asistencia"
6. ¡Listo! Aparecerás en la Google Sheet automáticamente

## Para Malena - Ver las Confirmaciones

1. Abre la Google Sheet donde configuraste Apps Script
2. Cada confirmación aparecerá como una nueva fila
3. Puedes:
   - Filtrar por restricciones
   - Agregar columnas (confirmado, regalo, etc.)
   - Exportar como CSV/Excel

## Desarrollo Local

Si quieres probar en tu máquina:

```bash
# Clonar
git clone https://github.com/gonzalow/camila-birthday-rsvp.git
cd camila-birthday-rsvp

# Abrir en navegador
open index.html
# o simplemente arrastra index.html a tu navegador
```

## Notas Importantes

- **Seguridad:** Los datos (nombre + restricciones) no contienen información sensible, es seguro compartir el link
- **Link:** Comparte solo con invitados via WhatsApp, email, etc.
- **Datos en tiempo real:** Malena verá las confirmaciones al instante en la Sheet
- **Sin límite de usuarios:** Funciona para 100+ confirmaciones sin problemas

## Troubleshooting

### El formulario no envía datos
- Verifica que copiaste la URL correcta del Apps Script en `script.js`
- Comprueba que el Apps Script está deployado como "Web app"
- Verifica en la consola del navegador (F12) si hay errores

### Aparece error "Forbidden"
- Asegúrate que el Apps Script tiene permisos "Anyone" en el deployment

### No veo los datos en la Sheet
- Espera unos segundos después de enviar
- Recarga la página
- Verifica que Apps Script ejecutó correctamente (abre el Apps Script, mira los logs)

---

¡Gracias por confirmar tu asistencia! 🎂

Hecho con ❤️ para el cumpleaños de Camila
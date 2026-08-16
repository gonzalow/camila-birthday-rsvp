# Confirmación de Asistencia - Cumpleaños de Camila

🎉 App simple para confirmar asistencia al cumpleaños de Camila con registro de restricciones alimentarias.

## ⚡ Quick Start

### Google Sheet (Base de Datos)
📊 **Link:** [Cumpleaños de Camila - Confirmaciones RSVP](https://docs.google.com/spreadsheets/d/1Y6RBoUUt0l_ZA9XjOFqCYDS36t99WB8frvuUGNXEXtM/edit)

### Setup Guía Completa
📋 **Link:** [Setup Guía Paso a Paso](https://docs.google.com/document/d/15FBzhp95UZkv4gsIwdkSEa0ulqU4vokj_tgNGHVCYdw/edit)

---

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

## Setup - Paso a Paso Rápido

### 1. Google Sheet (YA CREADA ✅)
- Sheet lista: [Aquí](https://docs.google.com/spreadsheets/d/1Y6RBoUUt0l_ZA9XjOFqCYDS36t99WB8frvuUGNXEXtM/edit)
- Agrega encabezados: Timestamp, Nombre, Restricciones, Otras Restricciones

### 2. Google Apps Script
1. Abre la Sheet
2. Extensiones → Apps Script
3. Copia el código de la [Guía](https://docs.google.com/document/d/15FBzhp95UZkv4gsIwdkSEa0ulqU4vokj_tgNGHVCYdw/edit)
4. Deploy como Web App
5. Copia la URL de deployment

### 3. Configurar script.js
1. Abre: https://github.com/gonzalow/camila-birthday-rsvp/edit/main/script.js
2. Reemplaza `{APPS_SCRIPT_ID}` con tu URL del paso anterior
3. Commit

### 4. GitHub Pages
1. Settings → Pages
2. Branch: main, Folder: root
3. Save

✅ **Listo en 10 minutos**

---

## Estructura del Proyecto

```
├── index.html       # Formulario HTML
├── script.js        # Lógica del frontend
├── style.css        # Estilos CSS
└── README.md        # Este archivo
```

## Cómo Usar

1. Abre: `https://gonzalow.github.io/camila-birthday-rsvp/`
2. Ingresa tu nombre
3. Selecciona restricciones (si aplica)
4. Click "Confirmar asistencia"
5. ¡Aparecerás en la Sheet automáticamente!

## Para Malena - Ver Confirmaciones

Abre la [Google Sheet](https://docs.google.com/spreadsheets/d/1Y6RBoUUt0l_ZA9XjOFqCYDS36t99WB8frvuUGNXEXtM/edit) donde verás:
- Nombre de cada persona
- Sus restricciones alimentarias
- Otras restricciones especiales
- Timestamp de confirmación

Puedes:
- Filtrar por restricciones
- Agregar columnas (confirmado, regalo, etc.)
- Exportar como CSV/Excel

## Desarrollo Local

```bash
git clone https://github.com/gonzalow/camila-birthday-rsvp.git
cd camila-birthday-rsvp
open index.html
```

## Notas Importantes

- **Seguridad:** Datos no sensibles, link shareable por WhatsApp/email
- **Datos en tiempo real:** Malena ve confirmaciones al instante
- **Escalable:** Soporta 100+ confirmaciones sin problemas

## Troubleshooting

### El formulario no envía datos
→ Verifica que copiaste la URL correcta del Apps Script en `script.js`

### Aparece error "Forbidden"
→ Asegúrate que Apps Script tiene permisos "Anyone"

### No veo datos en la Sheet
→ Espera unos segundos, recarga la página

---

📚 Ver [Guía Completa](https://docs.google.com/document/d/15FBzhp95UZkv4gsIwdkSEa0ulqU4vokj_tgNGHVCYdw/edit) para instrucciones detalladas con screenshots.

Hecho con ❤️ para el cumpleaños de Camila 🎂
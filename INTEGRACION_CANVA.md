# 🎨 Guía de Integración con Diseño de Canva

Este documento explica cómo integrar el diseño de Malena con la funcionalidad de formulario que ya está desarrollada.

## ¿Cómo funciona?

El código JavaScript está **encapsulado en una clase reutilizable** llamada `RSVPForm`. Esto significa que:

✅ Malena puede diseñar el formulario en Canva sin restricciones  
✅ Exporta el HTML desde Canva  
✅ Solo necesita respetar ciertos **IDs/clases** que acordamos  
✅ Nuestro código se integra automáticamente  

## Pasos para Integrar

### 1. Malena diseña en Canva

- Crea un formulario hermoso con:
  - Un input para "Nombre"
  - Checkboxes para restricciones
  - Un textarea para "Otras restricciones"
  - Un botón de "Confirmar"

### 2. Exporta desde Canva

- Export como **HTML/CSS**
- Guarda los archivos

### 3. Coordina los IDs

Malena debe usar estos **IDs exactos** en sus elementos:

```html
<!-- Input para el nombre -->
<input id="nombre" type="text" placeholder="Tu nombre">

<!-- Checkboxes para restricciones -->
<input type="checkbox" name="restricciones" value="Bajo sodio">
<input type="checkbox" name="restricciones" value="Vegano">
<input type="checkbox" name="restricciones" value="Vegetariano">
<input type="checkbox" name="restricciones" value="Sin gluten">
<input type="checkbox" name="restricciones" value="Sin lactosa">

<!-- Textarea para otras restricciones -->
<textarea id="otras" placeholder="Otras restricciones..."></textarea>

<!-- Formulario contenedor -->
<form id="rsvpForm">
  <!-- todos los elementos arriba -->
</form>

<!-- Botón de envío -->
<button type="submit" id="submitBtn">Confirmar asistencia</button>

<!-- Div para mensajes -->
<div id="message"></div>
```

### 4. Integra el código

Reemplaza el `index.html` actual con el HTML de Canva y **mantén estos scripts al final del body:**

```html
<!-- Incluir el script de la clase RSVPForm -->
<script src="script.js"></script>

<!-- Inicializar (o automático si está el DOMContentLoaded) -->
<script>
  // Si los IDs coinciden con los por defecto, se inicializa automáticamente
  // Si son diferentes, pasar la configuración:
  /*
  new RSVPForm({
    formId: 'mi-form-canva',
    nameInputId: 'mi-nombre',
    // ... otros IDs si cambió
  });
  */
</script>
```

## Opción A: Usar IDs por Defecto (más fácil)

Si Malena usa exactamente estos IDs:
- `id="rsvpForm"` para el form
- `id="nombre"` para input nombre
- `name="restricciones"` para checkboxes
- `id="otras"` para textarea
- `id="submitBtn"` para el botón
- `id="message"` para el div de mensajes

**No hay nada que configurar.** El código se inicializa automáticamente.

## Opción B: Usar IDs Personalizados

Si Malena prefiere otros IDs en Canva:

```javascript
new RSVPForm({
  formId: 'form-custom',           // ID del <form>
  nameInputId: 'input-nombre',     // ID del input nombre
  restrictionsSelector: '.restriction-checkbox', // clase de checkboxes
  otherRestrictionsId: 'text-otras',// ID del textarea
  submitBtnId: 'btn-enviar',       // ID del botón
  messageDivId: 'msg-status',      // ID del div de mensajes
  appsScriptUrl: 'https://...'     // (opcional, ya está seteada)
});
```

## Clase RSVPForm - Referencia Completa

```javascript
class RSVPForm {
  constructor(options) {
    // options.formId - ID del formulario (default: 'rsvpForm')
    // options.nameInputId - ID del input nombre (default: 'nombre')
    // options.restrictionsSelector - selector CSS para checkboxes (default: 'input[name="restricciones"]')
    // options.otherRestrictionsId - ID del textarea (default: 'otras')
    // options.submitBtnId - ID del botón (default: 'submitBtn')
    // options.messageDivId - ID del div de mensajes (default: 'message')
    // options.appsScriptUrl - URL del Apps Script (ya seteada)
  }
}
```

## Flujo Completo de Datos

```
Usuario llena formulario
    ↓
Click "Confirmar"
    ↓
RSVPForm.handleSubmit() recolecta datos
    ↓
Valida nombre (obligatorio)
    ↓
Obtiene restricciones seleccionadas
    ↓
Envía a Apps Script via fetch
    ↓
Apps Script guarda en Google Sheet
    ↓
Mensaje de éxito/error
    ↓
Formulario se limpia
```

## Estilos CSS

El código usa estas clases para estilos:
- `.message` - contenedor de mensajes
- `.message.success` - mensaje de éxito
- `.message.error` - mensaje de error

Malena puede:
- ✅ Mantener los estilos actuales
- ✅ Reemplazarlos con sus propios estilos
- ✅ Solo respetarlos en clase `.message`

## Testing Paso a Paso

1. **Reemplaza index.html** con el HTML de Canva
2. **Mantén script.js** igual
3. **Verifica los IDs** coincidan (o pasa la config)
4. **Abre en navegador** y prueba:
   - Ingresa nombre
   - Selecciona restricciones
   - Click "Confirmar"
   - Verifica en Google Sheet que aparezca

## Preguntas Frecuentes

**P: ¿Canva exporta HTML limpio?**  
R: A veces exporta código "pesado", pero es OK. Solo necesitamos que respete los IDs.

**P: ¿Qué pasa si Malena quiere cambiar los estilos?**  
R: Puede cambiar todo el CSS. Solo importa que los IDs/clases sean correctos.

**P: ¿Se puede volver atrás si algo sale mal?**  
R: Sí, todos los cambios están en Git. Podemos revertir cualquier commit.

---

**Cuando Malena esté lista, coordina conmigo para hacer la integración final** ✨
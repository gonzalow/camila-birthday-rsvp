/**
 * RSVPForm - Módulo reutilizable para formularios de confirmación
 * 
 * Uso básico (con IDs por defecto):
 *   new RSVPForm();
 * 
 * Uso con configuración personalizada (para HTML de Canva):
 *   new RSVPForm({
 *     formId: 'mi-form-canva',
 *     nameInputId: 'mi-input-nombre',
 *     restrictionsSelector: '.mis-checkboxes',
 *     appsScriptUrl: 'https://...'
 *   });
 */

class RSVPForm {
  constructor(options = {}) {
    // Configuración de IDs/selectores
    this.formId = options.formId || 'rsvpForm';
    this.nameInputId = options.nameInputId || 'nombre';
    this.restrictionsSelector = options.restrictionsSelector || 'input[name="restricciones"]';
    this.otherRestrictionsId = options.otherRestrictionsId || 'otras';
    this.submitBtnId = options.submitBtnId || 'submitBtn';
    this.messageDivId = options.messageDivId || 'message';
    this.appsScriptUrl = options.appsScriptUrl || 'https://script.google.com/macros/s/AKfycbxbPn44Eao-vYuihgrCMVEuMlpkl8GTcsUrnOBGjJUqRAoWCtZjHyekB4mF8ROZBxjc/exec';

    // Obtener elementos del DOM
    this.form = document.getElementById(this.formId);
    this.submitBtn = document.getElementById(this.submitBtnId);
    this.messageDiv = document.getElementById(this.messageDivId);

    // Validar que el formulario exista
    if (!this.form) {
      console.error(`❌ Form con ID "${this.formId}" no encontrado`);
      return;
    }

    console.log('✅ RSVPForm inicializado correctamente');
    this.init();
  }

  /**
   * Inicializar listeners
   */
  init() {
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));
  }

  /**
   * Manejar el envío del formulario
   */
  async handleSubmit(e) {
    e.preventDefault();

    // Obtener nombre
    const nombreInput = document.getElementById(this.nameInputId);
    const nombre = nombreInput.value.trim();

    if (!nombre) {
      this.showMessage('Por favor ingresa tu nombre', 'error');
      return;
    }

    // Obtener restricciones seleccionadas
    const checkboxes = this.form.querySelectorAll(this.restrictionsSelector + ':checked');
    const restricciones = Array.from(checkboxes).map(cb => cb.value);

    // Obtener otras restricciones
    const otrasInput = document.getElementById(this.otherRestrictionsId);
    const otras = otrasInput.value.trim();

    // Preparar datos
    const data = {
      nombre: nombre,
      restricciones: restricciones,
      otras: otras,
      timestamp: new Date().toISOString()
    };

    // Deshabilitar botón
    this.submitBtn.disabled = true;
    this.submitBtn.textContent = 'Enviando...';
    this.messageDiv.innerHTML = '';

    try {
      // Enviar a Apps Script
      const response = await fetch(this.appsScriptUrl, {
        method: 'POST',
        body: JSON.stringify(data),
        mode: 'no-cors'
      });

      this.showMessage('¡Gracias! Tu confirmación fue registrada.', 'success');
      this.form.reset();

    } catch (error) {
      console.error('Error:', error);
      this.showMessage('Hubo un error. Por favor intenta de nuevo.', 'error');
    } finally {
      this.submitBtn.disabled = false;
      this.submitBtn.textContent = 'Confirmar asistencia';
    }
  }

  /**
   * Mostrar mensaje de estado
   */
  showMessage(text, type) {
    this.messageDiv.textContent = text;
    this.messageDiv.className = `message ${type}`;

    if (type === 'success') {
      this.messageDiv.style.display = 'block';
      // Auto-limpiar después de 5 segundos
      setTimeout(() => {
        this.messageDiv.textContent = '';
        this.messageDiv.className = 'message';
      }, 5000);
    }
  }
}

// Inicializar automáticamente cuando el DOM está listo
document.addEventListener('DOMContentLoaded', () => {
  new RSVPForm();
});
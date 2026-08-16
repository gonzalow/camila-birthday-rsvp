// Reemplaza con la URL de tu Apps Script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/d/{APPS_SCRIPT_ID}/usercopy/exec';

const form = document.getElementById('rsvpForm');
const submitBtn = document.getElementById('submitBtn');
const messageDiv = document.getElementById('message');

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Obtener nombre
    const nombre = document.getElementById('nombre').value.trim();

    if (!nombre) {
        showMessage('Por favor ingresa tu nombre', 'error');
        return;
    }

    // Obtener restricciones seleccionadas
    const checkboxes = document.querySelectorAll('input[name="restricciones"]:checked');
    const restricciones = Array.from(checkboxes).map(cb => cb.value);

    // Obtener otras restricciones
    const otras = document.getElementById('otras').value.trim();

    // Preparar datos
    const data = {
        nombre: nombre,
        restricciones: restricciones,
        otras: otras,
        timestamp: new Date().toISOString()
    };

    // Deshabilitar botón
    submitBtn.disabled = true;
    submitBtn.textContent = 'Enviando...';
    messageDiv.innerHTML = '';

    try {
        const response = await fetch(APPS_SCRIPT_URL, {
            method: 'POST',
            body: JSON.stringify(data),
            mode: 'no-cors'
        });

        // Con mode: 'no-cors' no podemos leer la respuesta
        // Asumimos que fue exitoso
        showMessage('¡Gracias! Tu confirmación fue registrada.', 'success');
        form.reset();

    } catch (error) {
        console.error('Error:', error);
        showMessage('Hubo un error. Por favor intenta de nuevo.', 'error');
    } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Confirmar asistencia';
    }
});

function showMessage(text, type) {
    messageDiv.textContent = text;
    messageDiv.className = `message ${type}`;

    if (type === 'success') {
        messageDiv.style.display = 'block';
        // Limpiar mensaje después de 5 segundos
        setTimeout(() => {
            messageDiv.textContent = '';
            messageDiv.className = 'message';
        }, 5000);
    }
}
// src/composables/useOpenRouterProvisioning.js
// Función para crear una nueva API key en OpenRouter usando la provisioning key

export async function createOpenRouterApiKey({ name, limit = null } = {}) {
  const provisioningKey = import.meta.env.VITE_OPENROUTER_PROVISIONING_KEY;
  if (!provisioningKey) {
    throw new Error('Provisioning key no configurada en VITE_OPENROUTER_PROVISIONING_KEY');
  }
  // Si no se pasa un nombre, genera uno automáticamente con la fecha y hora
  if (!name) {
    const now = new Date();
    name = `key-${now.getFullYear()}${(now.getMonth()+1).toString().padStart(2,'0')}${now.getDate().toString().padStart(2,'0')}-${now.getHours().toString().padStart(2,'0')}${now.getMinutes().toString().padStart(2,'0')}${now.getSeconds().toString().padStart(2,'0')}`;
  }
  const body = { name };
  if (limit !== null) body.limit = limit;

  const response = await fetch('https://openrouter.ai/api/v1/keys', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${provisioningKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(body)
  });
  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error('No se pudo crear la API key: ' + (errorData.error?.message || response.statusText));
  }
  const data = await response.json();
  if (!data.key) {
    throw new Error('La respuesta no contiene la nueva API key');
  }
  return data.key;
}

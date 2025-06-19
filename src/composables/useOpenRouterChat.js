// src/composables/useOpenRouterChat.js
// Función reutilizable para enviar un prompt a OpenRouter reintentando con varias API keys

export async function sendOpenRouterChat({ prompt, model = 'google/gemma-3n-e4b-it:free', messages = null }) {
  // Lee las API keys del .env
  const keysEnv = import.meta.env.VITE_OPENROUTER_API_KEYS || '';
  const apiKeys = keysEnv.split(',').map(k => k.trim()).filter(Boolean);
  if (apiKeys.length === 0) {
    throw new Error('No hay API keys configuradas en VITE_OPENROUTER_API_KEYS');
  }
  let lastError = '';
  for (let i = 0; i < apiKeys.length; i++) {
    const apiKey = apiKeys[i];
    try {
      const body = {
        model,
        messages: messages || [
          { role: "user", content: prompt }
        ],
        stream: false
      };
      const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content;
      } else {
        lastError = data.error?.message || 'No se pudo obtener respuesta';
      }
    } catch (e) {
      lastError = e && e.message ? e.message : e;
    }
  }
  throw new Error('Error al conectar con OpenRouter: ' + lastError);
}

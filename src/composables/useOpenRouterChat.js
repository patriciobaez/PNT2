// src/composables/useOpenRouterChat.js
import { createOpenRouterApiKey } from './useOpenRouterProvisioning.js'

let cachedApiKey = null;

export async function sendOpenRouterChatWithProvisioning({ prompt, model = 'google/gemma-3n-e4b-it:free', messages = null, limit = null }) {
  if (!cachedApiKey) {
    cachedApiKey = await createOpenRouterApiKey({ limit });
  }
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
        'Authorization': `Bearer ${cachedApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(body)
    });
    const data = await response.json();
    if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
      return data.choices[0].message.content;
    } else {
      throw new Error(data.error?.message || 'No se pudo obtener respuesta');
    }
  } catch (e) {
    // Si la key falla, crea una nueva y reintenta una vez
    try {
      cachedApiKey = await createOpenRouterApiKey({ limit });
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
          'Authorization': `Bearer ${cachedApiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      });
      const data = await response.json();
      if (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) {
        return data.choices[0].message.content;
      } else {
        throw new Error(data.error?.message || 'No se pudo obtener respuesta');
      }
    } catch (e2) {
      throw new Error('Error al consultar OpenRouter con la nueva key: ' + (e2 && e2.message ? e2.message : e2));
    }
  }
}

<template>
  <div class="api-tester">
    <button class="tester-btn" @click="testApi" :disabled="loading">
      {{ loading ? 'Probando...' : 'Probar API' }}
    </button>

    <div v-if="result" class="tester-result">
      <div>
        <strong>Status:</strong>
        <span :class="result.status >= 200 && result.status < 300 ? 'ok' : 'fail'">
          {{ result.status }}
        </span>
      </div>

      <div>
        <strong>Response:</strong>
        <div class="api-response-box">
          <pre>
{{ typeof result.body === 'string' ? result.body : JSON.stringify(result.body, null, 2) }}
          </pre>
        </div>
      </div>

      <!-- Agregado margin-top para separación -->
      <div class="api-buttons">
        <button class="tester-btn" @click="copyResponse">Copy to clipboard</button>
        <button class="tester-btn" @click="explainWithAI" :disabled="explanationLoading">
          {{ explanationLoading ? 'Explicando...' : 'Explain with AI' }}
        </button>
      </div>

      <!-- Mensaje de copia exitosa -->
      <div v-if="copySuccess" class="copy-success">
        ¡Copiado al portapapeles!
      </div>

      <!-- Explicación IA -->
      <div v-if="explanation" class="api-ia-section">
        <strong>Explicación:</strong>
        <div v-html="explanationHtml" class="ia-idea-text"></div>
      </div>
      <div v-if="explanationError" class="ia-idea-error">
        {{ explanationError }}
      </div>
    </div>

    <div v-if="error" class="tester-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'
import { sendOpenRouterChatWithProvisioning } from '../composables/useOpenRouterChat.js'

const props = defineProps({ api: Object })

const loading = ref(false)
const result = ref(null)
const error = ref('')

// feedback copia
const copySuccess = ref(false)

// explicación IA
const explanation = ref('')
const explanationLoading = ref(false)
const explanationError = ref('')
const explanationHtml = computed(() =>
  explanation.value ? marked.parse(explanation.value) : ''
)

async function testApi() {
  loading.value = true
  result.value = null
  error.value = ''
  try {
    let url = props.api.fetchURL
      .replace('{API key}', 'DEMO_KEY')
      .replace('{API_KEY}', 'DEMO_KEY')
      .replace('{lat}', '35')
      .replace('{lon}', '139')
      .replace('{TOKEN}', '')
    const res = await fetch(url)
    const text = await res.text()
    let body
    try {
      body = JSON.stringify(JSON.parse(text), null, 2)
    } catch {
      body = text
    }
    result.value = { status: res.status, body }
  } catch (e) {
    error.value = e.message
  }
  loading.value = false
}

function copyResponse() {
  if (result.value && result.value.body) {
    const text = typeof result.value.body === 'string'
      ? result.value.body
      : JSON.stringify(result.value.body, null, 2)
    navigator.clipboard.writeText(text).then(() => {
      copySuccess.value = true
      setTimeout(() => (copySuccess.value = false), 2000)
    })
  }
}

async function explainWithAI() {
  explanation.value = ''
  explanationError.value = ''
  explanationLoading.value = true
  try {
    const text = typeof result.value.body === 'string'
      ? result.value.body
      : JSON.stringify(result.value.body, null, 2)
    const prompt = `Explica brevemente qué significa la siguiente respuesta de la API en un párrafo en español:\n${text}`
    explanation.value = await sendOpenRouterChatWithProvisioning({ prompt })
  } catch (e) {
    explanationError.value = e?.message || String(e)
  } finally {
    explanationLoading.value = false
  }
}
</script>

<style scoped>
.api-tester {
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.tester-btn {
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
  color: #fff;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
  font-size: 0.95rem;
  cursor: pointer;
  transition: opacity 0.2s, box-shadow 0.2s;
}
.tester-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}
.tester-btn:hover:not(:disabled) {
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.15);
}

.tester-result {
  background: #f8fafc;
  border-radius: 8px;
  padding: 12px;
  color: #222;
  transition: background 0.3s, color 0.3s;
}
.ok {
  color: #1bbf5c;
  font-weight: 600;
}
.fail {
  color: #e74c3c;
  font-weight: 600;
}
.tester-error {
  color: #e74c3c;
  background: #fff0f0;
  padding: 8px 12px;
  border-radius: 6px;
}

.api-response-box {
  background: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 12px;
  max-height: 300px;
  overflow: auto;
}
.api-response-box pre {
  margin: 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* Aquí agregamos separación arriba de los botones */
.api-buttons {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.copy-success {
  color: #1bbf5c;
  font-size: 0.9rem;
  margin-top: 4px;
}

.api-ia-section {
  margin-top: 12px;
}
.api-ia-section .ia-idea-text {
  white-space: pre-wrap;
  word-wrap: break-word;
  margin-top: 4px;
  padding: 8px;
  background: #fafafa;
  border: 1px solid #eee;
  border-radius: 4px;
}
.ia-idea-error {
  color: #e74c3c;
  margin-top: 4px;
}
</style>

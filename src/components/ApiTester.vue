<template>
  <div>
    <button
      @click="testApi"
      :disabled="loading"
      class="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
    >
      {{ loading ? 'Probando...' : 'Probar API' }}
    </button>
    <div v-if="result" class="mt-2 p-2 bg-gray-100 rounded">
      <div><strong>Status:</strong> {{ result.status }}</div>
      <div><strong>Response:</strong>
        <pre class="overflow-x-auto">{{ result.body }}</pre>
      </div>
    </div>
    <div v-if="error" class="mt-2 text-red-600">{{ error }}</div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const props = defineProps({ api: Object })
const loading = ref(false)
const result = ref(null)
const error = ref('')

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
    try { body = JSON.stringify(JSON.parse(text), null, 2) } catch { body = text }
    result.value = { status: res.status, body }
  } catch (e) {
    error.value = e.message
  }
  loading.value = false
}
</script>
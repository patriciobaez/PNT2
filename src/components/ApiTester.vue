<template>
  <div class="api-tester">
    <button
      class="tester-btn"
      @click="testApi"
      :disabled="loading"
    >
      {{ loading ? 'Probando...' : 'Probar API' }}
    </button>
    <div v-if="result" class="tester-result">
      <div><strong>Status:</strong> <span :class="result.status >= 200 && result.status < 300 ? 'ok' : 'fail'">{{ result.status }}</span></div>
      <div><strong>Response:</strong>
        <pre>{{ result.body }}</pre>
      </div>
    </div>
    <div v-if="error" class="tester-error">{{ error }}</div>
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

<style scoped>
.api-tester {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
}
.tester-btn {
  background: linear-gradient(90deg, #ff7e5f 0%, #feb47b 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 10px 22px;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  box-shadow: 0 1px 4px 0 rgba(255, 126, 95, 0.10);
  transition: background 0.18s, box-shadow 0.18s;
}
.tester-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.tester-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
  box-shadow: 0 2px 8px 0 rgba(255, 126, 95, 0.18);
}
.tester-result {
  background: #f8fafc;
  border-radius: 10px;
  padding: 12px 16px;
  font-size: 0.98rem;
  color: #222;
  width: 100%;
  max-width: 480px;
  word-break: break-all;
}
.tester-result pre {
  background: #ececec;
  border-radius: 6px;
  padding: 6px;
  margin: 6px 0 0 0;
  font-size: 0.97em;
  color: #1a202c;
}
.tester-result .ok {
  color: #1bbf5c;
  font-weight: 600;
}
.tester-result .fail {
  color: #e74c3c;
  font-weight: 600;
}
.tester-error {
  color: #e74c3c;
  font-size: 0.98rem;
  background: #fff0f0;
  border-radius: 8px;
  padding: 8px 12px;
}
</style>

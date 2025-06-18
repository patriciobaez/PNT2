<template>
  <div class="api-ia-section">
    <button
      class="tester-btn"
      @click="generarIdea"
      :disabled="cargando"
    >
      {{ cargando ? 'Generando idea...' : 'Generar idea de uso con IA' }}
    </button>
    <div v-if="idea" class="ia-idea-result">
      <strong>Idea sugerida:</strong>
      <div v-html="renderedIdea" class="markdown-body ia-idea-text"></div>
    </div>
    <div v-if="error" class="ia-idea-error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { marked } from 'marked'

const props = defineProps({
  api: Object
})

const idea = ref("");
const cargando = ref(false);
const error = ref("");

const renderedIdea = computed(() => idea.value ? marked.parse(idea.value) : '')

async function generarIdea() {
  idea.value = "";
  error.value = "";
  cargando.value = true;
  try {
    const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY;
    const prompt = `Dame 1 idea creativa de uso para una API llamada "${props.api.API}", que pertenece a la categoría "${props.api.Category}" y cuya descripción es: "${props.api.Description}".\nLa idea debe ser breve, clara y enfocada en un caso de uso práctico. No incluyas detalles técnicos ni ejemplos de código, solo la idea general de cómo se podría utilizar esta API en un proyecto real.\ndevolver en formato markdown, con encabezados y párrafos, sin código ni listas.`;
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'google/gemma-3n-e4b-it:free',
        messages: [
          { role: "user", content: prompt }
        ],
        stream: false
      })
    });
    const data = await response.json();
    idea.value = (data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content) ? data.choices[0].message.content : "No se pudo obtener respuesta";
  } catch (e) {
    error.value = "Error al conectar con OpenRouter: " + (e && e.message ? e.message : e);
  } finally {
    cargando.value = false;
  }
}
</script>

<style scoped>
.api-ia-section {
  display: flex;
  flex-direction: column;
  gap: 18px;
  align-items: flex-start;
  background: #f8fafc;
  border-radius: 14px;
  padding: 0 0 0 0;
  margin-top: 0;
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
  font-family: 'Montserrat', Arial, Helvetica, sans-serif !important;
  align-self: flex-start;
}
.tester-btn:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
.tester-btn:hover:not(:disabled) {
  background: linear-gradient(90deg, #feb47b 0%, #ff7e5f 100%);
  box-shadow: 0 2px 8px 0 rgba(255, 126, 95, 0.18);
}
.ia-idea-result {
  margin-top: 16px;
}
.ia-idea-text {
  font-family: 'Montserrat', Arial, Helvetica, sans-serif !important;
  font-size: 1rem;
  color: #222;
}
.ia-idea-error {
  color: red;
  margin-top: 10px;
  font-family: 'Montserrat', Arial, Helvetica, sans-serif !important;
}
</style>

<template>
  <div class="api-detail-card">
    <h1 class="api-title">{{ api.API }}</h1>
    <p class="api-desc">{{ api.Description }}</p>

    <div class="api-detail-row">
      <DocumentationButton :doc-link="api.docLink" />
      <DifficultyRating :difficulty="api.Difficulty" />
    </div>

    <div class="api-detail-section">
      <ApiInfo :api="api" />
    </div>

    <div class="api-detail-section">
      <ApiTester :api="api" />
    </div>

    <div class="api-detail-section">
      <button @click="generarIdea" :disabled="cargando" style="margin-bottom:10px;">
        {{ cargando ? 'Generando idea...' : 'Generar idea de uso con IA' }}
      </button>
      <div v-if="idea">
        <strong>Idea sugerida:</strong>
        <div v-html="renderedIdea" class="markdown-body"></div>
      </div>
      <div v-if="error" style="color:red;">{{ error }}</div>
    </div>
  </div>
</template>

<script setup>
  import DocumentationButton from './DocumentationButton.vue'
  import DifficultyRating from './DifficultyRating.vue'
  import ApiInfo from './ApiInfo.vue'
  import ApiTester from './ApiTester.vue'
  import { ref, computed } from 'vue'
  import { marked } from 'marked'

  const props = defineProps({ api: Object })

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
      const prompt = `Dame 1 idea creativa de uso para una API llamada "${props.api.API}", que pertenece a la categoría "${props.api.Category}" y cuya descripción es: "${props.api.Description}". 
      La idea debe ser breve, clara y enfocada en un caso de uso práctico. No incluyas detalles técnicos ni ejemplos de código, solo la idea general de cómo se podría utilizar esta API en un proyecto real.
      devolver en formato markdown, con encabezados y párrafos, sin código ni listas.`;
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
.api-detail-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(60,60,60,0.08);
  padding: 36px 32px 32px 32px;
  max-width: 600px;
  margin: 40px auto;
  display: flex;
  flex-direction: column;
  gap: 24px;
}
.api-title {
  font-size: 2rem;
  font-weight: 700;
  color: #222;
  margin-bottom: 8px;
}
.api-desc {
  font-size: 1.1rem;
  color: #6b7280;
  margin-bottom: 12px;
}
.api-detail-row {
  display: flex;
  gap: 18px;
  align-items: center;
  margin-bottom: 8px;
}
.api-detail-section {
  background: #f8fafc;
  border-radius: 14px;
  padding: 18px 20px;
  margin-top: 0;
}
.markdown-body h1, .markdown-body h2, .markdown-body h3 {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.markdown-body p {
  margin-bottom: 1em;
}
</style>
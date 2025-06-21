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
      <ApiIdeaIA :api="api" />
    </div>
  </div>
</template>

<script setup>
import DocumentationButton from './DocumentationButton.vue'
import DifficultyRating from './DifficultyRating.vue'
import ApiInfo from './ApiInfo.vue'
import ApiTester from './ApiTester.vue'
import ApiIdeaIA from './ApiIdeaIA.vue'

const props = defineProps({ api: Object })
</script>

<style scoped>
.api-detail-card {
  background: #fff;
  border-radius: 20px;
  box-shadow: 0 2px 12px 0 rgba(60, 60, 60, 0.08);
  padding: 36px 32px 32px 32px;
  max-width: 600px;
  margin: 0; /* eliminado margin-top para alinear con el sidebar */
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
.markdown-body h1,
.markdown-body h2,
.markdown-body h3 {
  font-weight: bold;
  margin-top: 1em;
  margin-bottom: 0.5em;
}
.markdown-body p {
  margin-bottom: 1em;
}
</style>

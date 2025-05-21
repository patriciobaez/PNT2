<template>
  <div>
    <h1>{{ api.API }}</h1>
    <p>{{ api.Description }}</p>

    <!-- Aquí DocumentationButton -->
    <DocumentationButton :doc-link="api.docLink" />

    <!-- Aquí DifficultyRating -->
    <DifficultyRating :difficulty="api.Difficulty" />

    <!-- Aquí ApiInfo -->
    <ApiInfo :api="api" />

    <!-- Aquí ApiTester -->
    <ApiTester :api="api" />
  </div>
</template>

<script setup>
  import DocumentationButton from './DocumentationButton.vue'
  import DifficultyRating from './DifficultyRating.vue'
  import ApiInfo from './ApiInfo.vue'
  import ApiTester from './ApiTester.vue'

  defineProps({ api: Object })
</script>
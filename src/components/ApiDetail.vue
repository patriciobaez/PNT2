<template>
  <div class="max-w-2xl mx-auto p-6 bg-white rounded shadow grid gap-6">
    <h1 class="text-2xl font-bold">{{ api.API }}</h1>
    <p class="text-gray-700">{{ api.Description }}</p>

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
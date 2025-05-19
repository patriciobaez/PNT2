<template>
  <a
    :href="docLink"
    target="_blank"
    rel="noopener"
    class="inline-block px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Ver documentación
  </a>
</template>
<script setup>
defineProps({ docLink: String })
</script>
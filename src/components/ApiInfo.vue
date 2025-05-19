<template>
  <ul class="text-sm space-y-1">
    <li><strong>Auth:</strong> {{ api.Auth || 'Ninguno' }}</li>
    <li><strong>HTTPS:</strong> {{ api.HTTPS ? 'Sí' : 'No' }}</li>
    <li><strong>CORS:</strong> {{ api.Cors }}</li>
    <li><strong>fetchURL:</strong> <code>{{ api.fetchURL }}</code></li>
    <li><strong>Notas:</strong> {{ api.notes }}</li>
  </ul>
</template>
<script setup>
defineProps({ api: Object })
</script>
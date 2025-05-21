<template>
  <a
    :href="docLink"
    target="_blank"
    rel="noopener"
  > 
    Ver documentación
  </a>
</template>

<script setup>
  defineProps({ docLink: String })
</script>

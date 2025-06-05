<template>
  <a
    :href="docLink"
    target="_blank"
    rel="noopener"
    class="doc-btn"
  >
    📄 Ver documentación
  </a>
</template>

<script setup>
  defineProps({ docLink: String })
</script>

<style scoped>
.doc-btn {
  display: inline-block;
  background: linear-gradient(90deg, #f26c21 0%, #feb47b 100%);
  color: #fff;
  border: none;
  border-radius: 10px;
  padding: 8px 18px;
  font-size: 1rem;
  font-weight: 500;
  text-decoration: none;
  box-shadow: 0 1px 4px 0 rgba(242, 108, 33, 0.10);
  transition: background 0.18s, box-shadow 0.18s;
}
.doc-btn:hover {
  background: linear-gradient(90deg, #feb47b 0%, #f26c21 100%);
  color: #fff;
  box-shadow: 0 2px 8px 0 rgba(242, 108, 33, 0.18);
}
</style>

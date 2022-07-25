<script setup lang="ts">
import { onMounted, ref } from 'vue'

const time = ref('')

onMounted(() => {
  window.setInterval(() => {
    time.value = new Date().toLocaleString()
  }, 1000)
})
</script>

<template>
  <small>{{ time }}</small>
</template>

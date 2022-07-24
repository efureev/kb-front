<script setup lang="ts">
import { ref, onMounted } from 'vue'

const time = ref('')

onMounted(function () {
  window.setInterval(() => {
    time.value = new Date().toLocaleString()
  }, 1000)
})

</script>

<template>
  <small>{{ time }}</small>
</template>

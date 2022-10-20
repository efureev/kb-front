<script setup lang="ts">
// import { useI18n } from 'vue-i18n'
//
// const { t } = useI18n()
</script>

<template>
  <div>
    <h3>Открыто Юзеру!</h3>
    <icon-carbon-campsite class-name="inline-block" />
  </div>
</template>

<route>
{ meta: { layout: "private", requiresAuth: true } }
</route>

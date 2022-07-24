<script setup lang="ts">
// import { defineProps, ref } from 'vue'
// import { useI18n } from 'vue-i18n'

// const {t} = useI18n()

/* const props = defineProps({
  message: String,
  msg: String
})*/
</script>

<template>
<!--  <div class="font-mono">-->
  <div>
    <p class="text-4xl">
      <icon-carbon-home class="inline-block" />
    </p>
    <p>
      <a rel="noreferrer" href="https://github.com/frandiox/vitesse-ssr-template" target="_blank"> Vitesse SSR </a>
    </p>
    <p>
      <!--      <em class="text-sm opacity-75">{{ t('intro.desc') }}</em>-->
      <em class="text-sm opacity-75">intro.desc</em>
    </p>
  </div>
</template>

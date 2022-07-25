<script setup lang="ts">
import { loginWithProvider, useProviders } from '@/services/auth/providers'

const { loading, errorMessage, providers } = useProviders()
</script>

<template>
  <div v-if="errorMessage" class="error">
    {{ errorMessage }}
  </div>
  <template v-else>
    <ul v-if="!loading" class="providers list-none flex justify-center">
      <template v-for="provider in providers" :key="provider">
        <li class="providers-item" @click="loginWithProvider(provider)">
          <div :title="provider" class="mx-3 cursor-pointer">
            <icon-cib-github v-if="provider === 'github'" />
            <icon-cib-yandex v-else-if="provider === 'yandex'" />
            <icon-cib-google v-else-if="provider === 'google'" />
          </div>
        </li>
      </template>
    </ul>
  </template>
</template>

<style lang="scss" scoped>
.providers {
  &-item {
    font-size: 3em;
  }
}
</style>

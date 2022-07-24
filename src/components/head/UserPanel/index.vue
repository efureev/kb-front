<script setup lang="ts">
import { isAuthenticated, user } from '@/services/auth'
import Info from './Info.vue'
import Login from './Login.vue'

</script>

<template>
  <info v-if="isAuthenticated" :user="user" />
  <login v-else />
</template>

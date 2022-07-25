<script setup lang="ts">
import Info from './Info.vue'
import Login from './Login.vue'
import { isAuthenticated, user } from '@/services/auth'
</script>

<template>
  <info v-if="isAuthenticated" :user="user" />
  <login v-else />
</template>

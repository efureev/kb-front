<script setup lang="ts">
import Info from './Info.vue'
import Login from './Login.vue'
import { isAuthenticated, user } from '@/services/auth'
</script>

<template>
  <Info v-if="isAuthenticated" :user="user" />
  <Login v-else />
</template>

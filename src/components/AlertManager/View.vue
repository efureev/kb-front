<script setup lang="ts">
import {
  descriptionAlert,
  effectAlert,
  showAlert,
  showIconAlert,
  titleAlert,
  typeAlert,
} from './index'

const hideAlert = () => {
  showAlert.value = false
}
</script>

<template>
  <el-alert
    v-if="showAlert"
    :title="titleAlert"
    :description="descriptionAlert"
    :type="typeAlert"
    :effect="effectAlert"
    :show-icon="showIconAlert"
    @close="hideAlert"
  />
</template>

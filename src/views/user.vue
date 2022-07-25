<script lang="ts">
import { ElButton, ElCard, ElForm, ElFormItem, ElInput, ElNotification } from 'element-plus'
import { useUser } from '@/store/user'

export default defineComponent({
  name: 'User',
  components: {
    ElCard,
    ElForm,
    ElButton,
    ElFormItem,
    ElInput,
  },
  setup() {
    const params = reactive({
      userName: '',
      password: '',
    })
    const userStore = useUser()
    const loading = ref(false)
    const isLogin = computed(() => !!userStore.userInfo.token)
    const userInfo = computed(() => userStore.userInfo)

    const submitHandle = () => {
      const { userName, password } = params
      if (!userName) {
        ElNotification({
          type: 'error',
          title: 'Error',
          message: 'Username is required',
        })
        return
      }
      if (!password) {
        ElNotification({
          type: 'error',
          title: 'Error',
          message: 'Password is required',
        })
        return
      }
      loading.value = true
      window.setTimeout(() => {
        userStore.updateUser({
          name: userName,
          userId: '1',
          token: Math.random().toString(36).slice(-8),
        })
        loading.value = false
      }, 1500)
    }
    return { params, loading, submitHandle, userInfo, isLogin }
  },
})
</script>

<template>
  <div class="user">
    <h3 class="mb-8px">
      User Page
    </h3>
    <div v-if="isLogin" class="info">
      <ElCard class="box-card">
        <div class="mb-12px c-red">
          User logged in
        </div>
        <div>UserName: <span class="c-#00f">{{ userInfo.name }}</span></div>
      </ElCard>
    </div>
    <ElForm v-else label-position="top" class="form">
      <ElFormItem label="UserName">
        <ElInput v-model="params.userName" />
      </ElFormItem>
      <ElFormItem label="Password">
        <ElInput v-model="params.password" type="password" />
      </ElFormItem>
      <ElFormItem>
        <ElButton :loading="loading" type="success" @click="submitHandle">
          Submit
        </ElButton>
      </ElFormItem>
    </ElForm>
  </div>
</template>

<style lang="scss">
.form {
  width: 450px;
  margin: 0 auto;
}
.box-card {
  width: 480px;
  margin: 20px auto;
}
</style>

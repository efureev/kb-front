<script setup
  lang="ts">
import { getUserAuthTokens } from '@/api/user/tokens'

const { availablePermissions = [], defaultPermissions = [] } = defineProps<{
  // tokens: string[]
  availablePermissions: string[]
  defaultPermissions: string[]
}>()

const { tokens } = getUserAuthTokens(true)
const { t } = useI18n()

const createApiTokenForm = reactive({
  name: '',
  permissions: [], // defaultPermissions,
  errors: {},
})

const createApiToken = () => {
  /*
  createApiTokenForm.post(route('api-tokens.store'), {
    preserveScroll: true,
    onSuccess: () => {
      displayingToken.value = true
      createApiTokenForm.reset()
    },
  })
  */
}
</script>

<template>
  <!-- Generate API Token -->
  <!--

    <FormSection @submitted="createApiToken">
      <template #title>
        Create API Token
      </template>

      <template #description>
        API tokens allow third-party services to authenticate with our application on your behalf.
      </template>

      <template #form>
        &lt;!&ndash; Token Name &ndash;&gt;
        <div class="col-span-6 sm:col-span-4">
          <Label for="name"
            value="Name" />
          &lt;!&ndash;        <JetInput id="name"
            v-model="createApiTokenForm.name"
            type="text"
            class="mt-1 block w-full"
            autofocus />
            &ndash;&gt;
          <InputError :message="createApiTokenForm.errors.name"
            class="mt-2" />
        </div>

        &lt;!&ndash; Token Permissions &ndash;&gt;
        <div v-if="availablePermissions.length > 0"
          class="col-span-6">
          <Label for="permissions"
            value="Permissions" />

          <div class="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div v-for="permission in availablePermissions"
              :key="permission">
              <label class="flex items-center">
                &lt;!&ndash;
                              <JetCheckbox v-model:checked="createApiTokenForm.permissions"
                                :value="permission" />
                              &ndash;&gt;
                <span class="ml-2 text-sm text-gray-600">{{ permission }}</span> </label>
            </div>
          </div>
        </div>
      </template>

      <template #actions>
        &lt;!&ndash;
        <ActionMessage :on="createApiTokenForm.recentlySuccessful"
          class="mr-3">
          Created.
        </ActionMessage>
        &ndash;&gt;

        &lt;!&ndash;      <el-button :class="{ 'opacity-25': createApiTokenForm.processing }" :disabled="createApiTokenForm.processing"> &ndash;&gt;
        <el-button>
          Create
        </el-button>
      </template>
    </FormSection>
  -->
  <div v-if="tokens.list.length > 0">
    <SectionBorder />

    <!--    &lt;!&ndash; Manage API Tokens &ndash;&gt; -->
    <div class="mt-10 sm:mt-0">
      <ActionSection>
        <template #title>
          Manage API Tokens
        </template>

        <template #description>
          You may delete any of your existing tokens if they are no longer needed.
        </template>

        <!--        &lt;!&ndash; API Token List &ndash;&gt; -->
        <template #content>
          <div class="space-y-6">
            <div v-for="token in tokens.list"
              :key="token.id"
              class="flex items-center justify-between">
              <div>
                {{ token.name }}
              </div>

              <div class="flex items-center">
                <div v-if="token.last_used_ago"
                  class="text-sm text-gray-400">
                  Last used {{ token.last_used_ago }}
                </div>

                <button v-if="availablePermissions.length > 0"
                  class="cursor-pointer ml-6 text-sm text-gray-400 underline"
                >
                  Permissions
                </button>

                <button class="cursor-pointer ml-6 text-sm text-red-500">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </template>
      </ActionSection>
    </div>
  </div>
</template>

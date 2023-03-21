<script setup lang="ts">
import { FormInst, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'public'
})

const rules = {
  email: [
    {
      required: true,
      message: 'Please enter your email',
      trigger: 'blur'
    },
    {
      type: 'email',
      message: 'Please enter a valid email',
      trigger: 'blur'
    }
  ]
}

const authStore = useAuthStore()
const { model, loading } = storeToRefs(authStore)
const resetForm = ref<FormInst | null>(null)
const message = useMessage()

const forgotPassword = () => {
  resetForm.value?.validate(async (errors: any) => {
    if (errors) {
      message.error('Please fill in the required fields')
      return
    }

    authStore.setLoading(true)
    const client = useSupabaseAuthClient()
    const router = useRouter()

    try {
      const { data, error } = await client.auth.resetPasswordForEmail(
        model.value.forgot.email,
        {
          redirectTo: 'http://localhost:3000/auth/reset-password'
        }
      )
      if (error) {
        message.error(error.message)
        return
      }
      if (data) {
        message.success('Password reset email sent! Please check your inbox including spam folder.')
        router.push('/auth/sign-in')
      }
    } catch (e: any) {
      message.error(e.message)
    } finally {
      authStore.setLoading(false)
    }
  })
}

onBeforeRouteLeave((_to, _from, next) => {
  authStore.resetModel()
  next()
})
</script>

<template>
  <div class="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <img class="mx-auto h-12" src="~/assets/logo.png" alt="Tweets Gen Logo">
      <h2 class="mt-5 text-center text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Reset your password
        <p class="text-sm mt-3 font-light">
          We will send you an email with a link to reset your password.
        </p>
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <nuxt-link to="sign-in" class="font-medium text-twitter-blue hover:text-twitter-blue-dark">
          sign in to your account
        </nuxt-link>
      </p>
    </div>
    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="shadow sm:rounded-lg">
        <n-card>
          <n-form ref="resetForm" :disabled="loading" :model="model.forgot" :rules="rules" size="large"
            label-placement="top">
            <n-form-item :span="12" label="Email" path="email">
              <n-input v-model:value="model.forgot.email" placeholder="elonmusk@gmail.com"
                @keyup.enter="forgotPassword" />
            </n-form-item>
            <div class="mt-5">
              <n-button :loading="loading" icon-placement="left" type="primary"
                class="flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-twitter-blue shadow-sm"
                @click="forgotPassword">
                Reset
              </n-button>
            </div>
          </n-form>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

<script setup lang="ts">
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import Facebook from '@vicons/fa/FacebookF'
import Twitter from '@vicons/fa/Twitter'
import Google from '@vicons/fa/Google'
import { FormInst, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'

definePageMeta({
  layout: 'public',
  middleware: 'public'
})

const authStore = useAuthStore()
const { model, loading } = storeToRefs(authStore)
const message = useMessage()
const signupForm = ref<FormInst | null>(null)

const rules = {
  username: [
    {
      required: true,
      message: 'Please enter your username',
      trigger: 'blur'
    },
    {
      min: 3,
      message: 'Username must be at least 3 characters',
      trigger: 'blur'
    }
  ],
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
  ],
  password: [
    {
      required: true,
      message: 'Please enter your password',
      trigger: 'blur'
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur'
    }
  ],
  confirmPassword: [
    {
      required: true,
      message: 'Please confirm your password',
      trigger: 'blur'
    },
    {
      min: 6,
      message: 'Password must be at least 6 characters',
      trigger: 'blur'
    },
    {
      validator: (_rule: any, value: any, callback: any) => {
        if (value !== model.value.signUp.password) {
          callback(new Error('Passwords do not match'))
        } else {
          callback()
        }
      },
      trigger: 'blur'
    }
  ]
}

const signUp = () => {
  signupForm.value?.validate(async (errors: any) => {
    if (errors) {
      message.error('Please fill in the required fields')
      return
    }

    if (model.value.signUp.password !== model.value.signUp.confirmPassword) {
      message.error('Passwords do not match')
      return
    }

    authStore.setLoading(true)
    const client = useSupabaseAuthClient()
    const router = useRouter()

    try {
      const { data, error } = await client.auth.signUp({
        email: model.value.signUp.email,
        password: model.value.signUp.password,
        options: {
          emailRedirectTo: 'http://localhost:3000/callback/',
          data: {
            username: model.value.signUp.username
          }
        }
      })
      if (error) {
        message.error(error.message)
        return
      }
      if (data.user?.identities?.length === 0) {
        message.error('The email is already registered')
        return
      }
      message.success('Account created successfully. Please check your email to verify your account.')
      router.push('/auth/sign-in')
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
      <h2 class="mt-5 text-center text-3xl font-semibold tracking-tight text-gray-900 dark:text-white">
        Let's get started.
        <p class="text-sm mt-3 font-normal">
          Creating an account is easy. It only takes a few steps.
        </p>
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        <nuxt-link to="sign-in" class="font-medium text-twitter-blue hover:text-twitter-blue-dark">
          Already have an account?
        </nuxt-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="shadow sm:rounded-lg">
        <n-card>
          <n-form ref="signupForm" :model="model.signUp" :rules="rules" :disabled="loading" size="large"
            label-placement="top">
            <n-form-item :span="12" label="Email" path="email">
              <n-input v-model:value="model.signUp.email" placeholder="Email" @keyup.enter="signUp" />
            </n-form-item>
            <n-form-item :span="12" label="Username" path="username">
              <n-input v-model:value="model.signUp.username" placeholder="Tony" @keyup.enter="signUp" />
            </n-form-item>
            <n-form-item :span="12" label="Password" path="password">
              <n-input v-model:value="model.signUp.password" show-password-on="click" type="password"
                placeholder="Password" @keyup.enter="signUp">
                <template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item>
            <n-form-item :span="12" label="Confirm Password" path="confirmPassword">
              <n-input v-model:value="model.signUp.confirmPassword" show-password-on="click" type="password"
                placeholder="Confirm your password" @keyup.enter="signUp">
                <template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item>
            <div class="mt-5">
              <n-button :loading="loading" icon-placement="left" type="primary"
                class="flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-twitter-blue shadow-sm"
                @click="signUp">
                Sign Up
              </n-button>
            </div>
          </n-form>
          <div class="mt-5">
            <div class="relative">
              <div class="absolute inset-0 flex items-center">
                <div class="w-full border-t border-gray-300" />
              </div>
              <div class="relative flex justify-center text-sm">
                <span class="bg-white dark:bg-naive-black px-2 text-gray-500 dark:text-white">
                  Or Sign Up with
                </span>
              </div>
            </div>

            <div class="mt-6 grid grid-cols-3 gap-3">
              <div>
                <n-button quaternary type="primary"
                  class="inline-flex w-full justify-center rounded-md bg-white dark:bg-naive-black py-2 px-4 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
                  <template #icon>
                    <n-icon :size="20">
                      <Facebook />
                    </n-icon>
                  </template>
                </n-button>
              </div>

              <div>
                <n-button quaternary type="primary"
                  class="inline-flex w-full justify-center rounded-md bg-white dark:bg-naive-black py-2 px-4 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
                  <template #icon>
                    <n-icon :size="20">
                      <Twitter />
                    </n-icon>
                  </template>
                </n-button>
              </div>

              <div>
                <n-button quaternary type="primary"
                  class="inline-flex w-full justify-center rounded-md bg-white dark:bg-naive-black py-2 px-4 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0">
                  <template #icon>
                    <n-icon :size="20">
                      <Google />
                    </n-icon>
                  </template>
                </n-button>
              </div>
            </div>
          </div>
        </n-card>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

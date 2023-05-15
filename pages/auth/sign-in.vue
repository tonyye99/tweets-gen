<script setup lang="ts">
import { GlassesOutline, Glasses } from '@vicons/ionicons5'
import Facebook from '@vicons/fa/FacebookF'
import Twitter from '@vicons/fa/Twitter'
import Google from '@vicons/fa/Google'
import { FormInst, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'

definePageMeta({
    layout: 'public'
})

const authStore = useAuthStore()
const { model, loading } = storeToRefs(authStore)
const signInForm = ref<FormInst | null>(null)
const message = useMessage()

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
    ],
    password: [
        {
            required: true,
            message: 'Please enter your password',
            trigger: 'blur'
        }
    ]
}

const signIn = () => {
    signInForm.value?.validate(async (errors: any) => {
        if (errors) {
            message.error('Please fill in the required fields')
            return
        }

        authStore.setLoading(true)
        const client = useSupabaseAuthClient()
        const router = useRouter()

        try {
            const { data, error } = await client.auth.signInWithPassword({
                email: model.value.signIn.email,
                password: model.value.signIn.password
            })

            if (error) {
                message.error(error.message)
                return
            }
            if (data.user) {
                authStore.setMethod('signIn')
                router.push('/ai-contents/')
                return
            }
        } catch (e: any) {
            message.error(e.message)
        } finally {
            authStore.setLoading(false)
        }
    })
}

const googleSignIn = async (provider: 'google' | 'facebook' | 'twitter') => {
    authStore.setLoading(true)
    const client = useSupabaseAuthClient()

    try {
        const { error } = await client.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: 'http://localhost:3000/callback/'
            }
        })
        if (error) {
            message.error(error.message)
            return
        }
        authStore.setMethod('signIn')
    } catch (e: any) {
        message.error(e.message)
    } finally {
        authStore.setLoading(false)
    }
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
        Sign in to your account
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Or
        {{ " " }}
        <nuxt-link to="sign-up" class="font-medium text-twitter-blue">
          start your 14-day free trial
        </nuxt-link>
      </p>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="shadow sm:rounded-lg">
        <n-card>
          <n-form ref="signInForm" :disabled="loading" :model="model.signIn" :rules="rules" size="large"
            label-placement="top">
            <n-form-item :span="12" label="Email" path="email">
              <n-input v-model:value="model.signIn.email" placeholder="elonmusk@gmail.com" @keyup.enter="signIn" />
            </n-form-item>
            <n-form-item :span="12" label="Password" path="password">
              <n-input v-model:value="model.signIn.password" show-password-on="click" type="password"
                placeholder="elonmusk123" @keyup.enter="signIn">
                <template #password-visible-icon>
                  <n-icon :size="16" :component="GlassesOutline" />
                </template>
                <template #password-invisible-icon>
                  <n-icon :size="16" :component="Glasses" />
                </template>
              </n-input>
            </n-form-item>
            <div class="flex justify-end">
              <nuxt-link to="forgot-password" class="hover:text-twitter-blue">
                Forgot Password?
              </nuxt-link>
            </div>
            <div class="mt-5">
              <n-button :loading="loading" icon-placement="left" type="primary"
                class="flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-twitter-blue shadow-sm"
                @click="signIn">
                Sign in
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
                  Or Sign In with
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
                  class="inline-flex w-full justify-center rounded-md bg-white dark:bg-naive-black py-2 px-4 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 focus:outline-offset-0"
                  @click="googleSignIn('google')">
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

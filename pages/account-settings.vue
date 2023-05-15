<script setup lang="ts">
import AttachEmailTwotone from '@vicons/material/AttachEmailTwotone'
import GoogleOutlined from '@vicons/antd/GoogleOutlined'
const colorMode = useColorMode()
const active = computed({
    get: () => colorMode.value === 'dark',
    set: (value) => {
        colorMode.preference = value ? 'dark' : 'light'
    }
})

const user = useSupabaseUser()

const signInMethods = computed(() => {
    if (!user.value) {
        return []
    }
    return user.value?.app_metadata?.providers.map((provider: string) => {
        return provider === 'google' ? { text: 'Google', icon: GoogleOutlined } : { text: 'Email', icon: AttachEmailTwotone }
    })
})
</script>

<template>
  <div class="overflow-hidden bg-white dark:bg-naive-black">
    <div class="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
      <div class="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 sm:space-y-5 ">
        <div class="space-y-6 sm:space-y-5">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-semibold leading-6">
                Account Information
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div>
              <n-button icon-placement="left" type="primary"
                class="flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-twitter-blue shadow-sm">
                Edit
              </n-button>
            </div>
          </div>

          <div class="space-y-6 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700  sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Email</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">{{ user?.email }}</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700  sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Username</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">{{ user?.user_metadata?.username }}</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Providers</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <ul class="flex gap-3 bg-white dark:bg-naive-black">
                  <li v-for="method in signInMethods" :key="method">
                    <n-tag round :bordered="false" type="success" class="flex items-center">
                      {{ method.text }}
                      <template #icon>
                        <n-icon :component="method.icon" />
                      </template>
                    </n-tag>
                  </li>
                </ul>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6 sm:pt-1.5">Subscription</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">Premium</label>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6 divide-y divide-gray-200 dark:divide-gray-700  pt-8 sm:space-y-5 sm:pt-10">
          <div class="flex items-center justify-between">
            <div>
              <h3 class="text-base font-semibold leading-6">
                Preferences
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Use a permanent address where you can receive mail.
              </p>
            </div>
            <div>
              <n-button icon-placement="left" type="primary"
                class="flex w-full justify-center rounded-md py-2 px-3 text-sm font-semibold text-twitter-blue shadow-sm">
                Edit
              </n-button>
            </div>
          </div>
          <div class="space-y-6 divide-y divide-gray-200 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="first-name" class="block text-sm font-medium leading-6 sm:pt-1.5">
                Dark Mode
              </label>
              <div class="mt-2 sm:col-span-2 sm:mt-0">
                <ul class="flex flex-col p-2 bg-white dark:bg-naive-black">
                  <li>
                    <n-switch v-model:value="active" size="large" class="">
                      <template #checked-icon>
                        🌙
                      </template>
                      <template #unchecked-icon>
                        ☀️
                      </template>
                    </n-switch>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

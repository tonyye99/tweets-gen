<script setup lang="ts">
const colorMode = useColorMode()
const active = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <div class="overflow-hidden bg-white dark:bg-naive-black">
    <n-form ref="formRef" label-placement="left" require-mark-placement="right-hanging" label-width="auto" size="medium"
      class="space-y-8 divide-y divide-gray-200 dark:divide-gray-700">
      <div class="space-y-8 divide-y divide-gray-200 dark:divide-gray-700 sm:space-y-5 ">
        <div class="space-y-6 sm:space-y-5">
          <div>
            <h3 class="text-base font-semibold leading-6">
              Account Information
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
          </div>

          <div class="space-y-6 sm:space-y-5">
            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700  sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Email</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">ygxan18@gmail.com</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700  sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Username</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">Ye</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Providers</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">Google</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6 sm:pt-1.5">Subscription</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <label for="about" class="block text-sm font-medium leading-6">Premium</label>
              </div>
            </div>

            <div
              class="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:border-t sm:border-gray-200 dark:border-gray-700 sm:pt-5">
              <label for="about" class="block text-sm font-medium leading-6">Password</label>
              <div class="mt-2 sm:col-span-2 sm:mt-0 max-w-lg">
                <a class="block text-sm font-medium leading-6">Reset Password</a>
              </div>
            </div>
          </div>
        </div>

        <div class="space-y-6 divide-y divide-gray-200 dark:divide-gray-700  pt-8 sm:space-y-5 sm:pt-10">
          <div>
            <h3 class="text-base font-semibold leading-6">
              Preferences
            </h3>
            <p class="mt-1 max-w-2xl text-sm text-gray-500">
              Use a permanent address where you can receive mail.
            </p>
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
    </n-form>
  </div>
</template>

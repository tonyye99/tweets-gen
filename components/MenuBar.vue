<script setup lang="ts">

const colorMode = useColorMode()

const active = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.value = value ? 'dark' : 'light'
  }
})
</script>

<template>
  <div>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-gray-900">
      <div class="container flex flex-wrap items-center justify-between mx-auto">
        <nuxt-link to="/" class="flex items-center">
          <img src="~/assets/logo.png" class="h-10 mt-1" alt="TweetsGen Logo" />
        </nuxt-link>
        <div class="" id="navbar-default">
          <ul class="flex flex-col p-2 bg-white dark:bg-gray-900">
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
    </nav>
  </div>
</template>
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
      <a href="https://flowbite.com/" class="flex items-center">
        <img src="https://flowbite.com/docs/images/logo.svg" class="h-6 mr-3 sm:h-9" alt="Flowbite Logo" />
          <span class="self-center text-xl font-semibold whitespace-nowrap dark:text-white">TweetsGen</span>
        </a>
        <div class="" id="navbar-default">
          <ul
            class="flex flex-col p-2 bg-white dark:bg-gray-900">
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
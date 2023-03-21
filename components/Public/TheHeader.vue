<script setup lang="ts">
const colorMode = useColorMode()
const user = useSupabaseUser()
const route = useRoute()

const active = computed({
  get: () => colorMode.value === 'dark',
  set: (value) => {
    colorMode.preference = value ? 'dark' : 'light'
  }
})

const isIndex = computed(() => {
  return route.path === '/'
})
</script>

<template>
  <div>
    <nav class="bg-white border-gray-200 px-2 sm:px-4 py-2.5 dark:bg-naive-black">
      <div class="flex flex-wrap items-center justify-between mx-auto px-10">
        <nuxt-link to="/" class="flex items-center">
          <img src="~/assets/logo.png" class="h-10 mt-1" alt="TweetsGen Logo">
        </nuxt-link>
        <div id="navbar-default" class="flex items-center gap-3">
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
          <template v-if="isIndex">
            <router-link v-if="!user" to="/auth/sign-in">
              <n-button round ghost type="primary" class="hover:text-twitter-blue">
                Sign In
              </n-button>
            </router-link>
            <router-link v-else to="/ai-contents">
              <n-button round type="primary" class="bg-twitter-blue">
                Dashboard
              </n-button>
            </router-link>
          </template>
        </div>
      </div>
    </nav>
  </div>
</template>

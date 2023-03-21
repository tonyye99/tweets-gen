<script setup lang="ts">
const loading = ref(true)
const supabase = useSupabaseAuthClient()
const router = useRouter()
const route = useRoute()

if (!route.hash.includes('access_token')) {
  router.push('/')
}

supabase.auth.onAuthStateChange((event, _session) => {
  if (event === 'SIGNED_IN') {
    router.push('/ai-contents')
  }
})
</script>

<template>
  <div v-if="loading">
    <div id="loading-screen" class="w-full h-full fixed block top-0 left-0 bg-white dark:bg-naive-black z-50">
      <span class="text-green-500 top-1/2 my-0 mx-auto block relative w-0 h-0">
        <n-spin size="large" />
      </span>
    </div>
  </div>
</template>

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const store = useAuthStore()
  if (!store.isSignedIn) {
    console.log('Not signed in shit')
    const { data } = await useFetch('/api/me')
    if (!data.value) {
      return navigateTo('/auth/sign-in')
    }
    store.setUser(data.value)
  }
})

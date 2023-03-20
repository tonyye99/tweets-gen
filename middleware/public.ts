export default defineNuxtRouteMiddleware((_to, _from) => {
  const user = useSupabaseUser()
  console.log(user)
  if (user.value) {
    return navigateTo('/')
  }
})

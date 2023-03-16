import { createGtm } from "@gtm-support/vue-gtm"

export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig()
  nuxtApp.vueApp.use(
    createGtm({
      id: config.public.google_tag_manager_id,
      defer: false,
      compatibility: false,
      enabled: true,
      debug: !config.public.isProduction,
      loadScript: true,
      vueRouter: useRouter(),
      trackOnNextTick: false,
    })
  )
})

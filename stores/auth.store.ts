export const useAuthStore = defineStore('auth', {
  state: () => ({
    loading: false,
    model: {
      signUp: {
        email: '',
        password: '',
        confirmPassword: ''
      },
      signIn: {
        email: '',
        password: ''
      },
      reset: {
        email: ''
      }
    },
    user: null as any
  }),
  getters: {
    isSignedIn (): boolean {
      return !!this.user
    }
  },
  actions: {
    setLoading (loading: boolean) {
      this.loading = loading
    },
    setUser (user: any) {
      this.user = user
    }
  }
})

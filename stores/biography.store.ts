export const useBioStore = defineStore('bio', {
  state: () => ({
    loading: false,
    model: {
      niche: 'Software Engineer'
    },
    size: 'medium' as 'small' | 'medium' | 'large',
    rules: {
      niche: [
        { required: true, message: 'Please input your niche!', trigger: 'blur' }
      ]
    }
  }),
  actions: {
    setLoading (loading: boolean) {
      this.loading = loading
    }
  }
})

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loading: false,
        model: {
            signUp: {
                username: '',
                email: '',
                password: '',
                confirmPassword: ''
            },
            signIn: {
                email: '',
                password: ''
            },
            forgot: {
                email: ''
            },
            reset: {
                newPassword: '',
                confirmPassword: ''
            }
        },
        user: null as any,
        method: null as 'signIn' | 'signUp' | 'forgot' | 'reset' | null
    }),
    persist: true,
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
        },
        resetModel () {
            this.model = {
                signUp: {
                    username: '',
                    email: '',
                    password: '',
                    confirmPassword: ''
                },
                signIn: {
                    email: '',
                    password: ''
                },
                forgot: {
                    email: ''
                },
                reset: {
                    newPassword: '',
                    confirmPassword: ''
                }
            }
        },
        setMethod (method: 'signIn' | 'signUp' | 'forgot' | 'reset' | null) {
            this.method = method
        }
    }
})

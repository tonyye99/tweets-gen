<script setup lang="ts">
import { useNotification } from 'naive-ui'

definePageMeta({ middleware: 'auth', name: 'ai-contents' })

const user = useSupabaseUser()
const notificationStore = useNotification()
const authStore = useAuthStore()

if (authStore.method === 'signUp') {
    notificationStore.success({
        title: 'Welcome!',
        description: 'You have successfully signed up.',
        duration: 5000
    })
}

if (authStore.method === 'signIn') {
    notificationStore.success({
        title: 'Welcome back!',
        description: 'You have successfully signed in.',
        duration: 5000
    })
}

authStore.setMethod(null)
</script>

<template>
    <div>{{ user }}</div>
</template>

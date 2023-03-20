<script setup lang="ts">
definePageMeta({ middleware: 'auth', name: 'ai-contents' })
const user = useSupabaseUser()
</script>

<template>
    <div>{{ user }}</div>
</template>

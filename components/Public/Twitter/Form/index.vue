<script setup lang="ts">

const tweetStore = useTweetStore()

const resetMessages = () => {
    tweetStore.removeAllMessages()
}

const tabs = ref([
    {
        name: 'tweet',
        label: 'Tweet',
        component: defineAsyncComponent(() => import('./TweetForm.vue'))
    },
    {
        name: 'thread',
        label: 'Thread',
        component: defineAsyncComponent(() => import('./ThreadForm.vue'))
    },
    {
        name: 'bio',
        label: 'Bio',
        component: defineAsyncComponent(() => import('./BioForm.vue'))
    }
])
</script>

<template>
    <n-card class="shadow-md">
        <n-tabs class="card-tabs" :default-value="tabs[0].name" trigger="hover" size="large" type="line" animated>
            <n-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name" :tab="tab.label" @click="resetMessages">
                <component :is="tab.component" />
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

<script setup lang="ts">
import TweetForm from './TweetForm.vue'
import ThreadForm from './ThreadForm.vue'
import BioForm from './BioForm.vue'

const tweetStore = useTweetStore()
const tabs = ref([
    {
        name: 'tweet',
        label: 'Tweet',
        component: TweetForm
    },
    {
        name: 'thread',
        label: 'Thread',
        component: ThreadForm
    },
    {
        name: 'bio',
        label: 'Bio',
        component: BioForm
    }
])

const onChangeTab = (name: 'tweet' | 'thread' | 'bio') => {
    const tab = tabs.value.find((tab) => tab.name === name)
    if (tab) {
        tweetStore.removeAllMessages()
        tweetStore.changeContentType(name)
    }
}
</script>

<template>
    <n-card content-style="padding: 0 15px 0 15px;" class="shadow-md">
        <n-tabs :default-value="tabs[0].name" size="large" type="line" animated :on-update:value="onChangeTab">
            <n-tab-pane v-for="tab in tabs" :key="tab.name" :name="tab.name" :tab="tab.label" :disabled="tweetStore.isStreaming">
                <component :is="tab.component" />
            </n-tab-pane>
        </n-tabs>
    </n-card>
</template>

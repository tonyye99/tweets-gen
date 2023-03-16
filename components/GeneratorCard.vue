<script setup lang="ts">
import { storeToRefs } from "pinia"

const tweetStore = useTweetStore()
const { contentType } = storeToRefs(tweetStore)

watch(contentType, (val) => {
  if (val) {
    tweetStore.removeAllMessages()
  }
})

const contentComponents = computed(() => {
  if (contentType.value === "tweet") {
    return defineAsyncComponent(() => import("./TweetCardForm.vue"))
  } else if (contentType.value === "thread") {
    return defineAsyncComponent(() => import("./ThreadCardForm.vue"))
  } else if (contentType.value === "bio") {
    return defineAsyncComponent(() => import("./BioCardForm.vue"))
  }
})
</script>

<template>
  <n-card>
    <n-radio-group
      v-model:value="contentType"
      name="left-size"
      class="mt-5"
      :disabled="tweetStore.loading"
    >
      <n-radio-button value="tweet"> Tweet </n-radio-button>
      <n-radio-button value="thread"> Thread </n-radio-button>
      <n-radio-button value="bio"> Bio </n-radio-button>
    </n-radio-group>
    <n-message-provider>
      <transition name="fade" mode="out-in">
        <component :is="contentComponents" />
      </transition>
    </n-message-provider>
  </n-card>
</template>

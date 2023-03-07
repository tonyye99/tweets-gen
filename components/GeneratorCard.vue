<script setup lang="ts">
import { storeToRefs } from 'pinia';

const tweetStore = useTweetStore()
const { contentType } = storeToRefs(tweetStore)

watch(contentType, (val) => {
  if (val) {
    tweetStore.removeAllMessages()
  }
})

</script>

<template>
  <n-card>
    <n-radio-group v-model:value="contentType" name="left-size" class="mt-5" :disabled="tweetStore.loading">
      <n-radio-button value="tweet">
        Tweet
      </n-radio-button>
      <n-radio-button value="thread">
        Thread
      </n-radio-button>
    </n-radio-group>
    <n-message-provider>
      <GeneratorCardForm />
    </n-message-provider>
  </n-card>
</template>
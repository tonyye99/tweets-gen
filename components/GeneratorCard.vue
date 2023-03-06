<script setup lang="ts">
import { storeToRefs } from 'pinia';

const tweetStore = useTweetStore()
const { contentType } = storeToRefs(tweetStore)

</script>

<template>
  <n-card>
    <!-- <n-thing>
      <template #header>
        <span class="font-bold">AI Tweets Generator</span>
      </template>
      <template #description>
        <div class="">
          This is a tool that generates tweets and threads ideas based on the topic you
          enter and is built using the OpenAI gpt-3.5-turbo model.
        </div>
      </template>
    </n-thing> -->
    <n-radio-group v-model:value="contentType" name="left-size" class="mt-5">
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
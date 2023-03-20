<script setup lang="ts">
import { useGtm } from '@gtm-support/vue-gtm'
import { FormInst, useMessage } from 'naive-ui'
import { storeToRefs } from 'pinia'

const tweetStore = useTweetStore()
const message = useMessage()
const gtm = useGtm()
const { model, loading, size } = storeToRefs(tweetStore)
const formRef = ref<FormInst | null>(null)

const removeMessages = () => {
  tweetStore.removeAllMessages()
}

const handleGenerate = () => {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      message.error('Please fill in the required fields')
      return
    }
    gtm?.trackEvent({
      event: 'GenerateTweet',
      label: tweetStore.contentType,
      value: model.value.tweet.topic
    })

    if (tweetStore.messages.length > 0) {
      tweetStore.addMessage({
        role: 'user',
        content: tweetStore.tweetUserContent
      })
    } else {
      tweetStore.setMessage([
        ...tweetStore.tweetModelInstructions,
        {
          role: 'user',
          content: tweetStore.tweetUserContent
        }
      ])
    }

    try {
      const result = await tweetStore.generate()
      if (result) {
        message.success('Your tweet is ready!')
      }
    } catch (e: any) {
      message.error(e.message)
    }
  })
}
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :model="model.tweet"
      :disabled="loading"
      :rules="tweetStore.validations.tweet"
      :size="size"
      label-placement="top"
      class="mt-5"
    >
      <n-grid responsive="screen">
        <n-form-item-gi :span="24" label="Topic" path="topic">
          <n-input
            v-model:value="model.tweet.topic"
            :placeholder="tweetStore.randomPlaceholder"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Tone">
          <n-select
            v-model:value="model.tweet.mood"
            :options="tweetStore.toneOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Additional">
          <n-checkbox
            v-model:checked="model.tweet.isEmoji"
            checked-value="that contains emoticons"
            unchecked-value="with no emoticons"
          >
            Emoji
          </n-checkbox>
          <n-checkbox
            v-model:checked="model.tweet.isHashTags"
            checked-value="that contains HashTags"
            unchecked-value="and no HashTags"
          >
            HashTags
          </n-checkbox>
          <n-checkbox
            v-model:checked="model.tweet.isQuestion"
            @click="removeMessages"
          >
            Question
          </n-checkbox>
        </n-form-item-gi>
        <n-form-item-gi />
        <n-gi :span="24">
          <n-button
            type="primary"
            :disabled="loading"
            class="bg-twitter-blue"
            @click="handleGenerate"
          >
            Generate Tweet
          </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

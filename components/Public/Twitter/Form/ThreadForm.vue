<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { FormInst, useMessage } from 'naive-ui'
import { useGtm } from '@gtm-support/vue-gtm'

const tweetStore = useTweetStore()
const message = useMessage()
const gtm = useGtm()
const { model, loading, size } = storeToRefs(tweetStore)
const formRef = ref<FormInst | null>(null)

const handleUpdateValue = () => {
  tweetStore.removeAllMessages()
}

const handleGenerate = () => {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      message.error('Please fill in the required fields')
      return
    }

    gtm?.trackEvent({
      event: 'GenerateThread',
      label: tweetStore.contentType,
      value: model.value.thread.topic
    })

    if (tweetStore.messages.length > 0) {
      tweetStore.addMessage({
        role: 'user',
        content: tweetStore.threadUserContent
      })
    } else {
      tweetStore.setMessage([
        ...tweetStore.threadModelInstructions,
        {
          role: 'user',
          content: tweetStore.threadUserContent
        }
      ])
    }

    try {
      const result = await tweetStore.generate()
      if (result) {
        message.success('Your thread is ready!')
      }
    } catch (e: any) {
      message.error(e.message)
    }
  })
}
</script>

<template>
  <div>
    <n-form ref="formRef" :model="model.thread" :disabled="loading" :rules="tweetStore.validations.thread" :size="size"
      label-placement="top" class="mt-5">
      <n-grid responsive="screen">
        <n-form-item-gi :span="24" label="Topic" path="topic">
          <n-input v-model:value="model.thread.topic" :placeholder="tweetStore.randomPlaceholder" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Tone">
          <n-select v-model:value="model.thread.mood" :options="tweetStore.toneOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Additional">
          <n-checkbox v-model:checked="model.thread.isEmoji" checked-value="that contains emoticons"
            unchecked-value="with no emoticons">
            Emoji
          </n-checkbox>
          <n-checkbox v-model:checked="model.thread.isHashTags" checked-value="that contains HashTags"
            unchecked-value="and no HashTags">
            HashTags
          </n-checkbox>
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Only Hook">
          <n-switch v-model:value="model.thread.onlyHook" @update:value="handleUpdateValue" />
        </n-form-item-gi>
        <n-gi :span="24">
          <n-button type="primary" round :disabled="loading" @click="handleGenerate">
            Generate Thread
          </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<style scoped></style>

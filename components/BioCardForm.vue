<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { FormInst, useMessage } from 'naive-ui'
import { useGtm } from '@gtm-support/vue-gtm'

const tweetStore = useTweetStore()
const message = useMessage()
const gtm = useGtm()
const { model, loading, size } = storeToRefs(tweetStore)
const formRef = ref<FormInst | null>(null)

const handleGenerate = () => {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      message.error('Please fill in the required fields')
      return
    }
    gtm?.trackEvent({
      event: 'GenerateTwitterBio',
      label: tweetStore.contentType,
      value: model.value.bio.niche
    })

    if (tweetStore.messages.length > 0) {
      tweetStore.addMessage({
        role: 'user',
        content: tweetStore.bioUserContent
      })
    } else {
      tweetStore.setMessage([
        ...tweetStore.bioModelInstructions,
        {
          role: 'user',
          content: tweetStore.bioUserContent
        }
      ])
    }

    try {
      const result = await tweetStore.generate()
      if (result) {
        message.success('Your twitter bio is ready!')
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
      :model="model.bio"
      :disabled="loading"
      :rules="tweetStore.validations.bio"
      :size="size"
      label-placement="top"
      class="mt-5"
    >
      <n-grid responsive="screen">
        <n-form-item-gi :span="24" label="Niche" path="niche">
          <n-select
            v-model:value="model.bio.niche"
            placeholder="Select your niche (Input and enter to create a new one)"
            filterable
            multiple
            tag
            :options="model.bio.nicheOptions"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Your Goal" path="goal">
          <n-input
            v-model:value="model.bio.goal"
            placeholder="Enter your goal, e.g. 'To help people start their own business'"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Additional">
          <n-checkbox
            v-model:checked="model.bio.emojis"
            checked-value="that contains emoticons"
            unchecked-value="with no emoticons"
          >
            Emoji
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
            Generate Bio
          </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<style scoped></style>

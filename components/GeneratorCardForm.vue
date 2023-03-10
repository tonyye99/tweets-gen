<script setup lang="ts">
import { useGtm } from "@gtm-support/vue-gtm";
import { FormInst, useMessage } from "naive-ui";
import { storeToRefs } from "pinia";

const message = useMessage();
const tweetStore = useTweetStore();
const gtm = useGtm();
const { model, loading, size, contentType } = storeToRefs(tweetStore);
const formRef = ref<FormInst | null>(null);

const handleGenerate = () => {
  formRef.value?.validate(async (errors: any) => {
    if (errors) {
      message.error("Please fill in the required fields");
      return;
    }
    gtm?.trackEvent({
      event: "GenerateTweet",
      label: tweetStore.contentType,
      value: model.value.topic,
    });
    tweetStore.setLoading(true);

    if (tweetStore.messages.length > 0) {
      tweetStore.addMessage({
        role: "user",
        content: tweetStore.userContent,
      });
    } else {
      tweetStore.setMessage([
        ...tweetStore.modelInstructions,
        {
          role: "user",
          content: tweetStore.userContent,
        },
      ]);
    }

    const { data, pending, error } = await useFetch("/api/generate", {
      method: "POST",
      body: [...tweetStore.messages],
      pick: ["status", "content"],
    });

    tweetStore.setLoading(pending.value);

    if (data.value?.status === 429) {
      tweetStore.removeLastMessage();
      message.error("Hold up! You have reached the limit. Please try again later.");
      return;
    }

    if (data.value?.status === 200 && data.value?.content) {
      tweetStore.addMessage({
        role: "assistant",
        content: data.value?.content,
      });
      if (tweetStore.contentType === "thread") {
        tweetStore.setThread(data.value?.content);
        message.success("Your thread is ready!");
        return;
      }
      tweetStore.setTweet(data.value?.content);
      message.success("Your tweet is ready!");
    }

    if (error.value) {
      console.log(error.value);
      tweetStore.removeAllMessages();
      message.error("Something went wrong, please try again later");
    }
  });
};

const handleUpdateValue = () => {
  tweetStore.removeAllMessages()
}
</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :model="model"
      :disabled="loading"
      :rules="tweetStore.rules"
      :size="size"
      label-placement="top"
      class="mt-5"
    >
      <n-grid responsive="screen">
        <n-form-item-gi :span="24" label="Topic" path="topic">
          <n-input
            v-model:value="model.topic"
            :placeholder="tweetStore.randomPlaceholder"
          />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Tone">
          <n-select v-model:value="model.mood" :options="tweetStore.toneOptions" />
        </n-form-item-gi>
        <n-form-item-gi :span="24" label="Additional">
          <n-checkbox
            checked-value="that contains emoticons"
            unchecked-value="with no emoticons"
            v-model:checked="model.isEmoji"
          >
            Emoji
          </n-checkbox>
          <n-checkbox
            checked-value="that contains HashTags"
            unchecked-value="and no HashTags"
            v-model:checked="model.isHashTags"
          >
            HashTags
          </n-checkbox>
        </n-form-item-gi>
        <n-form-item-gi v-if="contentType === 'thread'" :span="24" label="Only Hook">
          <n-switch v-model:value="model.onlyHook" @update:value="handleUpdateValue" />
        </n-form-item-gi>
        <n-gi :span="24">
          <n-button
            type="primary"
            :disabled="loading"
            class="bg-twitter-blue"
            @click="handleGenerate"
          >
            Generate
          </n-button>
        </n-gi>
      </n-grid>
    </n-form>
  </div>
</template>

<script setup lang="ts">
import { useGtm } from "@gtm-support/vue-gtm";
import { FormInst, useMessage } from "naive-ui";
import { storeToRefs } from "pinia";
// @ts-ignore
import { SSE } from "sse";

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

    tweetStore.setLoading(true);

    const events = new SSE("api/stream", {
      method: "POST",
      payload: JSON.stringify([...tweetStore.messages]),
    });

    events.addEventListener("open", function (e: any) {
      tweetStore.removeTweet();
      tweetStore.setLoading(false);
    });

    events.addEventListener("message", function (e: any) {
      if (e.data !== "[DONE]") {
        const data = JSON.parse(e.data);
        if (data.choices[0].delta.content) {
          if (tweetStore.contentType === "thread") {
            tweetStore.streamThread(data.choices[0].delta.content);
            return;
          }
          tweetStore.streamTweet(data.choices[0].delta.content);
        }
      }
      if (e.data === "[DONE]") {
        message.success("Your tweet is ready!");
        tweetStore.addMessage({
          role: "assistant",
          content: tweetStore.tweet,
        });
      }
    });

    events.stream();

    events.addEventListener("error", function (e: any) {
      tweetStore.removeAllMessages();
      tweetStore.removeTweet();
      tweetStore.setLoading(false);
      if (e.data === "TOO_MANY_REQUEST") {
        message.error("Too many requests, please try again later");
        return;
      }
      message.error(e.data || "Something went wrong, please try again later");
    });
  });
};

const handleUpdateValue = () => {
  tweetStore.removeAllMessages();
};
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

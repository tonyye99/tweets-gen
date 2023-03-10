<script setup lang="ts">
import Heart12Regular from "@vicons/fluent/Heart12Regular";
import Chat12Regular from "@vicons/fluent/Chat12Regular";
import BarChartSharp from "@vicons/material/BarChartSharp";
import LoopRound from "@vicons/material/LoopRound";
import LogoTwitter from "@vicons/ionicons4/LogoTwitter";

const tweetStore = useTweetStore();

const tweet = computed(() => tweetStore.tweet);

const loading = computed(() => tweetStore.loading);

const thread = ref(null);

const tweetActions = [
  {
    icon: Chat12Regular,
    color: "#1881C9",
    type: "chat",
    count: `${Math.floor(Math.random() * 100)}k`,
  },
  {
    icon: LoopRound,
    color: "#027D54",
    type: "retweet",
    count: `${Math.floor(Math.random() * 100)}k`,
  },
  {
    icon: Heart12Regular,
    color: "#A81257",
    type: "like",
    count: `${Math.floor(Math.random() * 100)}k`,
  },
  {
    icon: BarChartSharp,
    color: "#1881C9",
    type: "statistics",
    count: `${Math.floor(Math.random() * 100)}k`,
  },
];

const today = computed(() => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes().toString().padStart(2, "0");
  const month = date.toLocaleString("default", { month: "short" });
  const day = date.getDate();
  const year = date.getFullYear();

  return `${hours}:${minutes} AM · ${month} ${day}, ${year}`;
});

const shareTweet = () => {
  const url = `https://twitter.com/intent/tweet?text=${tweet.value}`;
  window.open(url, "_blank");
};

const tweetFormatter = (tweet: string) => {
  return tweet?.replace(/"/g, "").replace(/(\r\n|\n|\r)/gm, "<br>");
};

watch(loading, (val) => {
  if (val === false) {
    thread.value?.scrollIntoView({ behavior: "smooth" });
  }
});
</script>

<template>
  <n-card class="bg-gradient-to-r from-blue-300 to-blue-400 max-h-[30rem] overflow-auto">
    <div ref="thread" class="flex items-center justify-center h-full">
      <n-spin :show="loading">
        <div
          class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-full"
        >
          <div class="flex justify-between">
            <div class="flex items-center">
              <n-avatar round :size="48">A</n-avatar>
              <div class="ml-1.5 text-sm leading-tight">
                <span class="text-black dark:text-white font-bold block">Anonymous</span>
                <span class="text-gray-500 dark:text-gray-400 font-normal block"
                  >@anon</span
                >
              </div>
            </div>
            <n-button quaternary circle type="primary" @click="shareTweet">
              <template #icon>
                <n-icon :size="20">
                  <LogoTwitter />
                </n-icon>
              </template>
            </n-button>
          </div>
          <p class="text-black dark:text-white block text-xl leading-snug mt-3">
            <span v-html="tweetStore.formattedTweet"></span>
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">
            {{ today }}
          </p>
          <div class="border-gray-200 border border-b-0 my-1"></div>
          <div class="text-gray-500 dark:text-gray-400 flex mt-3 gap-3">
            <div
              v-for="action in tweetActions"
              :key="action.type"
              class="flex items-center"
            >
              <n-icon size="20" :color="action.color">
                <component :is="action.icon" />
              </n-icon>
              <span class="ml-1" :style="{ color: action.color }">{{
                action.count
              }}</span>
            </div>
          </div>
        </div>
        <div v-if="tweetStore.contentType === 'thread' && tweetStore.thread.length > 0 && !tweetStore.model.onlyHook">
          <ul role="list" class="space-y-3 mt-5">
            <li
              v-for="(tweet, idx) in tweetStore.thread"
              :key="idx"
              class="overflow-hidden text-xl bg-white dark:bg-gray-800 dark:text-white px-4 py-4 shadow sm:rounded-md sm:px-6"
            >
              <span v-html="tweetFormatter(tweet)"></span>
              <div class="border-gray-200 border border-b-0 my-1"></div>
              <div class="text-sm text-gray-500 dark:text-gray-400 flex mt-3 gap-3">
                <div
                  v-for="action in tweetActions"
                  :key="action.type"
                  class="flex items-center"
                >
                  <n-icon size="20" :color="action.color">
                    <component :is="action.icon" />
                  </n-icon>
                  <span class="ml-1" :style="{ color: action.color }">
                    {{ action.count }}
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <template #description>
          <span class="text-center text-lg text-black font-bold">Generating...</span>
        </template>
      </n-spin>
    </div>
  </n-card>
</template>

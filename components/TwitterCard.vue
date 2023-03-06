<script setup>
import { NCard, NSpin, NIcon, NButton, NAvatar } from 'naive-ui'
import Heart12Regular from '@vicons/fluent/Heart12Regular'
import Chat12Regular from '@vicons/fluent/Chat12Regular'
import BarChartSharp from '@vicons/material/BarChartSharp'
import LoopRound from '@vicons/material/LoopRound'
import { LogoTwitter } from '@vicons/ionicons4'

const tweetStore = useTweetStore()

const tweet = computed(() => tweetStore.tweet)

const loading = computed(() => tweetStore.loading)

const tweetActions = [
  {
    icon: Chat12Regular,
    color: "#1881C9",
    type: 'chat',
    count: `${Math.floor(Math.random() * 100)}k`
  },
  {
    icon: LoopRound,
    color: "#027D54",
    type: 'retweet',
    count: `${Math.floor(Math.random() * 100)}k`
  },
  {
    icon: Heart12Regular,
    color: "#A81257",
    type: 'like',
    count: `${Math.floor(Math.random() * 100)}k`
  },
  {
    icon: BarChartSharp,
    color: "#1881C9",
    type: 'statistics',
    count: `${Math.floor(Math.random() * 100)}k`
  },
]

const today = computed(() => {
  const date = new Date()
  const hours = date.getHours()
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const month = date.toLocaleString('default', { month: 'short' })
  const day = date.getDate()
  const year = date.getFullYear()

  return `${hours}:${minutes} AM · ${month} ${day}, ${year}`
})

const shareTweet = () => {
  const url = `https://twitter.com/intent/tweet?text=${tweet.value}`
  window.open(url, '_blank')
}
</script>

<template>
  <n-card class="bg-gradient-to-r from-blue-300 to-blue-400 max-h-[30rem] overflow-auto">
    <div class="flex items-center justify-center h-full">
      <n-spin :show="loading">
        <div v-if="tweetStore.contentType === 'tweet'"
          class="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-800 p-4 rounded-xl border w-full ">
          <div class="flex justify-between">
            <div class="flex items-center">
              <n-avatar round :size="48">A</n-avatar>
              <div class="ml-1.5 text-sm leading-tight">
                <span class="text-black dark:text-white font-bold block ">Annonymous</span>
                <span class="text-gray-500 dark:text-gray-400 font-normal block">@anon</span>
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
            {{ tweet }}
          </p>
          <p class="text-gray-500 dark:text-gray-400 text-base py-1 my-0.5">{{ today }}</p>
          <div class="border-gray-200 border border-b-0 my-1"></div>
          <div class="text-gray-500 dark:text-gray-400 flex mt-3 gap-3">
            <div v-for="action in tweetActions" :key="action.type" class="flex items-center">
              <n-icon size="20" :color="action.color">
                <component :is="action.icon" />
              </n-icon>
              <span class="ml-1" :style="{ color: action.color }">{{ action.count }}</span>
            </div>
          </div>
        </div>
        <div v-if="tweetStore.contentType === 'thread'">
          <div v-if="!tweetStore.thread"
            class="overflow-hidden bg-white dark:bg-gray-800 dark:text-white px-4 py-4 shadow sm:rounded-md sm:px-6">
            Thread idea will be shown here. Remember to humanize your thread because robot tweets are boring 😉.
          </div>
          <ul v-else role="list" class="space-y-3">
            <li v-for="(tweet, idx) in tweetStore.formattedThread" :key="idx"
              class="overflow-hidden bg-white dark:bg-gray-800 dark:text-white px-4 py-4 shadow sm:rounded-md sm:px-6">
              {{ tweet }}
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
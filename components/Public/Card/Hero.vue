<script setup lang="ts">
import FacebookFilled from "@vicons/antd/FacebookFilled";
import TwitterCircleFilled from "@vicons/antd/TwitterCircleFilled";
</script>

<template>
  <div class="isolate overflow-hidden">
    <section class="relative isolate overflow-hidden px-6 py-24 sm:px-24">
      <div class="mx-auto max-w-3xl text-center">
        <h1
          class="animate-text mb-5 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent text-4xl font-extrabold leading-tight md:text-5xl lg:text-6xl lg:leading-tight">
          Generate Compelling Tweets using AI.
        </h1>
        <p class="text-lg mt-1 font-normal text-gray-500 lg:text-xl sm:px-16 dark:text-gray-400">
          TweetGen is a free tool that allows you to generate the best human-like tweets and threads ideas with AI and is
          built using the
          OpenAI's <a
            class="font-bold animate-text bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent"
            href="https://platform.openai.com/docs/guides/chat" target="_blank">gpt-3.5-turbo model</a>.
        </p>
      </div>
      <div class="mx-auto max-w-2xl sm:mt-20 lg:mt-10 lg:max-w-7xl z-10">
        <!-- <div class="flex items-center justify-center">
          <n-radio-group name="left-size" class="mt-5">
            <n-radio-button value="thread">
              <div class="flex items-center gap-2">
                <n-icon :size="18" :component="TwitterCircleFilled" />
                Twitter
              </div>
            </n-radio-button>
            <n-radio-button value="tweet">
              <div class="flex items-center gap-2">
                <n-icon :size="18" :component="FacebookFilled" />
                Facebook
              </div>
            </n-radio-button>
          </n-radio-group>
        </div> -->
        <div class="flex flex-col lg:flex-row gap-3 sm:p-5 w-full lg:h-[34rem] mt-5">
          <PublicTwitter />
        </div>
      </div>
    </section>
  </div></template>

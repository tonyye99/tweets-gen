<script setup lang="ts">
import { storeToRefs } from 'pinia'

const tweetStore = useTweetStore()
const { bio } = storeToRefs(tweetStore)
</script>

<template>
  <div class="relative bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
    <div
      class="absolute top-0 left-0 right-0 bottom-0 bg-cover bg-center h-[40%] rounded-t-lg bg-gray-200 dark:bg-gray-600"
    />
    <div class="relative">
      <div class="flex justify-start">
        <n-avatar
          round
          :size="90"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
        />
      </div>
    </div>
    <div class="mt-5">
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-bold">
            Jane
          </h2>
          <p class="text-gray-600 dark:text-gray-400">
            @jane
          </p>
        </div>
        <div>
          <n-button
            tertiary
            round
            type="primary"
            class="bg-gray-100 dark:bg-gray-700"
          >
            Follow
          </n-button>
        </div>
      </div>

      <p class="mt-2 text-base">
        {{ bio }}
      </p>
      <div class="mt-4 flex items-center gap-3">
        <div class="flex items-center gap-1">
          <span class="font-semibold">800</span>
          <span>Following</span>
        </div>
        <div class="flex items-center gap-1">
          <span class="font-semibold">800</span>
          <span>Followers</span>
        </div>
      </div>
    </div>
  </div>
</template>

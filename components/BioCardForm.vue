<script setup lang="ts">
import { storeToRefs } from 'pinia'

const bioStore = useBioStore()
const { model, loading, size } = storeToRefs(bioStore)

const handleGenerate = () => {
}

</script>

<template>
  <div>
    <n-form
      ref="formRef"
      :model="model"
      :disabled="loading"
      :rules="bioStore.rules"
      :size="size"
      label-placement="top"
      class="mt-5"
    >
      <n-grid responsive="screen">
        <n-form-item-gi :span="24" label="Niche">
          <n-input
            v-model:value="model.niche"
            placeholder="Enter your niche, e.g. 'Entrepreneurship'"
          />
        </n-form-item-gi>
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

<style scoped>

</style>

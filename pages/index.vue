<script setup lang="ts">
import { useGtag } from "vue-gtag-next";

const { pageview } = useGtag();

const track = () => {
  pageview({
    page_title: "Home",
    page_location: window.location.href,
    page_path: window.location.pathname,
  });
};

onMounted(() => {
  track();
});
</script>

<template>
  <div class="flex flex-col items-center justify-center">
    <Hero />
    <div class="flex flex-col lg:flex-row gap-3 p-5 w-full lg:w-2/3 mb-10">
      <GeneratorCard />
      <TwitterCard />
    </div>
  </div>
</template>

<style>
body {
  font-family: 'Lato', sans-serif;
}
</style>
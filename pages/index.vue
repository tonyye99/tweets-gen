<template>
  <div class="flex flex-col items-center justify-center">
    <Hero />
    <div class="flex flex-col lg:flex-row gap-3 p-5 w-full lg:w-2/3 mb-10">
      <GeneratorCard />
      <TwitterCard />
    </div>
    <p class="text-sm p-5 w-full lg:w-2/3 mb-10 dark:text-white">
      <n-alert title="Good To Know" type="info">
        Please note that tweets generated by our app are powered by the GPT-3 language model, which uses advanced algorithms to generate human-like text. However, there may be instances where the output is not accurate or exceeds the character limit of Twitter. We advise reviewing your tweets before posting to ensure they comply with Twitter guidelines.  Also do not hesitate to add your own flair and be human!
      </n-alert>
    </p>
  </div>
</template>

<style>
body {
  font-family: "Lato", sans-serif;
}
</style>

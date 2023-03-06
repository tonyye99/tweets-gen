// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({

  nitro: {
    preset: "netlify-edge"
  },

  app: {
    head: {
      title: "Tweet GPT",
      link: [
        {
          rel: "preconnect",
          href: "https://fonts.googleapis.com",
        },
        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap",
        },
      ],
    },
  },

  modules: ["@pinia/nuxt", "@nuxtjs/color-mode"],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },

  imports: {
    dirs: ["stores"],
  },

  css: ["~/assets/css/main.css"],

  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  colorMode: { classSuffix: "" },

  runtimeConfig: {
    upstashRedisApiUrl: process.env.UPSTASH_REDIS_API_URL,
    upstashRedisToken: process.env.UPSTASH_REDIS_TOKEN,
    openaiApiKey: process.env.OPENAI_API_KEY,
  }
});

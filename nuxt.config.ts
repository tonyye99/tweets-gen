import { isProduction } from 'std-env'

export default defineNuxtConfig({

    app: {
        head: {
            title: 'TweetsGen',
            meta: [
                { charset: 'utf-8' },
                {
                    name: 'viewport',
                    content: 'width=device-width, initial-scale=1'
                },
                {
                    hid: 'description',
                    name: 'description',
                    content:
            'TweetGen is a free tool that allows you to generate the best human-like tweets and threads ideas with AI'
                },
                {
                    hid: 'og:title',
                    property: 'og:title',
                    content: 'TweetsGen'
                },
                {
                    hid: 'og:description',
                    property: 'og:description',
                    content:
            'TweetGen is a free tool that allows you to generate the best human-like tweets and threads ideas with AI'
                },
                {
                    hid: 'og:image',
                    property: 'og:image',
                    content: 'https://tweetsgen.com/og-image.png'
                },
                {
                    hid: 'og:url',
                    property: 'og:url',
                    content: 'https://tweetsgen.com'
                },
                {
                    hid: 'og:site_name',
                    property: 'og:site_name',
                    content: 'TweetsGen'
                },
                {
                    hid: 'og:type',
                    property: 'og:type',
                    content: 'website'
                },
                {
                    hid: 'twitter:card',
                    name: 'twitter:card',
                    content: 'summary_large_image'
                },
                {
                    hid: 'twitter:site',
                    name: 'twitter:site',
                    content: '@tweetsgen'
                },
                {
                    hid: 'twitter:creator',
                    name: 'twitter:creator',
                    content: '@tweetsgen'
                },
                {
                    hid: 'twitter:title',
                    name: 'twitter:title',
                    content: 'TweetsGen'
                },
                {
                    hid: 'twitter:description',
                    name: 'twitter:description',
                    content: 'Generate tweets and threads with AI'
                },
                {
                    hid: 'twitter:image',
                    name: 'twitter:image',
                    content: 'https://tweetsgen.com/og-image.png'
                }
            ],
            link: [
                {
                    rel: 'preconnect',
                    href: 'https://fonts.googleapis.com'
                },
                {
                    rel: 'preconnect',
                    href: 'https://fonts.gstatic.com',
                    crossorigin: 'anonymous'
                },
                {
                    rel: 'stylesheet',
                    href: 'https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700&display=swap'
                }
            ]
        },
        pageTransition: {
            name: 'page',
            mode: 'out-in'
        },
    },

    modules: [
        '@pinia/nuxt',
        '@nuxtjs/color-mode',
        '@nuxtjs/eslint-module',
        '@nuxtjs/robots',
        '@pinia-plugin-persistedstate/nuxt'
    ],

    pinia: {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']]
    },

    imports: {
        dirs: ['stores']
    },

    css: ['~/assets/css/main.css'],

    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {}
        }
    },

    robots: {
        rules: {
            'User-Agent': '*',
            Disallow: ''
        }
    },

    colorMode: { classSuffix: '' },

    runtimeConfig: {
        upstashRedisApiUrl: process.env.UPSTASH_REDIS_API_URL,
        upstashRedisToken: process.env.UPSTASH_REDIS_TOKEN,
        openaiApiKey: process.env.OPENAI_API_KEY,
        public: {
            isProduction,
            google_tag_manager_id: process.env.GOOGLE_TAG_MANAGER_ID
        }
    }
})

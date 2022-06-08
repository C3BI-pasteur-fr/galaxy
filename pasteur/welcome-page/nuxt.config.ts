import { defineNuxtConfig } from 'nuxt'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
    ssr: false,
    app: {
        buildAssetsDir: "/static/_nuxt/",
    },
    modules: ['@nuxt/content'],
    content: {
        // https://content.nuxtjs.org/api/configuration

    }
})

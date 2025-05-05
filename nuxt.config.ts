// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  ssr: false,

  modules: [
    '@nuxt/ui',
    '@nuxt/eslint',
    'nuxt-pglite',
    '@vueuse/nuxt',
  ],

  css: ['~/assets/css/main.css'],

  future: {
    compatibilityVersion: 4,
  },

  eslint: {
    config: {
      standalone: false,
    },
  },

  pglite: {
    client: {
      extensions: ['live'],
      options: {
        dataDir: 'memory://app-db',
        // dataDir: 'opfs-ahp://app-db',
        // dataDir: 'idb://app-db',
      },
    },
  },

  pages: {
    pattern: ['**/*.vue', '!**/*.spec.*', '!components/**.*'],
  },

  compatibilityDate: '2025-04-27',
})

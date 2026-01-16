// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  css: ['@/assets/css/dark-mode.css'],
  pages:true,
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
    "@nuxtjs/color-mode",
  ],
  tailwindcss: {
    viewer: true,
    // config: {
    //   darkMode: 'class',
    // }
  },
  colorMode:{
    preference: 'light', // default value of $colorMode.preference
    fallback: 'light', // fallback value if no system preference found
    dataValue:"theme",
    classPrefix: '',
    classSuffix: '',
    storageKey: 'nuxt-color-mode'
  }
});
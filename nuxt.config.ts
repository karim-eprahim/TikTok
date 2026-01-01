// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  // css: ['@/assets/css/tailwind.css'],
  pages:true,
  compatibilityDate: "2025-05-15",
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxt/icon",
    "@nuxtjs/color-mode",
    "@pinia/nuxt",
    "pinia-plugin-persistedstate/nuxt",
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
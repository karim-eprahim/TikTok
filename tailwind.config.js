// tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
darkMode: ['class', '[data-theme="dark"]'],
    content: [
      './components/**/*.{vue,js,ts}',
      './layouts/**/*.vue',
      './pages/**/*.vue',
      './plugins/**/*.{js,ts}',
      './nuxt.config.{js,ts}',
      './app.vue',
    ],
    theme: {
      extend: {},
    },
    plugins: [],
  }
  
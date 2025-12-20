import Toast, { useToast } from 'vue-toastification'
import 'vue-toastification/dist/index.css'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Toast, {
    // You can add your options here
    timeout: 2000,
    // closeOnClick: true,
    // pauseOnFocusLoss: true,
    // pauseOnHover: true,
    // draggable: true,
    // draggablePercent: 0.6,
    // showCloseButtonOnHover: false,
    // hideProgressBar: false,
    // closeButton: "button",
    // icon: true,
    // rtl: false
  })
  nuxtApp.provide('toast', useToast())
})

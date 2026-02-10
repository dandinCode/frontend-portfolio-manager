import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

import { createPinia } from 'pinia'
import Vue3Toastify from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import '@mdi/font/css/materialdesignicons.css'

const vuetify = createVuetify({
  components,
  directives,
})

const pinia = createPinia()

const app = createApp(App)

app.use(pinia).use(router).use(vuetify).use(Vue3Toastify, {
  autoClose: 3000,
  position: 'top-right',
  theme: 'dark',
  hideProgressBar: false,
})

app.mount('#app')

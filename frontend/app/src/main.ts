import { createPinia } from 'pinia'
import { createApp } from 'vue'
import { PromiseDialog } from 'vue3-promise-dialog'
import App from './App.vue'
import router from './router'

const pinia = createPinia()
const app = createApp(App);
app.use(pinia)
// app.use(PromiseDialog)
app.use(router).mount('#app')
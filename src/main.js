import { createApp } from 'vue'
import App from './App.vue'
import { AppRouter } from './router/router'

const app = createApp(App).use(AppRouter)
app.mount('#app')

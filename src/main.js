import { createApp } from 'vue'
import App from './App.vue'
import { AppRouter } from './router/router'

import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"

const app = createApp(App).use(AppRouter)
app.mount('#app')

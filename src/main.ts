import './assets/main.css'
// commit test
import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import pb from './composables/usePocketbase'
import App from './App.vue'
import routes from './routes'

let router = createRouter({
    routes,
    history: createWebHistory()
})

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth && !pb.authStore.isValid) {
        router.push("/");
        return false;
    } else {
      next();
    }
    return true;
})

let app = createApp(App)

app.use(router)

app.mount('#app')

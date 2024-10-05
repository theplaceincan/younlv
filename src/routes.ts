import Home from "./views/Home.vue";
import Register from "./views/Register.vue";

const routes = [
    { path: '/', component: Home },
    { path: '/register', component: Register },
];

export default routes;

// meta: { requiresAuth: true }
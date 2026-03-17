import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
import LoginView from "@/views/loginView.vue";
import HomeView from "@/views/homeView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: LoginView },
        { path: "/home", component: HomeView, meta: { requiresAuth: true } }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.loggedIn) {
        next("/");
        return;
    }
    if (to.path === "/" && authStore.loggedIn) {
        next("/home");
        return;
    }
    next();
});

export default router;
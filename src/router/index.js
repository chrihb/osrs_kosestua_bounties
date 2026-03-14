import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
import LoginView from "@/views/loginView.vue";
import HomeView from "@/views/homeView.vue";
import App from "@/App.vue";

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: "/",
            component: App,
            children: [
                { path: "", component: LoginView },
                { path: "home", component: HomeView, meta: { requiresAuth: true } }
            ]
        }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.loggedIn) {
        next("/");
        return;
    }
    if ((to.path === "/" || to.path === "/osrs_kosestua_bounties/") && authStore.loggedIn) {
        next("/home");
        return;
    }
    next();
});

export default router;
import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
import LoginView from "@/views/LoginView.vue";
import HomeView from "@/views/HomeView.vue";

const router = createRouter({
    history: createWebHistory('/osrs_kosestua_bounties/'),
    routes: [
        {
            path: "/",
            component: LoginView
        },
        {
            path: "/home",
            component: HomeView,
            meta: { requiresAuth: true }
        }
    ]
});

router.beforeEach((to) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.loggedIn) {
        return { path: "/" };
    }
    if (to.path === "/" && authStore.loggedIn) {
        return { path: "/home" };
    }
});

export default router;
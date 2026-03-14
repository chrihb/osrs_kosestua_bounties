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
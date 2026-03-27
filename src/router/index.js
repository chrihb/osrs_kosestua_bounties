import { createRouter, createWebHashHistory } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
import LoginView from "@/views/loginView.vue";
import HomeView from "@/views/homeView.vue";
import RegisterView from "@/views/registerView.vue";

const router = createRouter({
    history: createWebHashHistory(),
    routes: [
        { path: "/", component: LoginView },
        { path: "/register", component: RegisterView },
        { path: "/home", component: HomeView, meta: { requiresAuth: true } },
        { path: "/:pathMatch(.*)*", redirect: "/home" }
    ]
});

router.beforeEach((to, from, next) => {
    const authStore = useAuthStore();
    if (to.meta.requiresAuth && !authStore.loggedIn) {
        next("/");
        return;
    }
    if ((to.path === "/" || to.path === "/register") && authStore.loggedIn) {
        next("/home");
        return;
    }
    next();
});

export default router;
import { defineStore } from 'pinia';

const PIN = import.meta.env.VITE_PIN;

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false
    }),
    actions: {
        login(pin) {
            if (pin === PIN) {
                this.loggedIn = true;
                return true;
            }
            return false;
        },
        logout() {
            this.loggedIn = false;
        }
    },
    getters: {
        isLoggedIn: (state) => state.loggedIn
    },
    persist: true
});
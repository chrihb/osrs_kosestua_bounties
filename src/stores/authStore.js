import { defineStore } from 'pinia';
import bcrypt from 'bcryptjs';
import { fetchUserData } from '@/services/dataService';

export const useAuthStore = defineStore('auth', {
    state: () => ({
        loggedIn: false,
        currentUser: null
    }),
    actions: {
        async login(usernameKey, pin) {
            const data = await fetchUserData();
            // handle both { players: {...} } and flat { key: {...} } shapes
            const users = data.players ?? data;
            const user = users[usernameKey];
            if (!user) return { success: false, error: 'User not found.' };

            const match = await bcrypt.compare(pin, user.pin);
            if (!match) return { success: false, error: 'Incorrect PIN.' };

            this.loggedIn = true;
            this.currentUser = { key: usernameKey, name: user.name };
            return { success: true };
        },
        logout() {
            this.loggedIn = false;
            this.currentUser = null;
        }
    },
    getters: {
        isLoggedIn: (state) => state.loggedIn
    },
    persist: true
});

import { defineStore } from 'pinia';
import { fetchUserData, saveUserData } from '../services/dataService';

export const useAuthStore = defineStore('authStore', {
    state: () => ({
        loggedIn: false,
        loggedInPlayer: null,
        players: null
    }),
    actions: {
        async loadFromRemote() {
            const data = await fetchUserData();
            var playersObject = data[0];
            this.players = playersObject;
        },
        login(playerKey) {
            this.loggedIn = true;
            this.loggedInPlayer = playerKey; 

        },
        logout() {
            this.loggedIn = false;
            this.loggedInPlayer = null;
        },
        async createUser(data) {
            await saveUserData(data);
        }
    },
    getters: {
        isLoggedIn: (state) => state.loggedIn,
        hasPlayers: (state) => state.players != null
    },
    persist: true
});
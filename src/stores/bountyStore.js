import { defineStore } from 'pinia';
import { fetchBountyData, saveBountyData } from '../services/dataService';

const CACHE_DURATION_MS = 3 * 60 * 1000; // 5 minutes

export const useBountyStore = defineStore('bountyStore', {
    state: () => ({
        bounties: {},
        activeBounties: [],
        players: {},
        lastFetched: null
    }),
    actions: {
        async loadFromRemote(force = false) {
            const now = Date.now();
            const cacheExpired = !this.lastFetched || (now - this.lastFetched) > CACHE_DURATION_MS;

            if (!force && !cacheExpired) return;

            const data = await fetchBountyData();
            this.bounties = data.bounties;
            this.activeBounties = data.activeBounties;
            this.players = data.players;
            this.lastFetched = now;
        },
        async saveToRemote() {
            await saveBountyData({
                bounties: this.bounties,
                activeBounties: this.activeBounties,
                players: this.players
            });
            this.lastFetched = Date.now();
        },
        // ... rest of actions unchanged
    },
    persist: true
});
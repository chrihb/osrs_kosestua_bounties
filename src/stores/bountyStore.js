import { defineStore } from 'pinia';
import { fetchBountyData, saveBountyData } from '../services/dataService';


const CACHE_DURATION_MS = 5 * 60 * 1000;

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
        rollBounty() {
            const activeKeys = this.activeBounties.map(b => b.key);
            const available = Object.entries(this.bounties)
                .filter(([key, bounty]) => !activeKeys.includes(key) && !bounty.completed)
                .map(([key, bounty]) => ({ key, ...bounty }));
            if (available.length === 0) return;
            const random = available[Math.floor(Math.random() * available.length)];
            this.activeBounties.push(random);
            this.saveToRemote();
        },
        addBounty(key, title, desc, points = 1) {
            if (this.bounties[key]) return;
            this.bounties[key] = { title, desc, points, completed: false };
            this.saveToRemote();
        },
        claimBounty(playerKey, bountyKey) {
            const player = this.players[playerKey];
            if (!player) return;
            const bounty = this.bounties[bountyKey];
            player.score += bounty ? bounty.points : 1;
            if (bounty) bounty.completed = true;
            this.activeBounties = this.activeBounties.filter(b => b.key !== bountyKey);
            this.saveToRemote();
        },
        addPlayer(key, name) {
            if (this.players[key]) return;
            this.players[key] = { name, score: 0 };
            this.saveToRemote();
        }
    },
    persist: true
});
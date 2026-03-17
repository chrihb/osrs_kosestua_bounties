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
        async rollBounty() {
            await this.loadFromRemote(true);
            const activeKeys = this.activeBounties.map(b => b.key);
            const available = Object.entries(this.bounties)
                .filter(([key, bounty]) => !activeKeys.includes(key) && !bounty.completed)
                .map(([key, bounty]) => ({ key, ...bounty }));
            if (available.length === 0) return;
            const random = available[Math.floor(Math.random() * available.length)];
            this.activeBounties.push(random);
            await this.saveToRemote();
        },
        async addBounty(key, title, desc, points = 1) {
            await this.loadFromRemote(true);
            if (this.bounties[key]) return;
            this.bounties[key] = { title, desc, points, completed: false };
            await this.saveToRemote();
        },
        async claimBounty(playerKey, bountyKey) {
            await this.loadFromRemote(true);
            const player = this.players[playerKey];
            if (!player) return;
            const bounty = this.bounties[bountyKey];
            player.score += bounty ? bounty.points : 1;
            if (bounty) bounty.completed = true;
            this.activeBounties = this.activeBounties.filter(b => b.key !== bountyKey);
            await this.saveToRemote();
        },
        async addPlayer(key, name) {
            await this.loadFromRemote(true);
            if (this.players[key]) return;
            this.players[key] = { name, score: 0 };
            await this.saveToRemote();
        }
    },
    persist: true
});
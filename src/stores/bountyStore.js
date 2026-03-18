import { defineStore } from 'pinia';
import { fetchBountyData, saveBountyData } from '../services/dataService';


export const useBountyStore = defineStore('bountyStore', {
    state: () => ({
        bounties: {},
        players: {}
    }),
    getters: {
        activeBounties: (state) =>
            Object.entries(state.bounties)
                .filter(([, b]) => b.active && !b.completed)
                .map(([key, b]) => ({ key, ...b }))
    },
    actions: {
        async loadFromRemote() {
            const data = await fetchBountyData();

            // Migrate old format: merge activeBounties into bounties
            if (data.activeBounties) {
                for (const ab of data.activeBounties) {
                    if (data.bounties[ab.key]) {
                        data.bounties[ab.key].active = true;
                    }
                }
            }

            this.bounties = data.bounties;
            this.players = data.players;
        },
        async saveToRemote() {
            await saveBountyData({
                bounties: this.bounties,
                players: this.players
            });
        },
        async rollBounty() {
            await this.loadFromRemote();
            const available = Object.entries(this.bounties)
                .filter(([, b]) => !b.active && !b.completed);
            if (available.length === 0) return;
            const [key] = available[Math.floor(Math.random() * available.length)];
            this.bounties[key].active = true;
            await this.saveToRemote();
        },
        async addBounty(key, title, desc, points = 1) {
            await this.loadFromRemote();
            if (this.bounties[key]) return;
            this.bounties[key] = { title, desc, points, completed: false, active: false };
            await this.saveToRemote();
        },
        async claimBounty(playerKey, bountyKey) {
            await this.loadFromRemote();
            const player = this.players[playerKey];
            if (!player) return;
            const bounty = this.bounties[bountyKey];
            player.score += bounty ? bounty.points : 1;
            if (bounty) {
                bounty.completed = true;
                bounty.active = false;
            }
            await this.saveToRemote();
        },
        async updateBounty(key, title, desc, points) {
            await this.loadFromRemote();
            const bounty = this.bounties[key];
            if (!bounty) return;
            bounty.title = title;
            bounty.desc = desc;
            bounty.points = points;
            await this.saveToRemote();
        },
        async reactivateBounty(key) {
            await this.loadFromRemote();
            const bounty = this.bounties[key];
            if (!bounty) return;
            bounty.completed = false;
            await this.saveToRemote();
        },
        async deleteBounty(key) {
            await this.loadFromRemote();
            delete this.bounties[key];
            await this.saveToRemote();
        },
        async addPlayer(key, name) {
            await this.loadFromRemote();
            if (this.players[key]) return;
            this.players[key] = { name, score: 0 };
            await this.saveToRemote();
        }
    },
    persist: true
});

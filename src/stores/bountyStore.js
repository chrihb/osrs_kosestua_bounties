import { defineStore } from 'pinia';
import { fetchBountyData, saveBountyData, fetchUserData, saveUserData } from '../services/dataService';
import bcrypt from 'bcryptjs';


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
            const [bountyData, players] = await Promise.all([fetchBountyData(), fetchUserData()]);

            // Migrate old format: merge activeBounties into bounties
            if (bountyData.activeBounties) {
                for (const ab of bountyData.activeBounties) {
                    if (bountyData.bounties[ab.key]) {
                        bountyData.bounties[ab.key].active = true;
                    }
                }
            }

            this.bounties = bountyData.bounties;
            // handle both { players: {...} } and flat { key: {...} } shapes
            this.players = players.players ?? players;
        },
        async saveToRemote() {
            await saveBountyData({ bounties: this.bounties });
        },
        async savePlayersToRemote() {
            await saveUserData(this.players);
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
        async addBounty(key, title, desc, primaryPoints = 1, secondaryPoints = 0) {
            await this.loadFromRemote();
            if (this.bounties[key]) return;
            const nextId = Math.max(0, ...Object.values(this.bounties).map(b => b.id ?? 0)) + 1;
            this.bounties[key] = { id: nextId, title, desc, primaryPoints, secondaryPoints, completed: false, active: false, pending: false };
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
            await Promise.all([this.saveToRemote(), this.savePlayersToRemote()]);
        },
        async updateBounty(key, title, desc, primaryPoints, secondaryPoints) {
            await this.loadFromRemote();
            const bounty = this.bounties[key];
            if (!bounty) return;
            bounty.title = title;
            bounty.desc = desc;
            bounty.primaryPoints = primaryPoints;
            bounty.secondaryPoints = secondaryPoints;
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
        async setPending(key) {
            await this.loadFromRemote();
            if (this.bounties[key]) {
                this.bounties[key].pending = true;
                await this.saveToRemote();
            }
        },
        async addPlayer(key, name) {
            await this.loadFromRemote();
            if (this.players[key]) return;
            const nextId = Math.max(0, ...Object.values(this.players).map(p => p.id ?? 0)) + 1;
            this.players[key] = { id: nextId, name, score: 0 };
            await this.savePlayersToRemote();
        },
        async registerPlayer(name, pin) {
            await this.loadFromRemote();
            const key = name.toLowerCase().replace(/\s+/g, '_');
            if (this.players[key]) {
                return { success: false, error: 'Username already taken.' };
            }
            const nextId = Math.max(0, ...Object.values(this.players).map(p => p.id ?? 0)) + 1;
            const hashedPin = await bcrypt.hash(pin, 10);
            this.players[key] = { id: nextId, name, pin: hashedPin, score: 0 };
            await this.savePlayersToRemote();
            return { success: true };
        }
    },
    persist: true
});

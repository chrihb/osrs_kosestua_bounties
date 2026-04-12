import { defineStore } from 'pinia';
import {
    fetchBountyData, fetchUserData,
    insertTask, updateTask, setTaskCompleted, deleteTask,
    assignTaskToSlot, clearSlotByTaskId, setSlotPendingByTaskId,
    insertUser, incrementUserScore,
    insertHistory,
} from '../services/dataService';
import bcrypt from 'bcryptjs';
import { generateKey } from '../utils/generateKey.js';


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
                .sort((a, b) => (a.slot ?? 99) - (b.slot ?? 99))
    },
    actions: {
        async loadFromRemote() {
            const [bounties, players] = await Promise.all([fetchBountyData(), fetchUserData()]);
            this.bounties = bounties;
            this.players = players;
        },

        async rollBounty() {
            await this.loadFromRemote();

            const usedSlots = new Set(
                Object.values(this.bounties)
                    .filter(b => b.active && !b.completed && b.slot)
                    .map(b => b.slot)
            );
            let slot = 1;
            while (slot <= 6 && usedSlots.has(slot)) slot++;
            if (slot > 6) return;

            const available = Object.entries(this.bounties)
                .filter(([, b]) => !b.active && !b.completed);
            if (available.length === 0) return;

            const [, task] = available[Math.floor(Math.random() * available.length)];
            await assignTaskToSlot(slot, task.id);
            await this.loadFromRemote();
        },

        async addBounty(key, title, desc, primaryPoints = 1, secondaryPoints = 0) {
            if (this.bounties[key]) return;
            await insertTask(title, desc, primaryPoints, secondaryPoints);
            await this.loadFromRemote();
        },

        async updateBounty(key, title, desc, primaryPoints, secondaryPoints) {
            const bounty = this.bounties[key];
            if (!bounty) return;
            await updateTask(bounty.id, title, desc, primaryPoints, secondaryPoints);
            await this.loadFromRemote();
        },

        async reactivateBounty(key) {
            const bounty = this.bounties[key];
            if (!bounty) return;
            await setTaskCompleted(bounty.id, false);
            await this.loadFromRemote();
        },

        async deleteBounty(key) {
            const bounty = this.bounties[key];
            if (!bounty) return;
            if (bounty.active) {
                await clearSlotByTaskId(bounty.id);
            }
            await deleteTask(bounty.id);
            await this.loadFromRemote();
        },

        async setPending(key) {
            const bounty = this.bounties[key];
            if (!bounty) return;
            await setSlotPendingByTaskId(bounty.id);
            await this.loadFromRemote();
        },

        async addPlayer(key, name) {
            if (this.players[key]) return;
            await insertUser(name);
            await this.loadFromRemote();
        },

        async registerPlayer(name, pin) {
            const key = generateKey(name);
            await this.loadFromRemote();
            if (this.players[key]) {
                return { success: false, error: 'Username already taken.' };
            }
            const hashedPin = await bcrypt.hash(pin, 10);
            try {
                await insertUser(name, hashedPin);
            } catch (e) {
                if (e.code === '23505') {
                    return { success: false, error: 'Username already taken.' };
                }
                throw e;
            }
            await this.loadFromRemote();
            return { success: true };
        }
    },
    persist: true
});

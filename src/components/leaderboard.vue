<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import LeaderboardEntry from "@/components/leaderboardEntry.vue";
import AddPlayerModal from "@/components/addPlayerModal.vue";
import ScrollContainer from "@/components/scrollContainer.vue";

const bountyStore = useBountyStore();
const players = computed(() =>
    Object.values(bountyStore.players).sort((a, b) => b.score - a.score)
);
const showModal = ref(false);
</script>

<template>
  <ScrollContainer style="min-width: 14rem;">
    <h2 style="font-family: 'RuneScapeBold', serif; font-size: 1.2rem; color: #ffff00; letter-spacing: 0.1em; text-transform: uppercase; padding: 0.75rem 1rem; border-bottom: 1px solid #4a3b1f;">
      🏆 Leaderboard
    </h2>
    <LeaderboardEntry
        v-for="(player, index) in players"
        :key="index"
        :player="player"
        :rank="index + 1"
    />
    <div class="p-3">
      <button class="osrs-btn w-full" @click="showModal = true">+ Add Player</button>
    </div>
  </ScrollContainer>

  <AddPlayerModal v-if="showModal" @close="showModal = false" />
</template>
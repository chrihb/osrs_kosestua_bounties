<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import LeaderboardEntry from "@/components/leaderboard/leaderboardEntry.vue";
import AddPlayerModal from "@/components/leaderboard/addPlayerModal.vue";
import ScrollContainer from "@/components/scrollContainer.vue";

const bountyStore = useBountyStore();
const players = computed(() =>
    Object.values(bountyStore.players).sort((a, b) => b.score - a.score)
);
const showModal = ref(false);
</script>

<template>
  <ScrollContainer class="min-w-60">
    <div class="flex flex-col gap-2">
      <h2 class="text-2xl font-bold">
        Leaderboard
      </h2>
      <LeaderboardEntry
          v-for="(player, index) in players"
          :key="index"
          :player="player"
          :rank="index + 1"
      />
      <button class="osrs-btn" @click="showModal = true">+ Add Player</button>
    </div>
  </ScrollContainer>

  <AddPlayerModal v-if="showModal" @close="showModal = false" />
</template>
<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed } from "vue";
import LeaderboardEntry from "@/components/leaderboard/leaderboardEntry.vue";
import ScrollContainer from "@/components/scrollContainer.vue";

const bountyStore = useBountyStore();
const players = computed(() =>
    Object.values(bountyStore.players).sort((a, b) => b.score - a.score)
);
</script>

<template>
  <ScrollContainer class="leaderboard-scroll">
    <div class="leaderboard-inner">
      <h2 class="leaderboard-heading">
        Leaderboard
      </h2>
      <div class="osrs-panel player-list">
        <LeaderboardEntry
            v-for="(player, index) in players"
            :key="index"
            :player="player"
            :rank="index + 1"
        />
      </div>
    </div>
  </ScrollContainer>
</template>

<style scoped>
.leaderboard-scroll {
  min-width: 24rem;
}
.leaderboard-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.player-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 100%;
}
.leaderboard-heading {
  font-family: 'RuneScapeBold', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
}
</style>

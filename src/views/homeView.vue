<script setup>
import { onMounted } from "vue";
import BountyContainer from "@/components/bounty/bountyContainer.vue";
import Title from "@/components/title.vue";
import Leaderboard from "@/components/leaderboard/leaderboard.vue";
import { useBountyStore } from "@/stores/bountyStore.js";

const bountyStore = useBountyStore();
onMounted(() => bountyStore.loadFromRemote());
</script>

<template>
  <div class="home-page">
    <div class="home-grid">
      <Title />
      <BountyContainer />
      <Leaderboard />
    </div>
  </div>
</template>

<style scoped>
.home-page {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 1.5rem;
}

.home-grid {
  display: grid;
  grid-template-columns: 1fr auto;
  grid-template-rows: auto 1fr;
  max-width: 64rem;
  gap: 1.5rem;
  justify-content: center;
}

.grid-title {
  font-size: 2.25rem;
  grid-column: span 2;
  grid-row-start: 1;
}

.grid-bounties {
  grid-column-start: 1;
  grid-row-start: 2;
  align-self: start;
  width: 100%;
}

.grid-leaderboard {
  grid-column-start: 2;
  grid-row-start: 2;
  align-self: start;
}

@media (max-width: 1200px) {
  .home-grid {
    grid-template-columns: 1fr;
    grid-template-rows: auto auto auto;
    gap: 1rem;
    justify-items: center;
  }

  .grid-title {
    grid-column: 1;
  }

  .grid-bounties {
    grid-column: 1;
    grid-row-start: 2;
    max-width: 28rem;
    width: 100%;
  }

  .grid-leaderboard {
    grid-column: 1;
    grid-row-start: 3;
    max-width: 24rem;
    width: 100%;
  }
}

@media (max-width: 768px) {
  .home-page {
    margin: 0.75rem;
  }

  .grid-title {
    font-size: 1.5rem;
  }
}
</style>

<script setup>
import { onMounted, ref } from "vue";
import BountyContainer from "@/components/bounty/bountyContainer.vue";
import Title from "@/components/title.vue";
import Leaderboard from "@/components/leaderboard/leaderboard.vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const bountyStore = useBountyStore();
const loading = ref(Object.keys(bountyStore.bounties).length === 0);
const loadError = ref('');

onMounted(async () => {
  try {
    await bountyStore.loadFromRemote();
  } catch {
    loadError.value = 'Failed to load bounties. Please refresh the page.';
  } finally {
    loading.value = false;
  }
});
</script>

<template>
  <div class="home-page">
    <div v-if="loading" class="spinner-center">
      <LoadingSpinner />
    </div>
    <p v-else-if="loadError" class="load-error">{{ loadError }}</p>
    <div v-else class="home-grid">
      <Title class="grid-title"/>
      <BountyContainer class="grid-bounties" />
      <Leaderboard class="grid-leaderboard"/>
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
.spinner-center {
  position: fixed;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
}
.load-error {
  font-family: 'RuneScapeSmall', serif;
  color: red;
  text-align: center;
  margin-top: 2rem;
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

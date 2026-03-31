<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";

const bountyStore = useBountyStore();
const loading = ref(false);

const handleRoll = async () => {
  loading.value = true;
  await bountyStore.rollBounty();
  loading.value = false;
};
</script>

<template>
  <div class="bounty-card placeholder-card">
    <p class="placeholder-title">Roll a Bounty</p>
    <div class="spacer" />
    <div class="placeholder-action">
      <button class="osrs-btn" @click="handleRoll" :disabled="loading">
        <LoadingSpinner v-if="loading" :small="true" />
        <span v-else>Roll</span>
      </button>
    </div>
  </div>
</template>

<style scoped>
.placeholder-card {
  min-height: 12rem;
}
.placeholder-title {
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}
.spacer {
  flex: 1;
}
.placeholder-action {
  display: flex;
  justify-content: center;
}
</style>

<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
const bountyStore = useBountyStore();
</script>

<template>
  <div class="bounty-card placeholder-card">
    <p class="placeholder-title">Roll a Bounty</p>
    <div class="spacer" />
    <div class="placeholder-action">
      <button class="osrs-btn" @click="bountyStore.rollBounty()">Roll</button>
    </div>
  </div>
</template>

<style scoped>
.placeholder-card {
  min-height: 12rem;
}
.placeholder-title {
  font-size: 2.25rem;
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

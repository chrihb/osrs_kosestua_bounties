<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
const bountyStore = useBountyStore();
</script>

<template>
  <div class="bg-black flex flex-col p-2 min-w-48 h-full">
    <p class="text-4xl font-bold text-center">Roll a Bounty</p>
    <div class="flex-1" />
    <div class="flex justify-center">
      <button class="osrs-btn" @click="bountyStore.rollBounty()">🎲 Roll</button>
    </div>
  </div>
</template>
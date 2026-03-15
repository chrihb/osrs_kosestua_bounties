<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
const bountyStore = useBountyStore();
</script>

<template>
  <div class="bg-black flex flex-col justify-between p-2 min-w-48">
    <div class="flex flex-col items-center">
      <p class="text-4xl font-bold">
        Roll a Bounty
      </p>
      <button class="osrs-btn" @click="bountyStore.rollBounty()">🎲 Roll</button>
    </div>
  </div>
</template>
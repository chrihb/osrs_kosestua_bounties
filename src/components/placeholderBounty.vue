<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
const bountyStore = useBountyStore();
</script>

<template>
  <div class="flex-1" style="max-width: 14rem;">
    <div class="flex flex-col items-center justify-center gap-4 p-2 text-center"
         style="background: rgba(14, 13, 9, 0.7); border: 1px dashed #3a2e18; min-height: 14rem;">
      <p style="font-family: 'RuneScapeBold', serif; font-size: 1.1rem; color: #ffff00; letter-spacing: 0.05em;">
        Roll a Bounty
      </p>
      <button class="osrs-btn" @click="bountyStore.rollBounty()">🎲 Roll</button>
    </div>
  </div>
</template>
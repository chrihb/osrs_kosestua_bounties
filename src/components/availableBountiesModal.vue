<script setup>
import { ref, computed } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import NewBountyModal from "@/components/newBountyModal.vue";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const bounties = computed(() =>
    Object.entries(bountyStore.bounties).map(([key, bounty]) => ({ key, ...bounty }))
);
const showNewBounty = ref(false);
</script>

<template>
  <div class="osrs-modal-backdrop">
    <div class="osrs-modal" style="max-height: 80vh; overflow-y: auto;">
      <h2>📜 All Bounties</h2>
      <div class="flex flex-col gap-2" style="margin-top: 0.5rem;">
        <div v-for="bounty in bounties" :key="bounty.key"
             class="flex justify-between items-center px-3 py-2"
             style="background: #110f08; border: 1px solid #3a2e18;">
          <div>
            <p style="font-family: 'RuneScapeBold', serif; font-size: 1rem; color: #ffff00;">{{ bounty.title }}</p>
            <p style="font-family: 'RuneScapeSmall', serif; font-size: 0.9rem; color: #7a6a4a;">{{ bounty.desc }}</p>
          </div>
          <span v-if="bounty.completed"
                style="font-family: 'RuneScapeSmall', serif; font-size: 0.9rem; color: #4caf50;">✓ Done</span>
          <span v-else
                style="font-family: 'RuneScapeSmall', serif; font-size: 0.9rem; color: #5a4a2a;">Pending</span>
        </div>
      </div>
      <div class="flex gap-2 mt-4">
        <button class="osrs-btn flex-1" @click="showNewBounty = true">+ New Bounty</button>
        <button class="osrs-btn-ghost flex-1" @click="emit('close')">Close</button>
      </div>
    </div>
  </div>

  <NewBountyModal v-if="showNewBounty" @close="showNewBounty = false" />
</template>
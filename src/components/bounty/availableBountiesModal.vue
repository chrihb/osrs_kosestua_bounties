<script setup>
import { ref, computed } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import NewBountyModal from "@/components/bounty/newBountyModal.vue";
import ScrollContainer from "@/components/scrollContainer.vue";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const bounties = computed(() =>
    Object.entries(bountyStore.bounties).map(([key, bounty]) => ({ key, ...bounty }))
);
const showNewBounty = ref(false);
</script>

<template>
  <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
    <ScrollContainer class="min-w-150">
      <h2 class="text-2xl font-bold text-[#ff981f] border-b border-[#6e4e18] pb-2 mb-3">
        📜 All Bounties
      </h2>
      <div class="flex flex-col gap-2">
        <div
            v-for="bounty in bounties"
            :key="bounty.key"
            class="flex justify-between items-center border-b border-[#6e4e18] py-1"
        >
          <div>
            <p class="text-xl font-bold">{{ bounty.title }}</p>
            <p class="text-base text-[#a89060]">{{ bounty.desc }}</p>
          </div>
          <span :class="bounty.completed ? 'text-green-400' : 'text-[#a89060]'" class="text-base ml-4">
            {{ bounty.completed ? 'Completed' : 'Incomplete' }}
          </span>
        </div>
      </div>
      <div class="flex justify-between gap-2 mt-4">
        <button class="osrs-btn" @click="emit('close')">Close</button>
        <button class="osrs-btn" @click="showNewBounty = true">+ New Bounty</button>
      </div>
    </ScrollContainer>
  </div>
  <NewBountyModal v-if="showNewBounty" @close="showNewBounty = false" />
</template>
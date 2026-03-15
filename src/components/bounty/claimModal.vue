<script setup>
import PlayerEntry from "@/components/leaderboard/playerEntry.vue";
import ScrollContainer from "@/components/scrollContainer.vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed } from "vue";

const props = defineProps({ bounty: { type: Object, required: true } });
const emit = defineEmits(['close']);

const bountyStore = useBountyStore();
const players = computed(() =>
    Object.entries(bountyStore.players).map(([key, player]) => ({ key, ...player }))
);

function handleSelect(playerKey) {
  bountyStore.claimBounty(playerKey, props.bounty.key);
  emit('close');
}
</script>

<template>
  <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
    <ScrollContainer class="min-w-80 max-w-md w-full">
      <h2 class="text-2xl font-bold text-[#ff981f] border-b border-[#6e4e18] pb-2 mb-3">
        ⚔ Who claims this bounty?
      </h2>
      <p class="text-base text-[#a89060] mb-3">{{ bounty.title }}</p>
      <div class="flex flex-col gap-2 max-h-96 overflow-y-auto">
        <PlayerEntry
            v-for="(player, index) in players"
            :key="index"
            :player="player"
            @select="handleSelect"
        />
      </div>
      <button class="osrs-btn w-full mt-4" @click="emit('close')">Cancel</button>
    </ScrollContainer>
  </div>
</template>
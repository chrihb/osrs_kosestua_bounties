<script setup>
import PlayerEntry from "@/components/playerEntry.vue";
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
  <div class="osrs-modal-backdrop">
    <div class="osrs-modal">
      <h2>⚔ Who claims this bounty?</h2>
      <p style="font-family: 'RuneScapeSmall', serif; font-size: 1rem; color: #a89060; margin-bottom: 0.75rem;">
        {{ bounty.title }}
      </p>
      <div class="flex flex-col gap-2">
        <PlayerEntry
            v-for="(player, index) in players"
            :key="index"
            :player="player"
            @select="handleSelect"
        />
      </div>
      <button class="osrs-btn-ghost w-full mt-4" @click="emit('close')">Cancel</button>
    </div>
  </div>
</template>
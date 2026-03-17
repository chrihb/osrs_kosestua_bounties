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
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        Who claims this bounty?
      </h2>
      <p class="claim-subtitle">{{ bounty.title }}</p>
      <div class="osrs-panel player-list">
        <PlayerEntry
            v-for="(player, index) in players"
            :key="index"
            :player="player"
            @select="handleSelect"
        />
      </div>
      <div class="cancel-wrapper">
        <button class="osrs-btn" @click="emit('close')">Cancel</button>
      </div>
    </ScrollContainer>
  </div>
</template>

<style scoped>
.modal-scroll {
  max-width: 28rem;
}
.claim-subtitle {
  font-family: 'RuneScapeBold', serif;
  font-size: 1.4rem;
  color: #ffff00;
  text-align: center;
  margin-bottom: 0.75rem;
}
.player-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 24rem;
  overflow-y: auto;
}
.cancel-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>

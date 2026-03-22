<script setup>
import PlayerEntry from "@/components/leaderboard/playerEntry.vue";
import ScrollContainer from "@/components/scrollContainer.vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import ImageUploader from "../upload/ImageUploader.vue";
import { useAuthStore } from "@/stores/authStore.js";

const authStore = useAuthStore();
const props = defineProps({ bounty: { type: Object, required: true } });
const emit = defineEmits(['close']);
const file = ref(null);
const status = ref('');
const contributors = ref([authStore.loggedInPlayer.toLowerCase()]);
const bountyStore = useBountyStore();
const players = computed(() =>
  Object.entries(bountyStore.players)
    .filter(([key, _]) => key.toLowerCase() === authStore.loggedInPlayer.toLowerCase() ? false : true)
    .map(([key, player]) => ({ key, ...player }))
);

function handleSelect(playerKey) {
  if (contributors.value.includes(playerKey)) {
    const index = contributors.value.indexOf(playerKey);
    const arr = contributors.value;
    if (index > -1) {
      arr.splice(index, 1);
      contributors.value = arr;
    }
  } else {
    contributors.value = [...contributors.value, playerKey]
  }
  console.log(JSON.stringify(contributors.value))
}

function onFileChanged(e) {
  console.log(e)
  file.value = e;
  status.value = file.value ? '' : 'No file selected';
}

function send() {
  console.log("sending!", file.value, JSON.stringify(contributors.value))
  bountyStore.claimBountyMultiple(contributors.value, props.bounty.key);
  emit('close');
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        Claim bounty
      </h2>
      <p class="claim-subtitle">{{ bounty.title }}</p>
      <ImageUploader @fileChanged="onFileChanged" />
      <p class="claim-subtitle" style="padding-top: 10px;">
        Other contributors
      </p>
      <div class="osrs-panel player-list">
        <PlayerEntry v-for="(player, index) in players" :key="index" :player="player" @select="handleSelect" />
      </div>
      <div class="btn-wrapper">
        <button class="osrs-btn" :disabled="!file" @click="send()">Claim</button>
        <button class="osrs-btn" @click="emit('close')">Cancel</button>
      </div>
      <p v-if="status">{{ status }}</p>
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

.btn-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
</style>

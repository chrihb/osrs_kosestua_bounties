<script setup>
import ScrollContainer from "@/components/scrollContainer.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useBountyStore } from "@/stores/bountyStore.js";
import { ref, computed } from "vue";

const props = defineProps({
  selected: { type: Array, default: () => [] }
});
const emit = defineEmits(['save', 'close']);

const authStore = useAuthStore();
const bountyStore = useBountyStore();

const contributors = ref([...props.selected]);

const players = computed(() =>
  Object.entries(bountyStore.players)
    .filter(([key]) => key !== authStore.currentUser?.key)
    .map(([key, player]) => ({ key, ...player }))
);

function toggle(key) {
  const i = contributors.value.indexOf(key);
  if (i === -1) contributors.value.push(key);
  else contributors.value.splice(i, 1);
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">Contributors</h2>

      <div class="osrs-panel player-list">
        <div
          v-for="player in players"
          :key="player.key"
          class="osrs-divider player-row"
          :class="{ selected: contributors.includes(player.key) }"
          @click="toggle(player.key)"
        >
          <span class="player-name">{{ player.name }}</span>
          <span v-if="contributors.includes(player.key)" class="checkmark">✓</span>
        </div>
        <p v-if="!players.length" class="empty-text">No other players.</p>
      </div>

      <div class="btn-row">
        <button class="osrs-btn" @click="emit('close')">Cancel</button>
        <button class="osrs-btn" @click="emit('save', contributors)">Save</button>
      </div>
    </ScrollContainer>
  </div>
</template>

<style scoped>
.modal-scroll {
  max-width: 24rem;
}
.player-list {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.player-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  font-family: 'RuneScapeBold', serif;
  font-size: 1.1rem;
  color: #ffff00;
}
.player-row:hover {
  background: rgba(255, 200, 60, 0.12);
  outline: 1px solid rgba(255, 200, 60, 0.3);
}
.player-row.selected {
  background: rgba(255, 200, 60, 0.08);
}
.checkmark {
  color: #00ff00;
  font-size: 0.85rem;
  line-height: 1;
}
.empty-text {
  font-family: 'RuneScapeSmall', serif;
  color: #736a5e;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem 0;
}
.btn-row {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 1rem;
}
</style>

<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import ScrollContainer from "@/components/scrollContainer.vue";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const name = ref('');

function submit() {
  if (!name.value.trim()) return;
  const key = name.value.toLowerCase().replace(/\s+/g, '_');
  bountyStore.addPlayer(key, name.value);
  emit('close');
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        Add Player
      </h2>
      <div class="form-fields">
        <input v-model="name" class="osrs-input" placeholder="Player name" />
        <div class="form-actions">
          <button class="osrs-btn" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Player</button>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>

<style scoped>
.osrs-input {
  color: #ffff00;
}
.osrs-input::placeholder {
  color: #ffff00;
  opacity: 0.5;
}
</style>

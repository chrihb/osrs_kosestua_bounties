<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";

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
  <div class="osrs-modal-backdrop">
    <div class="osrs-modal">
      <h2>⚔ Add Player</h2>
      <div class="flex flex-col gap-3">
        <input v-model="name" class="osrs-input" placeholder="Player name" />
        <div class="flex gap-2 justify-end mt-1">
          <button class="osrs-btn-ghost" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Player</button>
        </div>
      </div>
    </div>
  </div>
</template>
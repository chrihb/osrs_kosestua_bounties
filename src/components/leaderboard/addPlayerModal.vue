<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import ScrollContainer from "@/components/scrollContainer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { generateKey } from "@/utils/generateKey.js";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const name = ref('');
const loading = ref(false);

async function submit() {
  if (!name.value.trim()) return;
  loading.value = true;
  const key = generateKey(name.value);
  await bountyStore.addPlayer(key, name.value);
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
          <button class="osrs-btn" @click="emit('close')" :disabled="loading">Cancel</button>
          <button class="osrs-btn" @click="submit" :disabled="loading">
            <LoadingSpinner v-if="loading" :small="true" />
            <span v-else>Add Player</span>
          </button>
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

<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import ScrollContainer from "@/components/scrollContainer.vue";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const title = ref('');
const desc = ref('');
const points = ref(1);

function submit() {
  if (!title.value.trim() || !desc.value.trim()) return;
  const key = title.value.toLowerCase().replace(/\s+/g, '_');
  bountyStore.addBounty(key, title.value, desc.value, points.value);
  emit('close');
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        New Bounty
      </h2>
      <div class="form-fields">
        <input v-model="title" class="osrs-input" placeholder="Title" />
        <input v-model="desc" class="osrs-input" placeholder="Description" />
        <div class="points-row">
          <label class="points-label">Points</label>
          <input v-model.number="points" type="number" min="1" max="99" class="osrs-input points-input" />
        </div>
        <div class="form-actions">
          <button class="osrs-btn" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Bounty</button>
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
.points-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.points-label {
  color: #ffff00;
  font-family: 'RuneScapeBold', serif;
}
.points-input {
  width: 5rem;
}
</style>

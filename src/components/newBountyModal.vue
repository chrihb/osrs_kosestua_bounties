<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const title = ref('');
const desc = ref('');

function submit() {
  if (!title.value.trim() || !desc.value.trim()) return;
  const key = title.value.toLowerCase().replace(/\s+/g, '_');
  bountyStore.addBounty(key, title.value, desc.value);
  emit('close');
}
</script>

<template>
  <div class="osrs-modal-backdrop">
    <div class="osrs-modal">
      <h2>📜 New Bounty</h2>
      <div class="flex flex-col gap-3">
        <input v-model="title" class="osrs-input" placeholder="Title" />
        <input v-model="desc" class="osrs-input" placeholder="Description" />
        <div class="flex gap-2 justify-end mt-1">
          <button class="osrs-btn-ghost" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Bounty</button>
        </div>
      </div>
    </div>
  </div>
</template>
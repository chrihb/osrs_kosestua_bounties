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
  <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
    <ScrollContainer class="min-w-80 max-w-sm w-full">
      <h2 class="text-2xl font-bold text-[#ff981f] border-b border-[#6e4e18] pb-2 mb-3">
        📜 New Bounty
      </h2>
      <div class="flex flex-col gap-3">
        <input v-model="title" class="osrs-input" placeholder="Title" />
        <input v-model="desc" class="osrs-input" placeholder="Description" />
        <div class="flex items-center gap-3">
          <label class="text-yellow-300">Points</label>
          <input v-model.number="points" type="number" min="1" max="99" class="osrs-input w-20" />
        </div>
        <div class="flex gap-2 justify-end mt-1">
          <button class="osrs-btn" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Bounty</button>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>
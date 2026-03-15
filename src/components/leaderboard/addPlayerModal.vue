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
  <div class="fixed inset-0 bg-black/75 flex items-center justify-center z-50">
    <ScrollContainer class="min-w-80 max-w-sm w-full">
      <h2 class="text-2xl font-bold text-[#ff981f] border-b border-[#6e4e18] pb-2 mb-3">
        ➕ Add Player
      </h2>
      <div class="flex flex-col gap-3">
        <input v-model="name" class="osrs-input" placeholder="Player name" />
        <div class="flex gap-2 justify-end mt-1">
          <button class="osrs-btn" @click="emit('close')">Cancel</button>
          <button class="osrs-btn" @click="submit">Add Player</button>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>
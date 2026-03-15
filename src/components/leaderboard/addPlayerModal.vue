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
  <div>
    <div>
      <h2>Add Player</h2>
      <div>
        <input v-model="name" placeholder="Player name" />
        <div>
          <button @click="emit('close')">Cancel</button>
          <button @click="submit">Add Player</button>
        </div>
      </div>
    </div>
  </div>
</template>
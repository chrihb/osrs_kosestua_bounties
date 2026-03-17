<script setup>
defineProps({ player: { type: Object, required: true } });
const emit = defineEmits(['select']);
</script>

<template>
  <div class="osrs-divider player-row">
    <p class="player-name">{{ player.name }}</p>
    <button class="osrs-btn" @click="emit('select', player.key)">Select</button>
  </div>
</template>

<style scoped>
.player-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0;
}
.player-name {
  font-size: 1.25rem;
}
</style>

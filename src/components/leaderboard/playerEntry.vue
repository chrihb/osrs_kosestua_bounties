<script setup>
defineProps({ player: { type: Object, required: true } });
const emit = defineEmits(['select']);
</script>

<template>
  <div class="osrs-divider player-row">
    <p for="chkPlayer" class="player-name">{{ player.name }}</p>
    <input id="chkPlayer" type="checkbox" class="osrs-btn" @click="emit('select', player.key)"></input>
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

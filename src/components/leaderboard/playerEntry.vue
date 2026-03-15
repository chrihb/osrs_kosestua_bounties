<script setup>
defineProps({ player: { type: Object, required: true } });
const emit = defineEmits(['select']);
</script>

<template>
  <div>
    <p>{{ player.name }}</p>
    <button @click="emit('select', player.key)">
      Select
    </button>
  </div>
</template>
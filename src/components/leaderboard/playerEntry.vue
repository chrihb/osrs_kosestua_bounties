<script setup>
defineProps({ player: { type: Object, required: true } });
const emit = defineEmits(['select']);
</script>

<template>
  <div class="flex justify-between items-center border-b border-[#6e4e18] py-2">
    <p class="text-xl">{{ player.name }}</p>
    <button class="osrs-btn" @click="emit('select', player.key)">Select</button>
  </div>
</template>
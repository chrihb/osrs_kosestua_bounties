<script setup>
defineProps({ player: { type: Object, required: true } });
const emit = defineEmits(['select']);
</script>

<template>
  <div class="flex justify-between items-center px-3 py-2"
       style="background: #110f08; border: 1px solid #3a2e18;">
    <p style="font-family: 'RuneScape', serif; font-size: 1rem; color: #ffff00;">{{ player.name }}</p>
    <button class="osrs-btn" style="font-size: 0.85rem; padding: 0.25rem 0.75rem;"
            @click="emit('select', player.key)">
      Select
    </button>
  </div>
</template>
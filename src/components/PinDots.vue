<script setup>
defineProps({ length: { type: Number, default: 0 } });
</script>

<template>
  <div class="pin-dots">
    <div v-for="i in 4" :key="i" class="pin-dot" :class="{ filled: length >= i }" />
  </div>
</template>

<style scoped>
.pin-dots {
  display: flex;
  gap: 0.75rem;
}
.pin-dot {
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  border: 2px solid #4a3b1f;
  background: transparent;
}
.pin-dot.filled {
  background: #ffff00;
}
</style>

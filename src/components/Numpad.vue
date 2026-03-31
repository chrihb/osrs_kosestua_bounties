<script setup>
defineProps({ disabled: Boolean });
defineEmits(['input', 'delete']);
</script>

<template>
  <div class="numpad">
    <button
      v-for="digit in ['1','2','3','4','5','6','7','8','9','','0','⌫']"
      :key="digit"
      class="osrs-btn numpad-btn"
      :style="{ visibility: digit === '' ? 'hidden' : 'visible' }"
      :disabled="disabled"
      @click="digit === '⌫' ? $emit('delete') : $emit('input', digit)"
    >{{ digit }}</button>
  </div>
</template>

<style scoped>
.numpad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
.numpad-btn {
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.2rem;
}
</style>

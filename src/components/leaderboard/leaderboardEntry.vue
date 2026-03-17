<script setup>
defineProps({
  player: { type: Object, required: true },
  rank: { type: Number, default: 0 }
});
</script>

<template>
  <div class="osrs-divider entry">
    <div class="entry-left">
      <span>
        {{ rank }}.
      </span>
      <p>{{ player.name }}</p>
    </div>
    <p>
      {{ player.score }}
    </p>
  </div>
</template>

<style scoped>
.entry {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  font-size: 1.25rem;
  padding: 0.4rem 0;
}
.entry-left {
  display: flex;
  flex-direction: row;
  gap: 0.5rem;
}
</style>

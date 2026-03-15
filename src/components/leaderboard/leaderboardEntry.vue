<script setup>
defineProps({
  player: { type: Object, required: true },
  rank: { type: Number, default: 0 }
});
</script>

<template>
  <div class="flex flex-row justify-between text-xl">
    <div class="flex flex-row gap-2">
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
<script setup>
defineProps({
  player: { type: Object, required: true },
  rank: { type: Number, default: 0 }
});
</script>

<template>
  <div class="flex justify-between items-center px-4 py-2"
       style="border-bottom: 1px solid #2a2010;">
    <div class="flex items-center gap-2">
      <span style="font-family: 'RuneScapeSmall', serif; font-size: 1.2rem; color: #6a5a30; min-width: 1.2rem;">
        {{ rank }}.
      </span>
      <p style="font-family: 'RuneScape', serif; font-size: 1.2rem; color: #ffff00;">{{ player.name }}</p>
    </div>
    <p style="font-family: 'RuneScapeBold', serif; font-size: 1.2rem; color: #ffff00;">
      {{ player.score }}
    </p>
  </div>
</template>
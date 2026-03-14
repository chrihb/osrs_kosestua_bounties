<script setup>
import { ref } from "vue";
import ClaimModal from "@/components/claimModal.vue";

defineProps({
  bounty: { type: Object, required: true }
});

const showModal = ref(false);
</script>

<template>
  <div class="flex-1" style="max-width: 14rem;">
    <div class="flex flex-col items-center gap-4 p-2 text-center"
         style="background: #110f08; border: 1px solid #4a3b1f; min-height: 14rem; overflow: hidden; height: 100%;">
      <p style="font-family: 'RuneScapeBold', serif; font-size: 1.7rem; color: #ffff00; word-break: break-word; width: 100%;">
        {{ bounty.title }}
      </p>
      <p style="font-family: 'RuneScapeSmall', serif; font-size: 1.5rem; color: #a89060; line-height: 1.5; word-break: break-word; width: 100%;">
        {{ bounty.desc }}
      </p>
      <div style="margin-top: auto; display: flex; flex-direction: column; align-items: center; gap: 0.5rem;">
        <p style="font-family: 'RuneScapeSmall', serif; font-size: 1.5rem; color: #c89b3c;">
          ⭐ {{ bounty.points ?? 1 }} point{{ (bounty.points ?? 1) !== 1 ? 's' : '' }}
        </p>
        <button class="osrs-btn" @click="showModal = true">Claim</button>
      </div>
    </div>

    <ClaimModal v-if="showModal" :bounty="bounty" @close="showModal = false" />
  </div>
</template>
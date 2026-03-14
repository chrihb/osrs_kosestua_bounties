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
      <p style="font-family: 'RuneScapeSmall', serif; font-size: 1.2rem; color: #a89060; line-height: 1.5; word-break: break-word; width: 100%;">
        {{ bounty.desc }}
      </p>
      <button class="osrs-btn" style="margin-top: auto;" @click="showModal = true">Claim</button>
    </div>

    <ClaimModal v-if="showModal" :bounty="bounty" @close="showModal = false" />
  </div>
</template>
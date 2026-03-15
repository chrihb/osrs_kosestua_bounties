<script setup>
import { ref } from "vue";
import ClaimModal from "@/components/bounty/claimModal.vue";
import {useBountyStore} from "@/stores/bountyStore.js";

const bountyStore = useBountyStore();

defineProps({
  bounty: { type: Object, required: true }
});

const showModal = ref(false);

const handleClick = () => {
  bountyStore.loadFromRemote(true);
  showModal.value = true;
};


</script>

<template>
  <div class="bg-black flex flex-col p-2 min-w-48">
    <div class="flex flex-col items-center">
      <p class="text-4xl font-bold">
        {{ bounty.title }}
      </p>
      <p class="text-2xl">
        {{ bounty.desc }}
      </p>
      <div class="mt-10">
        <p class="text-xl font-bold mb-2">
          ⭐ {{ bounty.points ?? 1 }} point{{ (bounty.points ?? 1) !== 1 ? 's' : '' }}
        </p>
        <button class="osrs-btn" @click="handleClick">Claim</button>
      </div>
    </div>
    <ClaimModal v-if="showModal" :bounty="bounty" @close="showModal = false" />
  </div>
</template>
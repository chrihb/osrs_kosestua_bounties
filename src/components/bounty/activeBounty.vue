<script setup>
import { ref } from "vue";
import ClaimModal from "@/components/bounty/claimModal.vue";
import { useBountyStore } from "@/stores/bountyStore.js";

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
  <div class="bounty-card">
    <div class="bounty-info">
      <p class="bounty-title">{{ bounty.title }}</p>
      <p class="bounty-desc">{{ bounty.desc }}</p>
    </div>
    <div class="spacer" />
    <div class="bounty-bottom">
      <p class="bounty-points">
        {{ bounty.points ?? 1 }} point{{ (bounty.points ?? 1) !== 1 ? 's' : '' }}
      </p>
      <button class="osrs-btn" @click="handleClick">Claim</button>
    </div>
    <ClaimModal v-if="showModal" :bounty="bounty" @close="showModal = false" />
  </div>
</template>

<style scoped>
.bounty-info {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;
}
.bounty-title {
  font-size: 2.25rem;
  font-weight: 700;
  text-align: center;
}
.bounty-desc {
  font-size: 1.5rem;
  text-align: center;
  word-break: break-word;
  overflow-wrap: break-word;
}
.spacer {
  flex: 1;
}
.bounty-bottom {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.bounty-points {
  font-size: 1.25rem;
  font-weight: 700;
}
</style>

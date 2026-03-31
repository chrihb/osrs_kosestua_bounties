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
  bountyStore.loadFromRemote();
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
      <p class="bounty-points">{{ bounty.primaryPoints ?? 1 }} pts</p>
      <span v-if="bounty.pending" class="pending-text">Pending...</span>
      <button v-else class="osrs-btn" @click="handleClick">Claim</button>
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
  font-size: 1.5rem;
  font-weight: 700;
  text-align: center;
}
.bounty-desc {
  font-size: 1.1rem;
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
.pending-text {
  font-family: 'RuneScapeBold', serif;
  font-size: 1rem;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
}
</style>

<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import ActiveBounty from "@/components/bounty/activeBounty.vue";
import PlaceholderBounty from "@/components/bounty/placeholderBounty.vue";
import ScrollContainer from "@/components/scrollContainer.vue";
import AvailableBountiesModal from "@/components/bounty/availableBountiesModal.vue";

const bountyStore = useBountyStore();

const slots = computed(() => {
  const result = Array(6).fill(null);
  for (const bounty of bountyStore.activeBounties) {
    const i = (bounty.slot ?? 0) - 1;
    if (i >= 0 && i < 6) result[i] = bounty;
  }
  return result;
});

const showModal = ref(false);

const handleClick = () => {
  bountyStore.loadFromRemote();
  showModal.value = true;
};
</script>

<template>
  <ScrollContainer class="bounty-container">
    <div class="bounty-inner">
      <h2 class="bounty-heading">
        Active Bounties
      </h2>
      <div class="bounty-grid">
        <template v-for="(bounty, i) in slots" :key="i">
          <ActiveBounty v-if="bounty" :bounty="bounty" />
          <PlaceholderBounty v-else />
        </template>
      </div>
      <div class="bottom-action">
        <button class="osrs-btn" @click="handleClick">All Bounties</button>
      </div>
    </div>
  </ScrollContainer>
  <AvailableBountiesModal v-if="showModal" @close="showModal = false" />
</template>

<style scoped>
.bounty-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.bounty-heading {
  font-family: 'RuneScapeBold', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
}
.bounty-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 0.5rem;
  width: 100%;
  max-width: 28rem;
}
.bottom-action {
  display: flex;
  justify-content: center;
}

@media (max-width: 768px) {
  .bounty-heading {
    font-size: 1.5rem;
  }
  .bounty-grid {
    grid-template-columns: 1fr;
    max-width: none;
  }
}
</style>

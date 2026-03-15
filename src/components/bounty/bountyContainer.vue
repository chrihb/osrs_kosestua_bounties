<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import ActiveBounty from "@/components/bounty/activeBounty.vue";
import PlaceholderBounty from "@/components/bounty/placeholderBounty.vue";
import ScrollContainer from "@/components/scrollContainer.vue";
import AvailableBountiesModal from "@/components/bounty/availableBountiesModal.vue";

const bountyStore = useBountyStore();
const activeBounties = computed(() => bountyStore.activeBounties);
const placeholderCount = computed(() => 3 - activeBounties.value.length);

const handleClick = () => {
  bountyStore.loadFromRemote(true);
  showModal.value = true;
};

const showModal = ref(false);
</script>

<template>
  <ScrollContainer class="min-w-230">
    <div class="flex flex-col items-center gap-2">
      <h2 class="text-5xl font-bold">
        Active Bounties
      </h2>
      <div class="flex flex-row gap-2">
        <ActiveBounty
            v-for="(bounty, index) in activeBounties"
            :key="bounty.key"
            :bounty="bounty"
            class="flex-1"
        />
        <PlaceholderBounty
            v-for="i in placeholderCount"
            :key="'placeholder-' + i"
            class="flex-1"
        />
      </div>
      <div>
        <button class="osrs-btn" @click="handleClick">Available Bounties</button>
      </div>
    </div>
  </ScrollContainer>
  <AvailableBountiesModal v-if="showModal" @close="showModal = false" />
</template>
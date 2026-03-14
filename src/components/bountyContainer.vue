<script setup>
import { useBountyStore } from "@/stores/bountyStore.js";
import { computed, ref } from "vue";
import ActiveBounty from "@/components/activeBounty.vue";
import PlaceholderBounty from "@/components/placeholderBounty.vue";
import ScrollContainer from "@/components/scrollContainer.vue";
import AvailableBountiesModal from "@/components/availableBountiesModal.vue";

const bountyStore = useBountyStore();
const activeBounties = computed(() => bountyStore.activeBounties);
const placeholderCount = computed(() => 3 - activeBounties.value.length);
const showModal = ref(false);
</script>

<template>
  <ScrollContainer style="min-width: 900px;">
    <h2 style="font-family: 'RuneScapeBold', serif; font-size: 2rem; color: #ffff00; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 1rem; text-align: center;">
      Active Bounties
    </h2>
    <div class="flex flex-row gap-4 justify-center">
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
    <div class="flex justify-center mt-4">
      <button class="osrs-btn" @click="showModal = true">Available Bounties</button>
    </div>
  </ScrollContainer>

  <AvailableBountiesModal v-if="showModal" @close="showModal = false" />
</template>
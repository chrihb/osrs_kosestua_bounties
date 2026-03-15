<script setup>
import { onMounted } from "vue";
import BountyContainer from "@/components/bounty/bountyContainer.vue";
import Title from "@/components/title.vue";
import Leaderboard from "@/components/leaderboard/leaderboard.vue";
import { useBountyStore } from "@/stores/bountyStore.js";

const bountyStore = useBountyStore();
onMounted(() => bountyStore.loadFromRemote());
</script>

<template>
  <div class="flex items-center justify-center m-6">
    <div class="grid grid-cols-[1fr_auto] grid-rows-[auto_1fr] max-w-5xl gap-6 justify-center">
      <Title class="text-4xl col-span-2 row-start-1"/>
      <BountyContainer class="col-start-1 row-start-2" />
      <Leaderboard class="col-start-2 row-start-2"/>

    </div>

    <button class="osrs-btn fixed bottom-2 right-95"
        @click="bountyStore.loadFromRemote(true)">
      Refresh
    </button>
  </div>
</template>
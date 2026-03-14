<script setup>
import { onMounted } from "vue";
import BountyContainer from "@/components/bountyContainer.vue";
import Title from "@/components/title.vue";
import Leaderboard from "@/components/leaderboard.vue";
import { useBountyStore } from "@/stores/bountyStore.js";

const bountyStore = useBountyStore();
onMounted(() => bountyStore.loadFromRemote());
</script>

<template>
  <div class="min-h-screen p-8">
    <div class="flex flex-col items-center gap-6">
      <Title />
      <div class="flex flex-row gap-6 items-start">
        <BountyContainer />
        <Leaderboard />
      </div>
    </div>
  </div>
</template>
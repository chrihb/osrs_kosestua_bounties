<script setup>
import { ref, computed } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import NewBountyModal from "@/components/bounty/newBountyModal.vue";
import ScrollContainer from "@/components/scrollContainer.vue";

const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const bounties = computed(() =>
    Object.entries(bountyStore.bounties).map(([key, bounty]) => ({ key, ...bounty }))
);
const showNewBounty = ref(false);
const editingBounty = ref(null);

function openNewBounty() {
  showNewBounty.value = true;
}

function closeNewBounty() {
  showNewBounty.value = false;
}

function openEditBounty(bounty) {
  editingBounty.value = bounty;
}

function closeEditBounty() {
  editingBounty.value = null;
}
</script>

<template>
  <div v-if="!showNewBounty && !editingBounty" class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        All Bounties
      </h2>
      <div class="osrs-panel bounty-list">
        <div
            v-for="bounty in bounties"
            :key="bounty.key"
            class="osrs-divider bounty-row"
            @click="openEditBounty(bounty)"
        >
          <div>
            <p class="bounty-title">{{ bounty.title }}</p>
            <p class="bounty-desc">{{ bounty.desc }}</p>
          </div>
          <div class="bounty-right">
            <span class="bounty-points">{{ bounty.points }} pt{{ bounty.points !== 1 ? 's' : '' }}</span>
            <span :class="bounty.completed ? 'status-complete' : 'status-incomplete'" class="bounty-status">
              {{ bounty.completed ? 'Completed' : 'Incomplete' }}
            </span>
          </div>
        </div>
      </div>
      <div class="modal-actions">
        <button class="osrs-btn" @click="emit('close')">Close</button>
        <button class="osrs-btn" @click="openNewBounty">+ New Bounty</button>
      </div>
    </ScrollContainer>
  </div>
  <NewBountyModal v-if="showNewBounty" @close="closeNewBounty" />
  <NewBountyModal v-if="editingBounty" :bounty="editingBounty" @close="closeEditBounty" />
</template>

<style scoped>
.modal-scroll {
  width: 30rem;
  max-width: 90vw;
}
.bounty-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-height: 24rem;
  overflow-y: auto;
}
.bounty-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem 0;
  min-width: 0;
  cursor: pointer;
}
.bounty-row:hover {
  background: rgba(255, 200, 60, 0.12);
  outline: 1px solid rgba(255, 200, 60, 0.3);
}
.bounty-row > div {
  min-width: 0;
  overflow: hidden;
}
.bounty-title {
  font-size: 1.25rem;
  font-weight: 700;
  word-break: break-word;
}
.bounty-desc {
  font-size: 1rem;
  color: #a89060;
  word-break: break-word;
}
.bounty-right {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
  flex-shrink: 0;
}
.bounty-points {
  font-size: 1rem;
  color: #ffff00;
  font-family: 'RuneScapeBold', serif;
}
.bounty-status {
  font-size: 0.85rem;
  white-space: nowrap;
}
.status-complete {
  color: #00ff00;
}
.status-incomplete {
  color: #ff3030;
}
.modal-actions {
  display: flex;
  justify-content: space-between;
  gap: 0.5rem;
  margin-top: 1rem;
}
</style>

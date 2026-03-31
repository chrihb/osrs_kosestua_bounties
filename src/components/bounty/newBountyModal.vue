<script setup>
import { ref } from "vue";
import { useBountyStore } from "@/stores/bountyStore.js";
import ScrollContainer from "@/components/scrollContainer.vue";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import { generateKey } from "@/utils/generateKey.js";

const props = defineProps({
  bounty: { type: Object, default: null }
});
const emit = defineEmits(['close']);
const bountyStore = useBountyStore();
const isEditing = !!props.bounty;
const title = ref(props.bounty?.title ?? '');
const desc = ref(props.bounty?.desc ?? '');
const primaryPoints = ref(props.bounty?.primaryPoints ?? props.bounty?.points ?? 1);
const secondaryPoints = ref(props.bounty?.secondaryPoints ?? 0);
const loadingAction = ref('');

async function submit() {
  if (!title.value.trim() || !desc.value.trim()) return;
  loadingAction.value = 'submit';
  if (isEditing) {
    await bountyStore.updateBounty(props.bounty.key, title.value, desc.value, primaryPoints.value, secondaryPoints.value);
  } else {
    const key = generateKey(title.value);
    await bountyStore.addBounty(key, title.value, desc.value, primaryPoints.value, secondaryPoints.value);
  }
  emit('close');
}

async function reactivate() {
  loadingAction.value = 'reactivate';
  await bountyStore.reactivateBounty(props.bounty.key);
  emit('close');
}

async function deleteBounty() {
  loadingAction.value = 'delete';
  await bountyStore.deleteBounty(props.bounty.key);
  emit('close');
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">
        {{ isEditing ? 'Edit Bounty' : 'New Bounty' }}
      </h2>
      <div class="form-fields">
        <input v-model="title" class="osrs-input" placeholder="Title" />
        <input v-model="desc" class="osrs-input" placeholder="Description" />
        <div class="points-row">
          <label class="points-label">Primary pts</label>
          <input v-model.number="primaryPoints" type="number" min="1" max="99" class="osrs-input points-input" :disabled="!!loadingAction" />
          <label class="points-label">Secondary pts</label>
          <input v-model.number="secondaryPoints" type="number" min="0" max="99" class="osrs-input points-input" :disabled="!!loadingAction" />
          <button v-if="isEditing && bounty.completed" class="osrs-btn reactivate-btn" @click="reactivate" :disabled="!!loadingAction">
            <LoadingSpinner v-if="loadingAction === 'reactivate'" :small="true" />
            <span v-else>Reactivate</span>
          </button>
        </div>
        <div class="form-actions">
          <button class="osrs-btn" @click="emit('close')" :disabled="!!loadingAction">Cancel</button>
          <button v-if="isEditing" class="osrs-btn delete-btn" @click="deleteBounty" :disabled="!!loadingAction">
            <LoadingSpinner v-if="loadingAction === 'delete'" :small="true" />
            <span v-else>Delete</span>
          </button>
          <button class="osrs-btn" @click="submit" :disabled="!!loadingAction">
            <LoadingSpinner v-if="loadingAction === 'submit'" :small="true" />
            <span v-else>{{ isEditing ? 'Save' : 'Add Bounty' }}</span>
          </button>
        </div>
      </div>
    </ScrollContainer>
  </div>
</template>

<style scoped>
.osrs-input {
  color: #ffff00;
}
.osrs-input::placeholder {
  color: #ffff00;
  opacity: 0.5;
}
.points-row {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.points-label {
  color: #ffff00;
  font-family: 'RuneScapeBold', serif;
}
.points-input {
  width: 5rem;
}
.reactivate-btn {
  margin-left: auto;
}
.delete-btn {
  color: #ff3030;
}
</style>

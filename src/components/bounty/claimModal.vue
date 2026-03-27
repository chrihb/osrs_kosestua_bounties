<script setup>
import ScrollContainer from "@/components/scrollContainer.vue";
import ContributorsModal from "@/components/bounty/contributorsModal.vue";
import { useAuthStore } from "@/stores/authStore.js";
import { useBountyStore } from "@/stores/bountyStore.js";
import { ref, computed } from "vue";
import { sendCompletionRequest } from "@/services/discordService.js";

const props = defineProps({ bounty: { type: Object, required: true } });
const emit = defineEmits(['close']);

const authStore = useAuthStore();
const bountyStore = useBountyStore();

const imageFile = ref(null);
const imagePreview = ref(null);
const status = ref('idle'); // 'idle' | 'sending' | 'success' | 'error'
const contributors = ref([]);
const showContributors = ref(false);
const contributorNames = computed(() =>
  contributors.value.map(key => bountyStore.players[key]?.name ?? key)
);

function onFileChange(e) {
  const file = e.target.files[0];
  if (!file) return;
  imageFile.value = file;
  imagePreview.value = URL.createObjectURL(file);
}

function onDropZoneClick() {
  document.getElementById('claim-file-input').click();
}

async function requestCompletion() {
  if (!imageFile.value) return;
  status.value = 'sending';

  try {
    const currentPlayerKey = authStore.currentUser?.key;
    await sendCompletionRequest({
      bountyId: props.bounty.id,
      playerId: bountyStore.players[currentPlayerKey]?.id,
      contributorIds: contributors.value.map(key => bountyStore.players[key]?.id).filter(Boolean),
      imageFile: imageFile.value
    });
    await bountyStore.setPending(props.bounty.key);
    status.value = 'success';
  } catch {
    status.value = 'error';
  }
}
</script>

<template>
  <div class="modal-overlay">
    <ScrollContainer class="modal-scroll">
      <h2 class="modal-heading">Request Completion</h2>
      <p class="claim-subtitle">{{ bounty.title }}</p>

      <template v-if="status === 'success'">
        <p class="status-text success-text">Request sent! Awaiting approval.</p>
        <div class="cancel-wrapper">
          <button class="osrs-btn" @click="emit('close')">Close</button>
        </div>
      </template>

      <template v-else>
        <!-- Image upload -->
        <div class="drop-zone" :class="{ 'has-image': imagePreview }" @click="onDropZoneClick">
          <img v-if="imagePreview" :src="imagePreview" class="image-preview" alt="Preview" />
          <span v-else class="drop-label">Click to upload screenshot</span>
          <input
            id="claim-file-input"
            type="file"
            accept="image/*"
            style="display: none;"
            @change="onFileChange"
          />
        </div>

        <!-- Info box -->
        <div class="osrs-panel info-box">
          <div class="osrs-divider info-row">
            <span class="info-label">Primary points</span>
            <span class="info-value">{{ bounty.primaryPoints ?? bounty.points ?? 1 }}</span>
          </div>
          <div v-if="bounty.secondaryPoints" class="osrs-divider info-row">
            <span class="info-label">Secondary points</span>
            <span class="info-value">{{ bounty.secondaryPoints }}</span>
          </div>
          <div v-if="contributors.length" class="osrs-divider info-row">
            <span class="info-label">Contributors</span>
            <span class="info-value">{{ contributorNames.join(', ') }}</span>
          </div>
        </div>

        <p v-if="status === 'error'" class="status-text error-text">Failed to send. Try again.</p>

        <div class="btn-row">
          <button class="osrs-btn" :disabled="status === 'sending'" @click="emit('close')">Cancel</button>
          <button v-if="bounty.secondaryPoints" class="osrs-btn" :disabled="status === 'sending'" @click="showContributors = true">
            Contributors
          </button>
          <button
            class="osrs-btn"
            :disabled="!imageFile || status === 'sending'"
            @click="requestCompletion"
          >
            {{ status === 'sending' ? 'Sending...' : 'Complete' }}
          </button>
        </div>
      </template>

    </ScrollContainer>
  </div>

  <ContributorsModal
    v-if="showContributors"
    :selected="contributors"
    @save="(list) => { contributors = list; showContributors = false; }"
    @close="showContributors = false"
  />
</template>

<style scoped>
.modal-scroll {
  max-width: 28rem;
}
.claim-subtitle {
  font-family: 'RuneScapeBold', serif;
  font-size: 1.4rem;
  color: #ffff00;
  text-align: center;
  margin-bottom: 0.75rem;
}
.drop-zone {
  width: 100%;
  min-height: 8rem;
  border: 2px dashed #736a5e;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background: linear-gradient(180deg, #1a1610 0%, #252018 100%);
  transition: border-color 0.15s;
  overflow: hidden;
}
.drop-zone:hover {
  border-color: #c8a44a;
}
.drop-zone.has-image {
  border-style: solid;
  border-color: #4a3b1f;
  min-height: unset;
}
.drop-label {
  font-family: 'RuneScapeSmall', serif;
  font-size: 1rem;
  color: #ffff00;
}
.image-preview {
  width: 100%;
  display: block;
  max-height: 16rem;
  object-fit: contain;
}
.btn-row {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  margin-top: 1rem;
}
.cancel-wrapper {
  display: flex;
  justify-content: center;
  margin-top: 1rem;
}
.status-text {
  font-family: 'RuneScapeSmall', serif;
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
}
.success-text {
  color: #00ff00;
}
.error-text {
  color: red;
}
.info-box {
  width: 100%;
  margin-top: 0.75rem;
  display: flex;
  flex-direction: column;
}
.info-row {
  display: flex;
  justify-content: space-between;
  padding: 0.4rem 0;
  font-family: 'RuneScapeSmall', serif;
  font-size: 1rem;
}
.info-label {
  color: #ffff00;
}
.info-value {
  color: #ffff00;
}
</style>

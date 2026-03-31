<script setup>
import { ref, onMounted } from 'vue';
import ScrollContainer from '@/components/scrollContainer.vue';
import { fetchHistory } from '@/services/dataService.js';

const history = ref([]);
const error = ref('');

onMounted(async () => {
  try {
    history.value = await fetchHistory();
  } catch {
    error.value = 'Failed to load history.';
  }
});

const formatDate = (iso) => {
  const d = new Date(iso);
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
};
</script>

<template>
  <ScrollContainer class="history-scroll">
    <div class="history-inner">
      <h2 class="history-heading">History</h2>
      <p v-if="error" class="history-error">{{ error }}</p>
      <div v-else-if="history.length === 0" class="history-empty">No claims yet.</div>
      <div v-else class="osrs-panel history-list">
        <div v-for="entry in history" :key="entry.id" class="history-entry">
          <span class="claimer">{{ entry.claimer }}</span>
          <div class="entry-claimed-row">
            <span class="entry-sep">claimed</span>
            <span class="points">{{ entry.points }} pts</span>
          </div>
          <span class="task-name">{{ entry.task }}</span>
          <div class="entry-footer">
            <span v-if="entry.contributors.length" class="contributors">With: {{ entry.contributors.join(', ') }}</span>
            <span class="entry-date">{{ formatDate(entry.claimedAt) }}</span>
          </div>
        </div>
      </div>
    </div>
  </ScrollContainer>
</template>

<style scoped>
.history-scroll {
  width: 100%;
}
.history-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.5rem;
}
.history-heading {
  font-family: 'RuneScapeBold', serif;
  font-size: 2rem;
  font-weight: 700;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
}
.history-list {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
  width: 100%;
  max-height: 20rem;
  overflow-y: auto;
}
.history-entry {
  display: flex;
  flex-direction: column;
  padding: 0.4rem 0;
  border-bottom: 2px solid;
  border-image: linear-gradient(90deg, transparent, #736a5e, transparent) 1;
  font-family: 'RuneScapeSmall', serif;
  font-size: 1.5rem;
  line-height: 1;
}
.history-entry:last-child {
  border-bottom: none;
}
.claimer {
  display: block;
  color: #ff981f;
  font-weight: bold;
  line-height: 1;
}
.entry-claimed-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  line-height: 1;
}
.entry-sep {
  color: #c8b878;
}
.points {
  color: #aaffaa;
  font-weight: bold;
}
.task-name {
  display: block;
  color: #ffcc44;
  line-height: 1;
}
.entry-footer {
  display: flex;
  justify-content: flex-start;
  gap: 0.75rem;
  font-size: 1rem;
  color: #8f8f6f;
  line-height: 1;
}
.contributors {
  color: #9f9f7f;
}
.entry-date {
  color: #8f8f6f;
}
.history-empty,
.history-error {
  font-family: 'RuneScapeSmall', serif;
  color: #c8b878;
  padding: 0.5rem;
}
.history-error {
  color: #ff4444;
}
</style>

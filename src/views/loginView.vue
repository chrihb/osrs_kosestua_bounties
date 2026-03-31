<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";
import { useBountyStore } from "@/stores/bountyStore.js";
import { fetchUserData } from "@/services/dataService.js";
import LoadingSpinner from "@/components/LoadingSpinner.vue";
import PinDots from "@/components/PinDots.vue";
import Numpad from "@/components/Numpad.vue";

const router = useRouter();
const authStore = useAuthStore();
const bountyStore = useBountyStore();

// step: 'select' | 'pin'
const step = ref('select');
const users = ref({});        // { key: { name, ... } }
const selectedKey = ref('');
const selectedName = ref('');
const pin = ref('');
const error = ref('');
const loading = ref(false);
const usersLoading = ref(Object.keys(bountyStore.players).length === 0);

onMounted(() => {
  // Show cached players instantly, then refresh in background
  users.value = bountyStore.players;
  fetchUserData()
    .then(data => { users.value = data; })
    .catch(() => {})
    .finally(() => { usersLoading.value = false; });
  window.addEventListener('keydown', handleKeydown);
});
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));

function selectUser(key, name) {
  selectedKey.value = key;
  selectedName.value = name;
  error.value = '';
  step.value = 'pin';
}

function handleInput(digit) {
  if (loading.value) return;
  if (pin.value.length < 4) pin.value += digit;
  if (pin.value.length === 4) submit();
}

function handleDelete() {
  error.value = '';
  pin.value = pin.value.slice(0, -1);
}

async function submit() {
  loading.value = true;
  error.value = '';
  bountyStore.loadFromRemote().catch(() => {});
  try {
    const result = await authStore.login(selectedKey.value, pin.value);
    if (result.success) {
      router.push('/home');
    } else {
      error.value = result.error;
      pin.value = '';
    }
  } finally {
    loading.value = false;
  }
}

function handleKeydown(e) {
  if (step.value === 'select') return;
  if (e.key >= '0' && e.key <= '9') handleInput(e.key);
  else if (e.key === 'Backspace') handleDelete();
}
</script>

<template>
  <div class="login-page">
    <div class="osrs-scroll" style="width: 22rem;">
      <div class="osrs-scroll-top" />
      <div class="osrs-scroll-middle login-content">
        <h2 class="modal-heading">Login</h2>

        <!-- User selection step -->
        <template v-if="step === 'select'">
          <p class="sub-heading">Select your character</p>
          <div class="osrs-panel user-list">
            <div
                v-for="(user, key) in users"
                :key="key"
                class="osrs-divider user-row"
                @click="selectUser(key, user.name)"
            >
              {{ user.name }}
            </div>
            <LoadingSpinner v-if="usersLoading" :small="true" class="list-spinner" />
            <p v-else-if="!Object.keys(users).length" class="empty-text">No users registered yet.</p>
          </div>
          <button class="osrs-btn" style="width: 100%;" @click="router.push('/register')">
            Register
          </button>
        </template>

        <!-- PIN step -->
        <template v-else>
          <p class="sub-heading">{{ selectedName }}</p>

          <PinDots :length="pin.length" />

          <p v-if="error" class="error-text">{{ error }}</p>
          <LoadingSpinner v-if="loading" />

          <Numpad :disabled="loading" @input="handleInput" @delete="handleDelete" />

          <button class="osrs-btn" style="width: 100%;" @click="step = 'select'; pin = ''; error = ''">
            Back
          </button>
        </template>

      </div>
      <div class="osrs-scroll-bottom" />
    </div>
  </div>
</template>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
.login-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.25rem;
  padding-top: 1rem;
  padding-bottom: 1rem;
}
.user-list {
  width: 100%;
  display: flex;
  flex-direction: column;
}
.user-row {
  padding: 0.5rem 0.25rem;
  cursor: pointer;
  font-family: 'RuneScapeBold', serif;
  font-size: 1.1rem;
  color: #ffff00;
}
.user-row:hover {
  background: rgba(255, 200, 60, 0.12);
  outline: 1px solid rgba(255, 200, 60, 0.3);
}
.list-spinner {
  display: block;
  margin: 0.25rem auto;
}
.empty-text {
  font-family: 'RuneScapeSmall', serif;
  color: #736a5e;
  font-size: 0.9rem;
  text-align: center;
  padding: 0.5rem 0;
}
.sub-heading {
  font-family: 'RuneScapeBold', serif;
  font-size: 1.2rem;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
}
.error-text {
  font-family: 'RuneScapeSmall', serif;
  color: red;
  font-size: 0.95rem;
  text-align: center;
  margin: 0;
}
</style>

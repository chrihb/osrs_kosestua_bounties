<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useBountyStore } from "@/stores/bountyStore.js";

const router = useRouter();
const bountyStore = useBountyStore();

// step: 'username' | 'pin' | 'confirm'
const step = ref('username');
const username = ref('');
const pin = ref('');
const confirmPin = ref('');
const error = ref('');
const loading = ref(false);

function handleUsernameSubmit() {
  const trimmed = username.value.trim();
  if (!trimmed) {
    error.value = 'Please enter a username.';
    return;
  }
  error.value = '';
  step.value = 'pin';
}

function handleInput(digit) {
  if (step.value === 'pin') {
    if (pin.value.length < 4) pin.value += digit;
    if (pin.value.length === 4) {
      error.value = '';
      step.value = 'confirm';
    }
  } else if (step.value === 'confirm') {
    if (confirmPin.value.length < 4) confirmPin.value += digit;
    if (confirmPin.value.length === 4) submit();
  }
}

function handleDelete() {
  error.value = '';
  if (step.value === 'pin') {
    pin.value = pin.value.slice(0, -1);
  } else if (step.value === 'confirm') {
    confirmPin.value = confirmPin.value.slice(0, -1);
  }
}

async function submit() {
  if (pin.value !== confirmPin.value) {
    error.value = 'PINs do not match. Try again.';
    confirmPin.value = '';
    return;
  }
  loading.value = true;
  error.value = '';
  try {
    const result = await bountyStore.registerPlayer(username.value.trim(), pin.value);
    if (!result.success) {
      error.value = result.error;
      confirmPin.value = '';
      pin.value = '';
      step.value = 'pin';
    } else {
      router.push('/');
    }
  } finally {
    loading.value = false;
  }
}

function handleKeydown(e) {
  if (step.value === 'username') return;
  if (e.key >= '0' && e.key <= '9') handleInput(e.key);
  else if (e.key === 'Backspace') handleDelete();
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));

const currentPin = () => step.value === 'pin' ? pin.value : confirmPin.value;
</script>

<template>
  <div class="login-page">
    <div class="osrs-scroll" style="width: 22rem;">
      <div class="osrs-scroll-top" />
      <div class="osrs-scroll-middle login-content">

        <h2 class="modal-heading">Register</h2>

        <!-- Username step -->
        <template v-if="step === 'username'">
          <p class="sub-heading">Choose a username</p>
          <input
            v-model="username"
            class="osrs-input"
            type="text"
            maxlength="20"
            placeholder="Username"
            @keydown.enter="handleUsernameSubmit"
            autofocus
          />
          <p v-if="error" class="error-text">{{ error }}</p>
          <div class="btn-row">
            <button class="osrs-btn" @click="router.push('/')">Back to Login</button>
            <button class="osrs-btn" @click="handleUsernameSubmit">Continue</button>
          </div>
        </template>

        <!-- PIN / Confirm PIN steps -->
        <template v-else>
          <p class="sub-heading">
            {{ step === 'pin' ? 'Choose a 4-digit PIN' : 'Confirm your PIN' }}
          </p>

          <div class="pin-dots">
            <div
              v-for="i in 4" :key="i"
              style="width: 1rem; height: 1rem; border-radius: 50%; border: 2px solid #4a3b1f;"
              :style="{ background: currentPin().length >= i ? '#ffff00' : 'transparent' }"
            />
          </div>

          <p v-if="error" class="error-text">{{ error }}</p>
          <p v-if="loading" class="sub-heading">Registering...</p>

          <div class="numpad">
            <button
              v-for="digit in ['1','2','3','4','5','6','7','8','9','','0','⌫']"
              :key="digit"
              class="osrs-btn"
              style="width: 3.5rem; height: 3.5rem; font-size: 1.2rem;"
              :style="{ visibility: digit === '' ? 'hidden' : 'visible' }"
              :disabled="loading"
              @click="digit === '⌫' ? handleDelete() : handleInput(digit)"
            >
              {{ digit }}
            </button>
          </div>
          <div class="btn-row">
            <button class="osrs-btn" @click="router.push('/')">Back to Login</button>
          </div>
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
.pin-dots {
  display: flex;
  gap: 0.75rem;
}
.numpad {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
}
.sub-heading {
  font-family: 'RuneScapeBold', serif;
  font-size: 1.2rem;
  color: #ff981f;
  text-shadow: 1px 1px 0 #000;
  text-align: center;
}
.osrs-input::placeholder {
  color: #ffff00;
  opacity: 0.5;
}
.btn-row {
  display: flex;
  gap: 0.5rem;
  justify-content: space-between;
  width: 100%;
}
.error-text {
  font-family: 'RuneScapeSmall', serif;
  color: red;
  font-size: 0.95rem;
  text-align: center;
  margin: 0;
}
</style>

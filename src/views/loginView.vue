<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();

const pin = ref('');
const error = ref(false);

function handleInput(digit) {
  if (pin.value.length < 4) {
    pin.value += digit;
  }
  if (pin.value.length === 4) {
    submit();
  }
}

function handleDelete() {
  pin.value = pin.value.slice(0, -1);
  error.value = false;
}

function submit() {
  const success = authStore.login(pin.value);
  if (success) {
    router.push("/home");
  } else {
    error.value = true;
    pin.value = '';
  }
}

function handleKeydown(e) {
  if (e.key >= '0' && e.key <= '9') {
    handleInput(e.key);
  } else if (e.key === 'Backspace') {
    handleDelete();
  }
}

onMounted(() => window.addEventListener('keydown', handleKeydown));
onUnmounted(() => window.removeEventListener('keydown', handleKeydown));
</script>

<template>
  <div class="login-page">
    <div class="osrs-scroll" style="width: 22rem;">
      <div class="osrs-scroll-top" />
      <div class="osrs-scroll-middle login-content">
        <h2 style="font-family: 'RuneScapeBold', serif; font-size: 1.5rem; color: #ffff00; text-align: center;">
          Enter PIN
        </h2>

        <!-- PIN dots -->
        <div class="pin-dots">
          <div v-for="i in 4" :key="i"
               style="width: 1rem; height: 1rem; border-radius: 50%; border: 2px solid #4a3b1f;"
               :style="{ background: pin.length >= i ? '#ffff00' : 'transparent' }"
          />
        </div>

        <p v-if="error" style="font-family: 'RuneScapeSmall', serif; color: red; font-size: 0.95rem;">
          Incorrect PIN. Try again.
        </p>

        <!-- Numpad -->
        <div class="numpad">
          <button
              v-for="digit in ['1','2','3','4','5','6','7','8','9','','0','⌫']"
              :key="digit"
              class="osrs-btn"
              style="width: 3.5rem; height: 3.5rem; font-size: 1.2rem;"
              :style="{ visibility: digit === '' ? 'hidden' : 'visible' }"
              @click="digit === '⌫' ? handleDelete() : handleInput(digit)"
          >
            {{ digit }}
          </button>
        </div>
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
  gap: 1.5rem;
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
</style>

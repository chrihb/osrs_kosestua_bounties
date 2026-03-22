<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/authStore.js";

const router = useRouter();
const authStore = useAuthStore();
if (!authStore.hasPlayers) authStore.loadFromRemote();
const error = ref(false);
const selected = ref("Select user");
const password = ref(null);

function handleInput() {
  console.log(JSON.stringify(selected.value));
  if (password.value === selected.value.password) {
    authStore.login(selected.value.name.toLowerCase());
    //salt hash whatever
    router.push("/home");
  } else {
    error.value = true;
    password.value = null;
  }
}

</script>

<template>
  <div class="login-page">
    <div class="osrs-scroll" style="width: 22rem;">
      <div class="osrs-scroll-top" />
      <div class="osrs-scroll-middle login-content">
        <h2 style="font-family: 'RuneScapeBold', serif; font-size: 1.5rem; color: #ffff00; text-align: center;">
          Log in to Kosestua
        </h2>
        <select class="osrs-btn"
          style="font-family: 'RuneScapeBold', serif; font-size: 1.5rem; color: #ffff00; text-align: center;"
          v-model="selected">
          <option disabled value="Select user">Select user</option>
          <option style="font-family: 'RuneScapeBold', serif; font-size: 1.5rem; color: #ffff00; text-align: center;"
            v-for="option in authStore.players" :value="option">
            {{ option.name }}
          </option>
        </select>
        <input class="osrs-input" v-model="password" placeholder="password" />

        <button class="osrs-btn"
          style="font-family: 'RuneScapeBold', serif; font-size: 1.5rem; color: #ffff00; text-align: center;"
          @click="handleInput()">
          Log in
        </button>

        <p v-if="error" style="font-family: 'RuneScapeSmall', serif; color: red; font-size: 0.95rem;">
          Incorrect password.
        </p>
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

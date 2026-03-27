<script setup>
import { useAuthStore } from "@/stores/authStore.js";
import { useRouter } from "vue-router";

const authStore = useAuthStore();
const router = useRouter();

function logout() {
  authStore.logout();
  router.push('/');
}
</script>

<template>
  <div class="title-wrapper">
    <h1 class="title-text">
      <span class="title-main">Kosestua</span>
      <span class="title-sub">Bounty Challenge</span>
    </h1>
    <div class="title-divider"></div>
    <p v-if="authStore.currentUser" class="logged-in">
      Logged in as <span class="logged-in-name">{{ authStore.currentUser.name }}</span>
      &nbsp;·&nbsp;
      <span class="logout-link" @click="logout">Logout</span>
    </p>
  </div>
</template>

<style scoped>
.title-wrapper {
  text-align: center;
  padding: 0.5rem 0 0.25rem;
}
.title-text {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0;
}
.title-main {
  font-size: 4rem;
  font-weight: 700;
  color: #ff981f;
  text-shadow:
    2px 2px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000,
    0 0 12px rgba(255, 152, 31, 0.4);
  letter-spacing: 0.08em;
}
.title-sub {
  font-size: 2.2rem;
  font-weight: 700;
  color: #ff981f;
  text-shadow:
    1px 1px 0 #000,
    -1px -1px 0 #000,
    1px -1px 0 #000,
    -1px 1px 0 #000;
  letter-spacing: 0.12em;
  margin-top: -0.3rem;
}
.title-divider {
  margin: 0.4rem auto 0;
  width: 280px;
  height: 3px;
  background: linear-gradient(90deg, transparent, #736a5e, #c8a44a, #736a5e, transparent);
}
.logged-in {
  margin-top: 0.4rem;
  font-family: 'RuneScape', serif;
  font-size: 1.2rem;
  color: #a89060;
}
.logged-in-name {
  color: #ffff00;
}
.logout-link {
  color: #ff981f;
  cursor: pointer;
}
.logout-link:hover {
  color: #ffb84d;
  text-decoration: underline;
}

@media (max-width: 768px) {
  .title-main {
    font-size: 2.5rem;
  }
  .title-sub {
    font-size: 1.4rem;
  }
  .title-divider {
    width: 200px;
  }
}
</style>

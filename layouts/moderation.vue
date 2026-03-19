<script setup lang="ts">
import { useRouter } from "vue-router";
import { useModerationAuthStore } from "@moderation/stores/useModerationAuthStore";
import Button from "primevue/button";

const router = useRouter();
const authStore = useModerationAuthStore();

function logout() {
  authStore.clearToken();
  router.push("/moderation/login");
}
</script>

<template>
  <div class="moderation-layout">
    <header class="moderation-layout__header">
      <h1 class="moderation-layout__title">CRM Модерация</h1>
      <Button
        label="Выйти"
        icon="pi pi-sign-out"
        severity="secondary"
        text
        @click="logout"
      />
    </header>
    <main class="moderation-layout__main">
      <NuxtPage />
    </main>
  </div>
</template>

<style scoped>
.moderation-layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background: var(--surface-ground);
}
.moderation-layout__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0.75rem 1.5rem;
  background: var(--surface-card);
  border-bottom: 1px solid var(--surface-border);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.06);
}
.moderation-layout__title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--text-color);
}
.moderation-layout__main {
  flex: 1;
  padding: 1.5rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}
</style>

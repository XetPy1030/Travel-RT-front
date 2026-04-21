<script setup lang="ts">
import { onMounted } from "vue";
import { useModerationNews } from "@moderation/composables/useModerationNews";
import ModerationNewsList from "@moderation/components/ModerationNewsList.vue";
import ProgressSpinner from "primevue/progressspinner";
import Button from "primevue/button";

useHead({ title: "Модерация | Ожидающие новости" });

definePageMeta({ layout: "moderation" });

const {
  pendingList,
  loading,
  error,
  approvingAll,
  fetchPendingList,
  approveAllPending,
} = useModerationNews();

onMounted(() => {
  fetchPendingList(100);
});
</script>

<template>
  <div class="moderation-news-page">
    <div class="moderation-news-page__header">
      <h2 class="moderation-news-page__title">Ожидающие модерации</h2>
      <Button
        v-if="pendingList.length"
        label="Принять все"
        icon="pi pi-check"
        severity="success"
        :loading="approvingAll"
        :disabled="loading || approvingAll"
        @click="approveAllPending"
      />
    </div>
    <div v-if="loading" class="moderation-news-page__loading">
      <ProgressSpinner />
    </div>
    <p v-else-if="error" class="moderation-news-page__error">
      {{ error }}
    </p>
    <div v-else-if="!pendingList.length" class="moderation-news-page__empty">
      <i class="pi pi-inbox" style="font-size: 3rem; color: var(--surface-500)" />
      <p>Нет новостей в очереди</p>
    </div>
    <ModerationNewsList v-else :items="pendingList" />
  </div>
</template>

<style scoped>
.moderation-news-page__title {
  margin: 0;
  font-size: 1.35rem;
  font-weight: 600;
  color: var(--text-color);
}
.moderation-news-page__header {
  margin: 0 0 1.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
.moderation-news-page__loading,
.moderation-news-page__empty {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 200px;
  gap: 1rem;
  color: var(--text-color-secondary);
}
.moderation-news-page__error {
  color: var(--red-500);
  margin: 0;
}
</style>

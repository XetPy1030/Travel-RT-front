<script setup lang="ts">
import { computed, onMounted, watch } from "vue";
import { useRoute } from "vue-router";
import { useModerationNews } from "@moderation/composables/useModerationNews";
import ModerationNewsDetails from "@moderation/components/ModerationNewsDetails.vue";
import ModerationNewsActions from "@moderation/components/ModerationNewsActions.vue";
import ProgressSpinner from "primevue/progressspinner";

const route = useRoute();
const id = computed(() => Number(route.params.id));

useHead({ title: "Модерация | Просмотр новости" });

definePageMeta({ layout: "moderation" });

const {
  currentDetail,
  loadingDetail,
  error,
  fetchNewsDetail,
  removeFromPending,
} = useModerationNews();

onMounted(() => {
  if (id.value) fetchNewsDetail(id.value);
});

watch(id, (newId) => {
  if (newId) fetchNewsDetail(newId);
});
</script>

<template>
  <div class="moderation-detail-page">
    <div v-if="loadingDetail" class="moderation-detail-page__loading">
      <ProgressSpinner />
    </div>
    <p v-else-if="error" class="moderation-detail-page__error">{{ error }}</p>
    <template v-else-if="currentDetail">
      <ModerationNewsDetails :news="currentDetail" />
      <ModerationNewsActions
        :news-id="currentDetail.id"
        @done="removeFromPending(currentDetail.id)"
      />
    </template>
  </div>
</template>

<style scoped>
.moderation-detail-page__loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}
.moderation-detail-page__error {
  color: var(--red-500);
  margin: 0;
}
</style>

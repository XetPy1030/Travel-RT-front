<script setup lang="ts">
import { useRouter } from "vue-router";
import type { NewsRead } from "@/api/generated-moderation";
import { formatDateRu } from "@/utils/date";

defineProps<{ items: NewsRead[] }>();

const router = useRouter();

function openDetail(id: number) {
  router.push(`/moderation/news/${id}`);
}

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const d = formatDateRu(dateStr);
    return `${d.fullDate}`;
  } catch {
    return dateStr;
  }
}
</script>

<template>
  <div class="moderation-list">
    <div
      v-for="item in items"
      :key="item.id"
      class="moderation-list__row"
      role="button"
      tabindex="0"
      @click="openDetail(item.id)"
      @keydown.enter="openDetail(item.id)"
    >
      <span class="moderation-list__id">#{{ item.id }}</span>
      <span class="moderation-list__title">{{ item.parsed_title }}</span>
      <span class="moderation-list__meta">
        {{ item.external_source || "—" }} · {{ formatDate(item.parsed_created_at) }}
      </span>
      <i class="pi pi-chevron-right moderation-list__arrow" />
    </div>
  </div>
</template>

<style scoped>
.moderation-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}
.moderation-list__row {
  display: grid;
  grid-template-columns: auto 1fr auto auto;
  align-items: center;
  gap: 1rem;
  padding: 1rem 1.25rem;
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 8px;
  cursor: pointer;
  transition: background 0.2s, box-shadow 0.2s;
}
.moderation-list__row:hover {
  background: var(--surface-hover);
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.06);
}
.moderation-list__id {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
  font-weight: 500;
}
.moderation-list__title {
  font-weight: 500;
  color: var(--text-color);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.moderation-list__meta {
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}
.moderation-list__arrow {
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
</style>

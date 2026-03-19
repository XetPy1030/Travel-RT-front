<script setup lang="ts">
import { useRouter } from "vue-router";
import type { NewsRead } from "@/api/generated-moderation";
import { formatDateRu } from "@/utils/date";
import { getTopicLabel, getModerationStatusLabel } from "@moderation/constants";
import Button from "primevue/button";

defineProps<{ news: NewsRead | null }>();

const router = useRouter();

function formatDate(dateStr?: string) {
  if (!dateStr) return "—";
  try {
    const d = formatDateRu(dateStr);
    return `${d.fullDate} — ${d.weekday}`;
  } catch {
    return dateStr;
  }
}

function goBack() {
  router.push("/moderation/news");
}
</script>

<template>
  <div v-if="news" class="moderation-details">
    <div class="moderation-details__toolbar">
      <Button
        label="К списку"
        icon="pi pi-arrow-left"
        text
        severity="secondary"
        @click="goBack"
      />
    </div>
    <article class="moderation-details__card">
      <div class="moderation-details__content">
        <p class="moderation-details__meta">
          #{{ news.id }} · {{ news.external_source || "—" }} · {{ formatDate(news.parsed_created_at) }}
        </p>
        <h1 class="moderation-details__title">{{ news.parsed_title }}</h1>
        <p v-if="news.parsed_topic" class="moderation-details__topic">
          Тема: {{ getTopicLabel(news.parsed_topic) }}
        </p>
        <p v-if="news.parsed_description" class="moderation-details__description">
          {{ news.parsed_description }}
        </p>
        <p v-if="news.moderation_status" class="moderation-details__status">
          Статус: {{ getModerationStatusLabel(news.moderation_status) }}
        </p>
        <p v-if="news.moderation_comment" class="moderation-details__comment">
          Комментарий модератора: {{ news.moderation_comment }}
        </p>
        <a
          v-if="news.external_url"
          :href="news.external_url"
          target="_blank"
          rel="noopener noreferrer"
          class="moderation-details__link"
        >
          Источник: {{ news.external_url }}
        </a>
        <p v-if="news.external_id" class="moderation-details__external-id">
          ID в источнике: {{ news.external_id }}
        </p>
      </div>
    </article>
  </div>
</template>

<style scoped>
.moderation-details {
  max-width: 800px;
}
.moderation-details__toolbar {
  margin-bottom: 1rem;
}
.moderation-details__card {
  background: var(--surface-card);
  border: 1px solid var(--surface-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.06);
}
.moderation-details__content {
  padding: 1.5rem;
}
.moderation-details__meta {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
.moderation-details__title {
  margin: 0 0 1rem;
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-color);
}
.moderation-details__topic {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
.moderation-details__description {
  margin: 0 0 1rem;
  font-size: 1rem;
  line-height: 1.5;
  color: var(--text-color);
}
.moderation-details__status,
.moderation-details__comment {
  margin: 0 0 0.5rem;
  font-size: 0.9rem;
  color: var(--text-color-secondary);
}
.moderation-details__link {
  display: block;
  margin: 1rem 0 0;
  font-size: 0.9rem;
  color: var(--primary-color);
  word-break: break-all;
}
.moderation-details__link:hover {
  text-decoration: underline;
}
.moderation-details__external-id {
  margin: 0.5rem 0 0;
  font-size: 0.85rem;
  color: var(--text-color-secondary);
}
</style>

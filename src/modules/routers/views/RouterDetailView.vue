<template>
  <div class="router-detail" v-if="currentRouter">
    <div class="header">
      <BackButton />
      <h1>{{ currentRouter.title }}</h1>
    </div>

    <div class="content">
      <div class="sidebar">
        <div class="image-section">
          <img
              v-if="currentRouter.image"
              :src="currentRouter.image"
              :alt="currentRouter.title"
              class="main-image"
          />
          <div v-else class="image-placeholder">
            <i class="pi pi-image"/>
          </div>
        </div>

        <div class="meta-section">
          <div class="meta">
            <Tag
                v-if="currentRouter.difficulty"
                :value="getDifficultyLabel(currentRouter.difficulty)"
                :severity="getDifficultySeverity(currentRouter.difficulty)"
            />
            <span class="duration">
              <i class="pi pi-clock"/>
              {{ formatDuration(currentRouter.duration) }}
            </span>
          </div>

          <div class="location">
            <Tag icon="pi pi-map-marker" :value="locationName"/>
          </div>
        </div>
      </div>

      <div class="main-content">
        <div class="description">
          <div v-html="processedDescription"/>
        </div>
      </div>
    </div>

    <div class="footer-meta">
      <div class="meta-item">
        <i class="pi pi-calendar"></i>
        <span>Создано: {{ formatDate(currentRouter.created_at) }}</span>
      </div>
      <div class="meta-item">
        <i class="pi pi-refresh"></i>
        <span>Обновлено: {{ formatDate(currentRouter.updated_at) }}</span>
      </div>
    </div>
  </div>

  <div v-else-if="loading" class="loading">
    <ProgressSpinner/>
  </div>

  <div v-else-if="error" class="error">
    <Message severity="error">{{ error }}</Message>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import { useRouters } from '../composables/useRouters'
import type {ApiRoutersListDifficultyEnum} from '@/api/generated'
import { processHtmlContent } from '@/utils/htmlUtils'
import {MEDIA_BASE_URL} from '@/config'
import BackButton from "@components/BackButton.vue";

const route = useRoute()
const { currentRouter, loading, error, fetchRouterById } = useRouters()

const locationName = computed(() => {
  if (!currentRouter.value) return ''
  return currentRouter.value.settlement_name || currentRouter.value.district_name || ''
})

const processedDescription = computed(() => {
  if (!currentRouter.value?.full_description) return ''
  return processHtmlContent(currentRouter.value.full_description, MEDIA_BASE_URL)
})

const getDifficultyLabel = (difficulty: ApiRoutersListDifficultyEnum) => {
  switch (difficulty) {
    case 'easy':
      return 'Легкий'
    case 'medium':
      return 'Средний'
    case 'hard':
      return 'Сложный'
    default:
      return difficulty
  }
}

const getDifficultySeverity = (difficulty: ApiRoutersListDifficultyEnum) => {
  switch (difficulty) {
    case 'easy':
      return 'success'
    case 'medium':
      return 'warning'
    case 'hard':
      return 'danger'
    default:
      return 'info'
  }
}

const formatDuration = (duration: string) => {
  const [hours, minutes] = duration.split(':').map(Number)
  if (hours > 0) {
    return `${hours} ч ${minutes} мин`
  }
  return `${minutes} мин`
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

// Fetch router data when component is mounted
fetchRouterById(Number(route.params.id))
</script>

<style scoped>
.router-detail {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 2rem;
}

.content {
}

.main-content {
  flex: 1;
  min-width: 0;
}

.sidebar {
  width: 400px;
  float: right;
  background-color: var(--surface-card);
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  border: 1px solid var(--surface-border);
  margin-left: 1rem;
}

.image-section {
  position: relative;
  aspect-ratio: 16/9;
  min-height: 180px;
  max-height: 320px;
  border-radius: 8px;
  overflow: hidden;
  margin-bottom: 1.5rem;
  border: 1px solid var(--surface-border, #e0e0e0);
  background: #f8f8f8;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--surface-ground);
  color: var(--text-color-secondary);
}

.image-placeholder i {
  font-size: 3rem;
}

.meta-section {
  display: flex;
  flex-direction: column;
  /* gap: 0.5rem; */
  /* padding: 1rem; */
  background-color: var(--surface-ground);
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.meta {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  /* margin-top: 2rem; */
  padding: 1rem;
  background-color: var(--surface-ground);
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.location {
  padding: 0.5rem;
  background-color: var(--surface-card);
  border-radius: 6px;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color-secondary);
  padding: 0.5rem;
  background-color: var(--surface-card);
  border-radius: 6px;
}

.description {
  margin-bottom: 2rem;
}

.description :deep(h1),
.description :deep(h2),
.description :deep(h3),
.description :deep(h4),
.description :deep(h5),
.description :deep(h6) {
  margin: 0 0 0.5em;
  color: var(--text-color);
  font-weight: 600;
}

.description :deep(p) {
  margin-bottom: 1em;
}

.description :deep(ul),
.description :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.description :deep(li) {
  margin-bottom: 0.5em;
}

.description :deep(a) {
  color: var(--primary-color);
  text-decoration: none;
  transition: color 0.3s;
}

.description :deep(a:hover) {
  text-decoration: underline;
}

.description :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
}

.description :deep(blockquote) {
  border-left: 4px solid var(--primary-color);
  padding-left: 1em;
  margin: 1em 0;
  color: var(--text-color-secondary);
  font-style: italic;
}

.description :deep(code) {
  background-color: var(--surface-ground);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.description :deep(pre) {
  background-color: var(--surface-ground);
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
}

.description :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.description :deep(th),
.description :deep(td) {
  border: 1px solid var(--surface-border);
  padding: 0.5em;
  text-align: left;
}

.description :deep(th) {
  background-color: var(--surface-ground);
  font-weight: 600;
}

.footer-meta {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  padding: 1rem;
  background-color: var(--surface-ground);
  border-radius: 8px;
  border: 1px solid var(--surface-border);
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-color-secondary);
  padding: 0.75rem 1rem;
  background-color: var(--surface-card);
  border-radius: 6px;
  transition: background-color 0.2s;
}

.meta-item:hover {
  background-color: var(--surface-hover);
}

.meta-item i {
  color: var(--primary-color);
  font-size: 1.1rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.error {
  margin: 2rem;
}

@media (max-width: 1200px) {
  .router-detail {
    padding: 1rem;
    max-width: 100%;
  }
  .sidebar {
    width: 320px;
    margin-left: 0.5rem;
    padding: 1rem;
  }
  img {
    min-height: 120px;
    max-height: 180px;
  }
}

@media (max-width: 960px) {
  .content {
    flex-direction: column;
  }

  .sidebar {
    width: 100%;
  }
}

@media (max-width: 900px) {
  .router-detail {
    padding: 0.5rem;
  }
  .content {
    flex-direction: column;
  }
  .sidebar {
    width: 100%;
    float: none;
    margin-left: 0;
    margin-bottom: 1rem;
    padding: 1rem;
  }
  .main-content {
    min-width: 0;
  }
}

@media (max-width: 600px) {
  .router-detail {
    padding: 0.25rem;
  }
  .header h1 {
    font-size: 1.3rem;
  }
  .footer-meta {
    flex-direction: column;
    gap: 0.5rem;
    padding: 0.5rem;
  }
  .meta-item {
    padding: 0.5rem 0.75rem;
    font-size: 0.95rem;
  }
  .sidebar {
    padding: 0.5rem;
  }
  .description {
    margin-bottom: 1rem;
  }
}

</style> 
<template>
  <div class="router-card">
    <div class="image-section">
      <img
        v-if="props.router.image"
        :src="props.router.image"
        :alt="props.router.title"
        class="main-image"
      />
      <div v-else class="image-placeholder">
        <i class="pi pi-image" />
      </div>
    </div>

    <div class="content">
      <h3 class="title">{{ props.router.title }}</h3>
      <p class="description">{{ props.router.short_description }}</p>

      <div class="meta">
        <Tag 
          v-if="props.router.difficulty"
          :value="getDifficultyLabel(props.router.difficulty)"
          :severity="getDifficultySeverity(props.router.difficulty)"
        />
        <span class="duration">
          <i class="pi pi-clock" />
          {{ formatDuration(props.router.duration) }}
        </span>
      </div>

      <div class="location">
        <Tag icon="pi pi-map-marker" :value="locationName" />
      </div>

      <Button
        label="Подробнее"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="navigateToDetail"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import Button from 'primevue/button'
import Tag from 'primevue/tag'
import type { RouterList } from '@/api/generated'
import type { ApiRoutersListDifficultyEnum } from '@/api/generated'

const props = defineProps<{
  router: RouterList
}>()

const router = useRouter()

const locationName = computed(() => {
  return props.router.settlement_name || props.router.district_name || ''
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

const navigateToDetail = () => {
  router.push(`/routers/${props.router.id}`)
}
</script>

<style scoped>
.router-card {
  display: flex;
  flex-direction: column;
  background: var(--surface-card);
  border-radius: 8px;
  overflow: hidden;
  transition: transform 0.2s, box-shadow 0.2s;
}

.router-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.image-section {
  position: relative;
  aspect-ratio: 16/9;
}

.main-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
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
  font-size: 2rem;
}

.content {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
}

.title {
  margin: 0;
  font-size: 1.25rem;
  font-weight: 600;
}

.description {
  margin: 0;
  color: var(--text-color-secondary);
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex-grow: 1;
}

.meta {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.duration {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: var(--text-color-secondary);
}

.location {
  margin-top: auto;
}

:deep(.p-button) {
  margin-top: auto;
}
</style> 
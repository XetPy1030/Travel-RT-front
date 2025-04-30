<template>
  <div class="place-detail">
    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else-if="currentPlace" class="content">
      <div class="gallery">
        <Galleria 
          :value="currentPlace.images" 
          :numVisible="5"
          :circular="true" 
          :autoPlay="true" 
          :transitionInterval="3000"
          :showThumbnails="true"
          :showIndicators="true"
        >
          <template #item="slotProps">
            <img :src="slotProps.item.image" :alt="currentPlace.title" class="main-image" />
          </template>
          <template #thumbnail="slotProps">
            <img :src="slotProps.item.image" :alt="currentPlace.title" class="thumbnail-image" />
          </template>
        </Galleria>
      </div>

      <div class="info">
        <h1>{{ currentPlace.title }}</h1>
        
        <div v-if="currentPlace.district_name || currentPlace.settlement_name" class="location">
          <Tag v-if="currentPlace.district_name" :value="currentPlace.district_name" severity="info" />
          <Tag v-if="currentPlace.settlement_name" :value="currentPlace.settlement_name" severity="success" />
        </div>

        <div class="description">
          <h2>Описание</h2>
          <div v-html="processedDescription"></div>
        </div>

        <div class="meta">
          <div class="meta-item">
            <i class="pi pi-calendar"></i>
            <span>Создано: {{ formatDate(currentPlace.created_at) }}</span>
          </div>
          <div class="meta-item">
            <i class="pi pi-refresh"></i>
            <span>Обновлено: {{ formatDate(currentPlace.updated_at) }}</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'
import { usePlaces } from '../composables/usePlaces'
import Galleria from 'primevue/galleria'
import Tag from 'primevue/tag'
import ProgressSpinner from 'primevue/progressspinner'
import { processHtmlContent } from '@/utils/htmlUtils'
import { MEDIA_BASE_URL } from '@/config'

const route = useRoute()
const { currentPlace, loading, error, fetchPlaceById } = usePlaces()

const processedDescription = computed(() => {
  if (!currentPlace.value?.full_description) return ''
  return processHtmlContent(currentPlace.value.full_description, MEDIA_BASE_URL)
})

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('ru-RU', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}

onMounted(() => {
  const placeId = Number(route.params.id)
  if (placeId) {
    fetchPlaceById(placeId)
  }
})
</script>

<style scoped>
.place-detail {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 400px;
}

.content {
  display: grid;
  gap: 2rem;
}

.gallery {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.main-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
}

.thumbnail-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.info {
  padding: 1rem;
}

.location {
  display: flex;
  gap: 1rem;
  margin: 1rem 0;
}

.description {
  margin: 2rem 0;
}

.description h2 {
  margin-bottom: 1rem;
  color: #333;
}

.meta {
  display: flex;
  gap: 2rem;
  color: #666;
  font-size: 0.9rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-item i {
  color: #888;
}

.description :deep(h1),
.description :deep(h2),
.description :deep(h3),
.description :deep(h4),
.description :deep(h5),
.description :deep(h6) {
  margin: 0 0 0.5em;
  color: #333;
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
  color: #2196F3;
  text-decoration: none;
  transition: color 0.3s;
}

.description :deep(a:hover) {
  color: #1976D2;
  text-decoration: underline;
}

.description :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
}

.description :deep(blockquote) {
  border-left: 4px solid #2196F3;
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
  font-style: italic;
}

.description :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.description :deep(pre) {
  background-color: #f5f5f5;
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
  border: 1px solid #ddd;
  padding: 0.5em;
  text-align: left;
}

.description :deep(th) {
  background-color: #f5f5f5;
  font-weight: 600;
}
</style> 
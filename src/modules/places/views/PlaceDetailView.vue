<template>
  <div class="place-detail">
    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else-if="currentPlace" class="content">
      <BackButton />
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
import BackButton from "@components/BackButton.vue";

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
  transition: padding 0.3s ease;
}

.loading,
.error {
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
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  background: var(--surface-card, #fff);
  transition: box-shadow 0.3s ease;
}
.gallery:hover {
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
}

.main-image {
  width: 100%;
  max-height: 500px;
  object-fit: cover;
  transition: transform 0.3s ease;
}
.main-image:hover {
  transform: scale(1.02);
}

.thumbnail-image {
  width: 55px;
  height: 55px;
  object-fit: cover;
  border-radius: 6px;
}

.info {
  padding: 1.5rem;
  background: var(--surface-card, #fff);
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
  border: 1px solid var(--surface-border, #e0e0e0);
}

.info h1 {
  font-size: 1.8rem;
  color: var(--text-color, #222);
  margin-bottom: 1rem;
}

.location {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin: 1.5rem 0;
}

.description {
  margin: 2rem 0;
}

.description h2 {
  margin-bottom: 1rem;
  color: var(--primary-color, #1976D2);
  font-size: 1.4rem;
}

.meta {
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  color: var(--text-color-secondary, #666);
  font-size: 0.95rem;
  margin-top: 1rem;
}

.meta-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.meta-item i {
  color: var(--primary-color, #1976D2);
}

/* === 📱 Адаптив === */

@media (max-width: 1200px) {
  .place-detail {
    padding: 1.5rem;
    max-width: 100%;
  }
  .main-image {
    max-height: 420px;
  }
  .thumbnail-image {
    width: 48px;
    height: 48px;
  }
}

@media (max-width: 960px) {
  .content {
    display: flex;
    flex-direction: column;
  }
  .gallery {
    order: -1;
  }
  .info {
    padding: 1.25rem;
  }
  .info h1 {
    font-size: 1.6rem;
  }
  .main-image {
    max-height: 380px;
  }
}

@media (max-width: 768px) {
  .place-detail {
    padding: 1rem;
  }
  .info {
    padding: 1rem;
  }
  .info h1 {
    font-size: 1.4rem;
  }
  .description h2 {
    font-size: 1.2rem;
  }
  .meta {
    gap: 1rem;
  }
  .main-image {
    max-height: 320px;
  }
}

@media (max-width: 600px) {
  .place-detail {
    padding: 0.75rem;
  }
  .info {
    border-radius: 8px;
    padding: 0.75rem;
  }
  .info h1 {
    font-size: 1.25rem;
  }
  .location {
    flex-direction: column;
    gap: 0.75rem;
  }
  .description {
    margin: 1rem 0;
  }
  .main-image {
    max-height: 280px;
  }
  .thumbnail-image {
    width: 42px;
    height: 42px;
  }
  .meta {
    flex-direction: column;
    gap: 0.75rem;
    font-size: 0.9rem;
  }
  .meta-item {
    justify-content: flex-start;
  }
}

@media (max-width: 400px) {
  .place-detail {
    padding: 0.5rem;
  }
  .info h1 {
    font-size: 1.1rem;
  }
  .description h2 {
    font-size: 1.1rem;
  }
  .main-image {
    max-height: 220px;
  }
}
</style>

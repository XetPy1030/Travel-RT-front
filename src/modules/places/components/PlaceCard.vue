<template>
  <div class="place-card">
    <Galleria :value="place.images" :numVisible="3" :circular="true" :autoPlay="true" :transitionInterval="3000">
      <template #item="slotProps">
        <img :src="slotProps.item.image" :alt="place.title" class="place-image" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.image" :alt="place.title" class="thumbnail-image" />
      </template>
    </Galleria>
    
    <div class="place-info">
      <h3>{{ place.title }}</h3>
      <p class="short-description">{{ place.short_description }}</p>
      <div class="location-info">
        <span class="location">{{ locationName }}</span>
      </div>
      <Button label="Подробнее" @click="$router.push(`/places/${place.id}`)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import type { PlaceList } from '@/api/generated'
import Galleria from 'primevue/galleria'
import Button from 'primevue/button'

const props = defineProps<{
  place: PlaceList
}>()

const locationName = computed(() => {
  if (props.place.district_name) return props.place.district_name
  return props.place.settlement_name || ''
})
</script>

<style scoped>
.place-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  background: var(--surface-card);
  transition: transform 0.3s ease;
}

.place-card:hover {
  transform: translateY(-5px);
}

.place-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.thumbnail-image {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.place-info {
  padding: 1rem;
}

.place-info h3 {
  margin: 0 0 0.5rem 0;
  font-size: 1.2rem;
}

.short-description {
  color: #666;
  margin-bottom: 1rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.location-info {
  margin-bottom: 1rem;
}

.location {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: #f5f5f5;
  border-radius: 4px;
  font-size: 0.9rem;
  color: #888;
}
</style> 
<template>
  <div class="card">
    <Galleria
        v-if="place.images?.length"
        :value="place.images"
        :numVisible="3"
        :circular="true"
        :autoPlay="true"
        :transitionInterval="3000"
        class="card__galleria"
    >
      <template #item="slotProps">
        <img :src="slotProps.item.image" :alt="place.title" class="card__image" />
      </template>
      <template #thumbnail="slotProps">
        <img :src="slotProps.item.image" :alt="place.title" class="card__thumbnail" />
      </template>
    </Galleria>

    <div v-else class="card__image-placeholder">
      <i class="pi pi-image" />
    </div>

    <div class="card__content">
      <p class="card__meta">{{ locationName }}</p>
      <h3 class="card__title">{{ place.title }}</h3>
      <p class="card__description">{{ place.short_description }}</p>

      <Button
          label="Подробнее"
          icon="pi pi-arrow-right"
          iconPos="right"
          class="card__button"
          @click="$router.push(`/places/${place.id}`)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, computed } from 'vue'
import Button from 'primevue/button'
import Galleria from 'primevue/galleria'
import type { PlaceList } from '@/api/generated'

const props = defineProps<{ place: PlaceList }>()

const locationName = computed(() => {
  return props.place.district_name || props.place.settlement_name || 'Без локации'
})
</script>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  background: var(--surface-card, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transition: all 0.3s ease;
  height: 100%;
}

.card:hover {
  transform: translateY(-4px);
}

/* Галерея */
.card__galleria {
  aspect-ratio: 16/9;
  background: #f5f5f5;
}

.card__image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.card__thumbnail {
  width: 50px;
  height: 50px;
  object-fit: cover;
  border-radius: 4px;
}

.card__image-placeholder {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 200px;
  background: #f5f5f5;
  color: #bbb;
  font-size: 2rem;
}

.card__content {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  flex-grow: 1;
}

.card__meta {
  font-size: 0.85rem;
  color: var(--text-color-secondary, #777);
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.card__title {
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color, #333);
}

.card__description {
  color: var(--text-color-secondary, #555);
  font-size: 0.95rem;
  line-height: 1.4;
  flex-grow: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.card__button {
  align-self: flex-start;
}

/* 📱 адаптив */
@media (max-width: 768px) {
  .card__content {
    padding: 1rem;
  }

  .card__title {
    font-size: 1.1rem;
  }

  .card__image-placeholder,
  .card__galleria {
    height: 200px;
  }
}

@media (max-width: 480px) {
  .card__image-placeholder,
  .card__galleria {
    height: 180px;
  }
}
</style>

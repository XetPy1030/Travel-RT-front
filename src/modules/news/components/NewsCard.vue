<template>
  <RouterLink
      :to="{ name: 'news-detail', params: { id: news.id }}"
      class="card-link"
  >
    <article ref="cardRef" class="card" :class="{ 'card--visible': isVisible }">
      <div class="card__image" v-if="news.imageUrl">
        <img :src="news.imageUrl" :alt="news.title" />
      </div>

      <div class="card__content">
        <p class="card__date">{{ formattedDate.fullDate }} — {{ formattedDate.weekday }}</p>
        <h3 class="card__title">{{ news.title }}</h3>
        <p class="card__description">{{ news.description }}</p>
      </div>
    </article>
  </RouterLink>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { formatDateRu } from '@/utils/date'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

const props = defineProps<{ news: NewsItem }>()

const formattedDate = computed(() => {
  const d = formatDateRu(props.news.date)
  return { fullDate: d.fullDate.toUpperCase(), weekday: d.weekday.toUpperCase() }
})

const cardRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
let observer: IntersectionObserver | null = null

onMounted(() => {
  if (!cardRef.value) return
  observer = new IntersectionObserver((entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting) {
        isVisible.value = true
        observer?.unobserve(e.target)
      }
    })
  })
  observer.observe(cardRef.value)
})

onBeforeUnmount(() => observer?.disconnect())
</script>

<style scoped>
.card-link {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card {
  display: flex;
  flex-direction: column;
  background: var(--surface-card, #fff);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  overflow: hidden;
  transform: translateY(20px);
  opacity: 0;
  transition: all 0.5s ease;
  height: 100%;
}

.card--visible {
  transform: translateY(0);
  opacity: 1;
}

.card:hover {
  transform: translateY(-4px);
}

.card__image {
  aspect-ratio: 16/9;
  background: #f5f5f5;
  flex-shrink: 0;
}

.card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.card__content {
  padding: 1.25rem 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex-grow: 1;
}

.card__date {
  color: var(--text-color-secondary, #777);
  font-size: 0.85rem;
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
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* 📱 адаптив */
@media (max-width: 768px) {
  .card__content {
    padding: 1rem;
  }
  .card__title {
    font-size: 1.1rem;
  }
}
</style>

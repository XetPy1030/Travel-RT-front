<script setup lang="ts">
import NewsCard from './NewsCard.vue'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

defineProps<{ news: NewsItem[] }>()
</script>

<template>
  <section class="news-list">
    <div class="news-list__grid">
      <NewsCard v-for="item in news" :key="item.id" :news="item" />
    </div>
  </section>
</template>

<style scoped>
.news-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.news-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  transition: all 0.3s ease;
}

/* === Адаптив === */
@media (max-width: 1200px) {
  .news-list {
    padding: 1.5rem;
  }
  .news-list__grid {
    gap: 1.25rem;
  }
}

@media (max-width: 900px) {
  .news-list {
    padding: 1.25rem;
  }
  .news-list__grid {
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 1.2rem;
  }
}

@media (max-width: 600px) {
  .news-list {
    padding: 1rem 0.75rem;
  }
  .news-list__grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

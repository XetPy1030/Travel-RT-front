<script setup lang="ts">
import NewsCard from './NewsCard.vue'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

defineProps<{
  news: NewsItem[]
}>()
</script>

<template>
  <div class="news-list">
    <div class="news-list__grid">
      <NewsCard
        v-for="item in news"
        :key="item.id"
        :news="item"
      />
    </div>
  </div>
</template>

<style scoped>
.news-list__grid {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.news-list {
  max-width: 1200px;
  margin: 0 auto;
}
</style>
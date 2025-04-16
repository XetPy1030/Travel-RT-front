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
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}
</style>
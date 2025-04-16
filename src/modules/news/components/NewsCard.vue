<script setup lang="ts">
import { RouterLink } from 'vue-router'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

defineProps<{
  news: NewsItem
}>()
</script>

<template>
  <RouterLink
    :to="{ name: 'news-detail', params: { id: news.id }}"
    class="news-card"
  >
    <div class="news-card__image" v-if="news.imageUrl">
      <img :src="news.imageUrl" :alt="news.title">
    </div>
    <div class="news-card__content">
      <h3 class="news-card__title">{{ news.title }}</h3>
      <p class="news-card__description">{{ news.description }}</p>
      <div class="news-card__date">{{ news.date }}</div>
    </div>
  </RouterLink>
</template>

<style scoped>
.news-card {
  display: flex;
  flex-direction: column;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
}

.news-card:hover {
  transform: translateY(-5px);
}

.news-card__image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-card__content {
  padding: 16px;
}

.news-card__title {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #333;
}

.news-card__description {
  margin: 0 0 8px;
  color: #666;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card__date {
  color: #888;
  font-size: 0.8rem;
}
</style>
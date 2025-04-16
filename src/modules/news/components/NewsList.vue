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
  news: NewsItem[]
}>()
</script>

<template>
  <div class="news-list">
    <div class="news-list__grid">
      <RouterLink
        v-for="item in news"
        :key="item.id"
        :to="{ name: 'news-detail', params: { id: item.id }}"
        class="news-list__card"
      >
        <div class="news-list__card-image" v-if="item.imageUrl">
          <img :src="item.imageUrl" :alt="item.title">
        </div>
        <div class="news-list__card-content">
          <h3 class="news-list__card-title">{{ item.title }}</h3>
          <p class="news-list__card-description">{{ item.description }}</p>
          <div class="news-list__card-date">{{ item.date }}</div>
        </div>
      </RouterLink>
    </div>
  </div>
</template>

<style scoped>
.news-list__grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.news-list__card {
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

.news-list__card:hover {
  transform: translateY(-5px);
}

.news-list__card-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.news-list__card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.news-list__card-content {
  padding: 16px;
}

.news-list__card-title {
  margin: 0 0 8px;
  font-size: 1.2rem;
  color: #333;
}

.news-list__card-description {
  margin: 0 0 8px;
  color: #666;
  font-size: 0.9rem;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-list__card-date {
  color: #888;
  font-size: 0.8rem;
}
</style>
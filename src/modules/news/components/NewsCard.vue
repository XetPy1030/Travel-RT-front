<script setup lang="ts">
import { RouterLink } from 'vue-router'
import { formatDateRu } from '@/utils/date'
import { computed } from 'vue'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

const props = defineProps<{
  news: NewsItem
}>()

const formattedDate = computed(() => {
  const date = formatDateRu(props.news.date)
  return {
    fullDate: date.fullDate.toUpperCase(),
    weekday: date.weekday.toUpperCase()
  }
})
</script>

<template>
  <RouterLink
    :to="{ name: 'news-detail', params: { id: news.id }}"
    class="news-card"
  >
    <div class="news-card__date">
      <div class="news-card__date-main">{{ formattedDate.fullDate }}</div>
      <div class="news-card__date-weekday">{{ formattedDate.weekday }}</div>
    </div>
    <div class="news-card__content-wrapper">
      <div class="news-card__content">
        <h3 class="news-card__title">{{ news.title }}</h3>
        <p class="news-card__description">{{ news.description }}</p>
      </div>
      <div class="news-card__image" v-if="news.imageUrl">
        <img :src="news.imageUrl" :alt="news.title">
      </div>
    </div>
  </RouterLink>
</template>

<style scoped>
.news-card {
  display: flex;
  flex-direction: row;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s ease;
  margin-bottom: 1rem;
  padding: 1rem;
  gap: 1.5rem;
}

.news-card:hover {
  transform: translateX(5px);
}

.news-card__date {
  min-width: 140px;
  color: #888;
  text-align: left;
  padding: 0.5rem 1rem;
  border-right: 1px solid #eee;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  align-self: flex-start;
  padding-top: 0;
}

.news-card__date-main {
  font-size: 0.9rem;
  font-weight: 600;
  order: -1;
}

.news-card__date-weekday {
  font-size: 0.8rem;
  color: #999;
  font-weight: 700;
  order: 1;
}

.news-card__content-wrapper {
  display: flex;
  gap: 1.5rem;
  width: 100%;
}

.news-card__content {
  flex: 1;
  padding: 0;
  display: flex;
  flex-direction: column;
  min-height: 200px;
  max-width: calc(100% - 250px - 1.5rem);
}

.news-card__title {
  margin: 0 0 12px;
  font-size: 1.2rem;
  color: #333;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}

.news-card__description {
  margin: 0;
  color: #666;
  font-size: 0.9rem;
  word-wrap: break-word;
  overflow-wrap: break-word;
  hyphens: auto;
  max-width: 600px;
  height: 160px;
  overflow: hidden;
}

.news-card__image {
  width: 250px;
  min-width: 250px;
  height: 200px;
  overflow: hidden;
  border-radius: 4px;
  margin-left: auto;
}

.news-card__image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
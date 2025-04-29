<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useNewsStore } from '@/stores/useNewsStores'
import { onMounted, computed } from 'vue'
import { processHtmlContent } from '@/utils/htmlUtils'
import { formatDateRu } from '@/utils/date'
import { API_BASE_URL } from '@/config'
const route = useRoute()
const newsStore = useNewsStore()

onMounted(async () => {
  await newsStore.fetchNewsById(Number(route.params.id))
})

const processedContent = computed(() => {
  if (!newsStore.currentNews?.content) return ''
  return processHtmlContent(newsStore.currentNews.content, API_BASE_URL)
})
</script>

<template>
  <div class="news-detail">
    <div v-if="newsStore.loading" class="news-detail__loading">
      Загрузка...
    </div>
    <div v-else-if="!newsStore.currentNews" class="news-detail__error">
      Новость не найдена
    </div>
    <div v-else class="news-detail__content">
      <h1 class="news-detail__title">{{ newsStore.currentNews.title }}</h1>
      <div class="news-detail__date">{{ formatDateRu(newsStore.currentNews.created_at).fullDate }}, {{ formatDateRu(newsStore.currentNews.created_at).weekday }}</div>
      <div class="news-detail__image" v-if="newsStore.currentNews.image">
        <img :src="newsStore.currentNews.image" :alt="newsStore.currentNews.title">
      </div>
      <div class="news-detail__description">
        {{ newsStore.currentNews.description }}
      </div>
      <div class="news-detail__content" v-if="newsStore.currentNews.content" v-html="processedContent">
      </div>
    </div>
  </div>
</template>

<style scoped>
.news-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.news-detail__title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  color: #333;
}

.news-detail__date {
  color: #666;
  margin-bottom: 2rem;
}

.news-detail__image {
  margin-bottom: 2rem;
}

.news-detail__image img {
  width: 100%;
  max-height: 400px;
  object-fit: cover;
  border-radius: 8px;
}

.news-detail__description {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
  margin-bottom: 2rem;
  white-space: pre-wrap;
  word-wrap: break-word;
  overflow-wrap: break-word;
  max-width: 100%;
}

.news-detail__content {
  font-size: 1.1rem;
  line-height: 1.6;
  color: #444;
}

.news-detail__content :deep(h1),
.news-detail__content :deep(h2),
.news-detail__content :deep(h3),
.news-detail__content :deep(h4),
.news-detail__content :deep(h5),
.news-detail__content :deep(h6) {
  margin: 0 0 0.5em;
  color: #333;
  font-weight: 600;
}

.news-detail__content :deep(p) {
  margin-bottom: 1em;
}

.news-detail__content :deep(ul),
.news-detail__content :deep(ol) {
  margin: 1em 0;
  padding-left: 2em;
}

.news-detail__content :deep(li) {
  margin-bottom: 0.5em;
}

.news-detail__content :deep(a) {
  color: #2196F3;
  text-decoration: none;
  transition: color 0.3s;
}

.news-detail__content :deep(a:hover) {
  color: #1976D2;
  text-decoration: underline;
}

.news-detail__content :deep(img) {
  max-width: 100%;
  height: auto;
  border-radius: 8px;
  margin: 1em 0;
}

.news-detail__content :deep(blockquote) {
  border-left: 4px solid #2196F3;
  padding-left: 1em;
  margin: 1em 0;
  color: #666;
  font-style: italic;
}

.news-detail__content :deep(code) {
  background-color: #f5f5f5;
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-family: monospace;
}

.news-detail__content :deep(pre) {
  background-color: #f5f5f5;
  padding: 1em;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1em 0;
}

.news-detail__content :deep(table) {
  width: 100%;
  border-collapse: collapse;
  margin: 1em 0;
}

.news-detail__content :deep(th),
.news-detail__content :deep(td) {
  border: 1px solid #ddd;
  padding: 0.5em;
  text-align: left;
}

.news-detail__content :deep(th) {
  background-color: #f5f5f5;
  font-weight: 600;
}

.news-detail__loading,
.news-detail__error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.news-detail__error {
  color: #dc3545;
}
</style>
<script setup lang="ts">
import { onMounted, ref, computed } from 'vue'
import { useNews } from '@/modules/news/composables/useNews'
import NewsList from '@/modules/news/components/NewsList.vue'

const { news: apiNews, loading, error, fetchNews, totalPages, hasNextPage, hasPreviousPage } = useNews()
const currentPage = ref(1)
const itemsPerPage = 10

const news = computed(() => {
  return apiNews.value.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.image || undefined,
    date: item.created_at
  }))
})

onMounted(async () => {
  await fetchNews(itemsPerPage, currentPage.value)
})

const handlePageChange = async (page: number) => {
  if (page < 1 || page > totalPages.value) return
  currentPage.value = page
  await fetchNews(itemsPerPage, page)
}
</script>

<template>
  <div class="news-list-view">
    <h1 class="news-list-view__title">Новости</h1>
    <div v-if="loading" class="news-list-view__loading">
      Загрузка...
    </div>
    <div v-else-if="error" class="news-list-view__error">
      {{ error }}
    </div>
    <template v-else>
      <NewsList :news="news" />
      <div class="news-list-view__pagination">
        <button 
          @click="handlePageChange(currentPage - 1)"
          :disabled="!hasPreviousPage"
          class="news-list-view__pagination-button"
        >
          Назад
        </button>
        <span class="news-list-view__pagination-page">
          Страница {{ currentPage }} из {{ totalPages }}
        </span>
        <button 
          @click="handlePageChange(currentPage + 1)"
          :disabled="!hasNextPage"
          class="news-list-view__pagination-button"
        >
          Вперед
        </button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.news-list-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.news-list-view__title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.news-list-view__loading,
.news-list-view__error {
  text-align: center;
  padding: 2rem;
  font-size: 1.2rem;
}

.news-list-view__error {
  color: #dc3545;
}

.news-list-view__pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.news-list-view__pagination-button {
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.3s ease;
}

.news-list-view__pagination-button:hover:not(:disabled) {
  background-color: #f0f0f0;
}

.news-list-view__pagination-button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.news-list-view__pagination-page {
  font-size: 1.1rem;
}
</style>
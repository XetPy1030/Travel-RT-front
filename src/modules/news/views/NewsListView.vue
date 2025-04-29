<script setup lang="ts">
import { onMounted, ref, computed, watch } from 'vue'
import { useNews } from '@/modules/news/composables/useNews'
import NewsList from '@/modules/news/components/NewsList.vue'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

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

watch(currentPage, (newPage) => {
  fetchNews(itemsPerPage, newPage)
})

onMounted(async () => {
  await fetchNews(itemsPerPage, currentPage.value)
})
</script>

<template>
  <div class="news-list-view">
    <h1 class="news-list-view__title">Новости</h1>
    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    <div v-else-if="!news.length" class="empty-state">
      <i class="pi pi-book" style="font-size: 3rem; color: var(--surface-500)"></i>
      <p>Новости не найдены</p>
    </div>
    <template v-else>
      <NewsList :news="news" />
      <div class="pagination">
        <Button 
          icon="pi pi-chevron-left" 
          :disabled="!hasPreviousPage" 
          @click="currentPage--" 
        />
        <span class="page-info">Страница {{ currentPage }} из {{ totalPages }}</span>
        <Button 
          icon="pi pi-chevron-right" 
          :disabled="!hasNextPage" 
          @click="currentPage++" 
        />
      </div>
    </template>
  </div>
</template>

<style scoped>
.news-list-view {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.news-list-view__title {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #333;
}

.loading, .error, .empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 1rem;
}

.error {
  color: #dc3545;
}

.empty-state p {
  color: var(--surface-500);
  font-size: 1.2rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
}

.page-info {
  font-size: 1.1rem;
}
</style>
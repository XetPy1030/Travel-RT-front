<template>
  <div class="routers-list">
    <div class="header">
      <h1>Маршруты</h1>
      <div class="search-container">
        <InputText v-model="searchQuery" placeholder="Поиск маршрутов..." @input="handleSearch" />
      </div>
    </div>

    <RoutersFilters @filter-change="handleFilterChange" />

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="error">
      <Message severity="error">{{ error }}</Message>
    </div>

    <div v-else-if="!routers.length" class="empty-state">
      <i class="pi pi-map-marker" style="font-size: 3rem; color: var(--surface-500)"></i>
      <p>Маршруты не найдены</p>
    </div>

    <div v-else class="grid">
      <RouterCard v-for="router in routers" :key="router.id" :router="router" />
    </div>

    <div v-if="!loading && !error && routers.length" class="pagination">
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
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import Message from 'primevue/message'
import RoutersFilters from '../components/RoutersFilters.vue'
import RouterCard from '../components/RouterCard.vue'
import { useRouters } from '../composables/useRouters'
import type { ApiRoutersListDifficultyEnum } from '@/api/generated'

const { routers, loading, error, fetchRouters, totalPages, hasNextPage, hasPreviousPage } = useRouters()

const currentPage = ref(1)
const searchQuery = ref('')
const filters = ref<{ regionId?: number; settlementId?: number; difficulty?: ApiRoutersListDifficultyEnum }>({
  regionId: undefined,
  settlementId: undefined,
  difficulty: undefined
})
let searchTimeout: number | null = null

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchRoutersList()
  }, 500)
}

const handleFilterChange = (newFilters: { regionId?: number; settlementId?: number; difficulty?: ApiRoutersListDifficultyEnum }) => {
  filters.value = newFilters
  currentPage.value = 1
  fetchRoutersList()
}

const fetchRoutersList = () => {
  fetchRouters(12, currentPage.value, searchQuery.value, filters.value.regionId, filters.value.settlementId, filters.value.difficulty)
}

watch(currentPage, () => {
  fetchRoutersList()
})

// Initial fetch
fetchRoutersList()
</script>

<style scoped>
.routers-list {
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.search-container {
  width: 300px;
}

.grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.loading {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
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

.empty-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 200px;
  gap: 1rem;
  color: var(--text-color-secondary);
}

.empty-state p {
  font-size: 1.2rem;
  margin: 0;
}
</style> 
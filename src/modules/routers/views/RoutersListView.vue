<template>
  <div class="routers-list">
    <div class="header">
      <h1>Маршруты</h1>
      <div class="search-container">
        <InputText
            v-model="searchQuery"
            placeholder="Поиск маршрутов..."
            @input="onSearchInput"
            class="search-input"
        />
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

    <div v-else class="cards-grid">
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
import { ref, watch, onUnmounted } from 'vue'
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
let searchTimeout: ReturnType<typeof setTimeout> | null = null

const onSearchInput = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchRoutersList()
  }, 400)
}

onUnmounted(() => {
  if (searchTimeout) clearTimeout(searchTimeout)
})

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
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
  flex-wrap: wrap;
}

.search-container {
  width: 300px;
}

.search-input {
  width: 100%;
  min-width: 200px;
}

.cards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 1.5rem;
}

.pagination {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

@media (max-width: 900px) {
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .search-container {
    width: 100%;
    margin-top: 0.5rem;
  }
}

@media (max-width: 600px) {
  .header {
    gap: 0.5rem;
    margin-bottom: 1rem;
  }
  .search-container {
    width: 100%;
    margin-top: 0.5rem;
  }
  .search-input {
    font-size: 1rem;
    padding: 0.5rem;
  }
}
</style>
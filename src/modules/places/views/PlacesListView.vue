<template>
  <div class="places-list">
    <div class="header">
      <h1>Интересные места</h1>
      <div class="search-container">
        <InputText v-model="searchQuery" placeholder="Поиск мест..." @input="handleSearch" />
      </div>
    </div>

    <div v-if="loading" class="loading">
      <ProgressSpinner />
    </div>

    <div v-else-if="error" class="error">
      {{ error.message }}
    </div>

    <div v-else-if="!places.length" class="empty-state">
      <i class="pi pi-map-marker" style="font-size: 3rem; color: var(--surface-500)"></i>
      <p>Места не найдены</p>
    </div>

    <div v-else class="places-grid">
      <PlaceCard v-for="place in places" :key="place.id" :place="place" />
    </div>

    <div v-if="!loading && !error && places.length" class="pagination">
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
import { usePlaces } from '../composables/usePlaces'
import PlaceCard from '../components/PlaceCard.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

const { places, loading, error, fetchPlaces, totalPages, hasNextPage, hasPreviousPage } = usePlaces()

const currentPage = ref(1)
const searchQuery = ref('')
let searchTimeout: number | null = null

const handleSearch = () => {
  if (searchTimeout) {
    clearTimeout(searchTimeout)
  }
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchPlaces(10, 1, searchQuery.value)
  }, 500)
}

watch(currentPage, (newPage) => {
  fetchPlaces(10, newPage, searchQuery.value)
})

// Initial fetch
fetchPlaces(10, 1)
</script>

<style scoped>
.places-list {
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

.places-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 2rem;
}

.loading, .error {
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
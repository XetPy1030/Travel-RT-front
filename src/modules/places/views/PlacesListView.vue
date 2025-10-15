<template>
  <div class="places-list">
    <div class="header">
      <h1>Интересные места</h1>
      <div class="search-container">
        <InputText
            v-model="searchQuery"
            placeholder="Поиск мест..."
            @input="handleSearch"
            class="search-input"
        />
      </div>
    </div>

    <PlacesFilters @filter-change="handleFilterChange" />

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
import PlacesFilters from '../components/PlacesFilters.vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'

const { places, loading, error, fetchPlaces, totalPages, hasNextPage, hasPreviousPage } = usePlaces()

const currentPage = ref(1)
const searchQuery = ref('')
const filters = ref<{ regionId: number | undefined; settlementId: number | undefined }>({
  regionId: undefined,
  settlementId: undefined
})
let searchTimeout: number | null = null

const handleSearch = () => {
  if (searchTimeout) clearTimeout(searchTimeout)
  searchTimeout = setTimeout(() => {
    currentPage.value = 1
    fetchPlacesWithFilters()
  }, 500)
}

const handleFilterChange = (newFilters: { regionId: number | undefined; settlementId: number | undefined }) => {
  filters.value = newFilters
  currentPage.value = 1
  fetchPlacesWithFilters()
}

const fetchPlacesWithFilters = () => {
  fetchPlaces(10, currentPage.value, searchQuery.value, filters.value.regionId, filters.value.settlementId)
}

watch(currentPage, () => {
  fetchPlacesWithFilters()
})

// Initial fetch
fetchPlacesWithFilters()
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
  flex-wrap: wrap;
}

.header h1 {
  font-size: 2rem;
  margin: 0;
}

.search-container {
  width: 300px;
}

.search-input {
  width: 100%;
  min-width: 200px;
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
  flex-wrap: wrap;
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

/* === 📱 Адаптив === */

@media (max-width: 1200px) {
  .places-list {
    padding: 1.5rem;
  }
  .places-grid {
    gap: 1.5rem;
  }
}

@media (max-width: 900px) {
  .header {
    flex-direction: column;
    align-items: stretch;
    gap: 1rem;
  }
  .header h1 {
    font-size: 1.8rem;
    text-align: center;
  }
  .search-container {
    width: 100%;
  }
}

@media (max-width: 600px) {
  .places-list {
    padding: 1rem;
  }
  .header {
    gap: 0.5rem;
    margin-bottom: 1.2rem;
  }
  .header h1 {
    font-size: 1.5rem;
  }
  .search-container {
    width: 100%;
    margin-top: 0.5rem;
  }
  .search-input {
    font-size: 1rem;
    padding: 0.5rem;
  }
  .places-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
  .page-info {
    font-size: 1rem;
  }
}
</style>

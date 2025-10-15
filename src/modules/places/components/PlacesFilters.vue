<template>
  <div class="places-filters">
    <div class="filter-group">
      <div class="filter-header">
        <label>Регион</label>
        <Button 
          v-if="selectedRegion" 
          icon="pi pi-times" 
          text 
          rounded 
          @click="clearRegion" 
        />
      </div>
      <Dropdown
        v-model="selectedRegion"
        :options="regions"
        optionLabel="name"
        placeholder="Выберите регион"
        :loading="loadingRegions"
        @change="handleRegionChange"
        :filter="true"
        filterPlaceholder="Поиск региона"
        @filter="handleRegionFilter"
      />
    </div>

    <div class="filter-group">
      <div class="filter-header">
        <label>Населенный пункт</label>
        <Button 
          v-if="selectedSettlement" 
          icon="pi pi-times" 
          text 
          rounded 
          @click="clearSettlement" 
        />
      </div>
      <Dropdown
        v-model="selectedSettlement"
        :options="settlements"
        optionLabel="name"
        placeholder="Выберите населенный пункт"
        :loading="loadingSettlements"
        @change="handleSettlementChange"
        :filter="true"
        filterPlaceholder="Поиск населенного пункта"
        @filter="handleSettlementFilter"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useSettlements } from '@composables/useSettlements'
import { useDistricts } from '@composables/useDistricts'
import type { District, Settlement } from '@/api/generated'

const { settlements, loading: loadingSettlements, fetchSettlements } = useSettlements()
const { districts: regions, loading: loadingRegions, fetchDistricts } = useDistricts()

const selectedRegion = ref<District | null>(null)
const selectedSettlement = ref<Settlement | null>(null)

const emit = defineEmits(['filter-change'])

const clearRegion = () => {
  selectedRegion.value = null
  fetchSettlements()
  emitFilterChange()
}

const clearSettlement = () => {
  selectedSettlement.value = null
  emitFilterChange()
}

const handleRegionFilter = (event: { value: string }) => {
  fetchDistricts(event.value)
}

const handleSettlementFilter = (event: { value: string }) => {
  fetchSettlements(selectedRegion.value?.id, event.value)
}

const handleRegionChange = () => {
  if (selectedRegion.value) {
    fetchSettlements(selectedRegion.value.id)
  }
  emitFilterChange()
}

const handleSettlementChange = () => {
  emitFilterChange()
}

const emitFilterChange = () => {
  emit('filter-change', {
    regionId: selectedRegion.value?.id,
    settlementId: selectedSettlement.value?.id
  })
}

// Initial fetch of regions and settlements
fetchDistricts()
fetchSettlements()
</script>

<style scoped>
.places-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 250px;
  flex: 1 1 250px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: 500;
  color: var(--text-color-secondary, #6c757d);
}

@media (max-width: 600px) {
  .places-filters {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .filter-group {
    min-width: 180px;
    width: 180px;
    flex: 0 0 180px;
    gap: 0.2rem;
    padding: 0.15rem 0;
  }
}

@media (max-width: 350px) {
  .filter-group {
    min-width: 140px;
    width: 140px;
    flex: 0 0 140px;
    gap: 0.1rem;
    padding: 0.1rem 0;
  }
}
</style>
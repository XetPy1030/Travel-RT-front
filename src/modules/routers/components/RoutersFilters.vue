<template>
  <div class="routers-filters">
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

    <div class="filter-group">
      <div class="filter-header">
        <label>Сложность</label>
        <Button 
          v-if="selectedDifficulty" 
          icon="pi pi-times" 
          text 
          rounded 
          @click="clearDifficulty" 
        />
      </div>
      <Dropdown
        v-model="selectedDifficulty"
        :options="difficultyOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Выберите сложность"
        @change="handleDifficultyChange"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Dropdown from 'primevue/dropdown'
import Button from 'primevue/button'
import { useSettlements } from '@/composables/useSettlements'
import { useDistricts } from '@/composables/useDistricts'
import type { District, Settlement, ApiRoutersListDifficultyEnum } from '@/api/generated'

const { settlements, loading: loadingSettlements, fetchSettlements } = useSettlements()
const { districts: regions, loading: loadingRegions, fetchDistricts } = useDistricts()

const selectedRegion = ref<District | null>(null)
const selectedSettlement = ref<Settlement | null>(null)
const selectedDifficulty = ref<ApiRoutersListDifficultyEnum | null>(null)

const difficultyOptions = [
  { label: 'Легкий', value: 'easy' as ApiRoutersListDifficultyEnum },
  { label: 'Средний', value: 'medium' as ApiRoutersListDifficultyEnum },
  { label: 'Сложный', value: 'hard' as ApiRoutersListDifficultyEnum }
]

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

const clearDifficulty = () => {
  selectedDifficulty.value = null
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

const handleDifficultyChange = () => {
  emitFilterChange()
}

const emitFilterChange = () => {
  emit('filter-change', {
    regionId: selectedRegion.value?.id,
    settlementId: selectedSettlement.value?.id,
    difficulty: selectedDifficulty.value
  })
}

// Initial fetch of regions and settlements
fetchDistricts()
fetchSettlements()
</script>

<style scoped>
.routers-filters {
  display: flex;
  gap: 1rem;
  margin-bottom: 1rem;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 250px;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

label {
  font-weight: 500;
  color: var(--text-color-secondary);
}
</style> 
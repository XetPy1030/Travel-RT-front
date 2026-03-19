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
        @filter="onRegionFilterInput"
      >
        <template #footer>
          <Button
            v-if="hasMoreRegions && !loadingRegions"
            label="Загрузить ещё"
            link
            size="small"
            :loading="loadingMoreRegions"
            class="w-full"
            @click="loadMoreRegions"
          />
        </template>
      </Dropdown>
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
        @filter="onSettlementFilterInput"
      >
        <template #footer>
          <Button
            v-if="hasMoreSettlements && !loadingSettlements"
            label="Загрузить ещё"
            link
            size="small"
            :loading="loadingMoreSettlements"
            class="w-full"
            @click="loadMoreSettlements"
          />
        </template>
      </Dropdown>
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
import { useSettlements } from '@composables/useSettlements'
import { useDistricts } from '@composables/useDistricts'
import type { District, Settlement, RoutersListDifficultyEnum } from '@api/generated'

const {
  settlements,
  loading: loadingSettlements,
  loadingMore: loadingMoreSettlements,
  hasMore: hasMoreSettlements,
  fetchSettlements,
  loadMore: loadMoreSettlements
} = useSettlements()
const {
  districts: regions,
  loading: loadingRegions,
  loadingMore: loadingMoreRegions,
  hasMore: hasMoreRegions,
  fetchDistricts,
  loadMore: loadMoreRegions
} = useDistricts()

let regionFilterTimer: ReturnType<typeof setTimeout> | null = null
let settlementFilterTimer: ReturnType<typeof setTimeout> | null = null
const onRegionFilterInput = (event: { value: string }) => {
  if (regionFilterTimer) clearTimeout(regionFilterTimer)
  regionFilterTimer = setTimeout(() => {
    fetchDistricts(event.value || undefined)
    regionFilterTimer = null
  }, 300)
}
const onSettlementFilterInput = (event: { value: string }) => {
  if (settlementFilterTimer) clearTimeout(settlementFilterTimer)
  settlementFilterTimer = setTimeout(() => {
    fetchSettlements(selectedRegion.value?.id, event.value || undefined)
    settlementFilterTimer = null
  }, 300)
}

const selectedRegion = ref<District | null>(null)
const selectedSettlement = ref<Settlement | null>(null)
const selectedDifficulty = ref<RoutersListDifficultyEnum | null>(null)

const difficultyOptions = [
  { label: 'Легкий', value: 'easy' as RoutersListDifficultyEnum },
  { label: 'Средний', value: 'medium' as RoutersListDifficultyEnum },
  { label: 'Сложный', value: 'hard' as RoutersListDifficultyEnum }
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
  flex-wrap: wrap;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 250px;
  flex: 1 1 250px;
}

@media (max-width: 600px) {
  .routers-filters {
    flex-direction: row;
    overflow-x: auto;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  .filter-group {
    min-width: 220px;
    width: 220px;
    flex: 0 0 220px;
    gap: 0.25rem;
    padding: 0.25rem 0;
  }
}
</style>
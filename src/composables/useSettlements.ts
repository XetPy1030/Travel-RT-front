import { ref } from 'vue'
import type { Settlement } from '@/api/generated'

const PAGE_SIZE = 100

export const useSettlements = () => {
  const { $api } = useNuxtApp()
  const settlements = ref<Settlement[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<Error | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(false)
  const lastDistrictId = ref<number | undefined>(undefined)
  const lastSearch = ref<string | undefined>(undefined)

  const fetchSettlements = async (districtId?: number, search?: string) => {
    try {
      loading.value = true
      error.value = null
      currentPage.value = 1
      lastDistrictId.value = districtId
      lastSearch.value = search
      const response = await $api.api.apiLocationsSettlementsList({
        district: districtId,
        search,
        page: 1,
        pageSize: PAGE_SIZE
      })
      settlements.value = response.data.results ?? []
      const total = response.data.count ?? 0
      hasMore.value = settlements.value.length < total
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  const loadMore = async () => {
    if (!hasMore.value || loading.value || loadingMore.value) return
    try {
      loadingMore.value = true
      const nextPage = currentPage.value + 1
      const response = await $api.api.apiLocationsSettlementsList({
        district: lastDistrictId.value,
        search: lastSearch.value,
        page: nextPage,
        pageSize: PAGE_SIZE
      })
      const newResults = response.data.results ?? []
      settlements.value = [...settlements.value, ...newResults]
      currentPage.value = nextPage
      const total = response.data.count ?? 0
      hasMore.value = settlements.value.length < total
    } catch (e) {
      error.value = e as Error
    } finally {
      loadingMore.value = false
    }
  }

  return {
    settlements,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchSettlements,
    loadMore
  }
} 
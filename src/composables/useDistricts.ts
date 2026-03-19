import { ref } from 'vue'
import type { District } from '@/api/generated'

const PAGE_SIZE = 100

export const useDistricts = () => {
  const { $api } = useNuxtApp()
  const districts = ref<District[]>([])
  const loading = ref(false)
  const loadingMore = ref(false)
  const error = ref<Error | null>(null)
  const currentPage = ref(1)
  const hasMore = ref(false)
  const lastSearch = ref<string | undefined>(undefined)

  const fetchDistricts = async (search?: string) => {
    try {
      loading.value = true
      error.value = null
      currentPage.value = 1
      lastSearch.value = search
      const response = await $api.api.apiLocationsDistrictsList({
        search,
        page: 1,
        pageSize: PAGE_SIZE
      })
      districts.value = response.data.results ?? []
      const total = response.data.count ?? 0
      hasMore.value = districts.value.length < total
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
      const response = await $api.api.apiLocationsDistrictsList({
        search: lastSearch.value,
        page: nextPage,
        pageSize: PAGE_SIZE
      })
      const newResults = response.data.results ?? []
      districts.value = [...districts.value, ...newResults]
      currentPage.value = nextPage
      const total = response.data.count ?? 0
      hasMore.value = districts.value.length < total
    } catch (e) {
      error.value = e as Error
    } finally {
      loadingMore.value = false
    }
  }

  return {
    districts,
    loading,
    loadingMore,
    error,
    hasMore,
    fetchDistricts,
    loadMore
  }
} 
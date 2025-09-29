import { ref } from 'vue'
import { $api } from '@/api'
import type {PlaceDetail, PlaceList} from "@/api/generated"

export const usePlaces = () => {
  const places = ref<PlaceList[]>([])
  const currentPlace = ref<PlaceDetail | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const totalPages = ref(1)
  const hasNextPage = ref(false)
  const hasPreviousPage = ref(false)

  const fetchPlaces = async (
    pageSize: number,
    page: number,
    searchQuery?: string,
    regionId?: number,
    settlementId?: number
  ) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiPlacesList({
        pageSize,
        page,
        search: searchQuery,
        district: regionId,
        settlement: settlementId
      })
      places.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / pageSize)
      hasNextPage.value = page < totalPages.value
      hasPreviousPage.value = page > 1
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  const fetchPlaceById = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiPlacesRetrieve({ id })
      currentPlace.value = response.data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    places,
    currentPlace,
    loading,
    error,
    fetchPlaces,
    fetchPlaceById,
    totalPages,
    hasNextPage,
    hasPreviousPage
  }
} 
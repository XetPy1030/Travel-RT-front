import { ref } from 'vue'
import { $api } from '@/api'
import type { District, PaginatedDistrictList } from "@/api/generated"

export const useDistricts = () => {
  const districts = ref<District[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchDistricts = async (search?: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiLocationsDistrictsList({
        search
      })
      districts.value = response.data.results
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    districts,
    loading,
    error,
    fetchDistricts
  }
} 
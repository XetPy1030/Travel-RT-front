import { ref } from 'vue'
import { $api } from '@/api'
import type { Settlement } from "@/api/generated"

export const useSettlements = () => {
  const settlements = ref<Settlement[]>([])
  const loading = ref(false)
  const error = ref<Error | null>(null)

  const fetchSettlements = async (districtId?: number, search?: string) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiLocationsSettlementsList({
        district: districtId,
        search
      })
      settlements.value = response.data.results
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    settlements,
    loading,
    error,
    fetchSettlements
  }
} 
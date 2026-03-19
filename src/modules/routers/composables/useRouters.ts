import { ref } from 'vue'
import type { RouterList, RouterDetail, RoutersListDifficultyEnum } from "@/api/generated"

export const useRouters = () => {
  const { $api } = useNuxtApp()
  const routers = ref<RouterList[]>([])
  const currentRouter = ref<RouterDetail | null>(null)
  const loading = ref(false)
  const error = ref<Error | null>(null)
  const totalPages = ref(1)
  const hasNextPage = ref(false)
  const hasPreviousPage = ref(false)

  const fetchRouters = async (
    pageSize: number,
    page: number,
    searchQuery?: string,
    regionId?: number,
    settlementId?: number,
    difficulty?: RoutersListDifficultyEnum
  ) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiRoutersList({
        pageSize,
        page,
        search: searchQuery,
        district: regionId,
        settlement: settlementId,
        difficulty
      })
      routers.value = response.data.results
      totalPages.value = Math.ceil(response.data.count / pageSize)
      hasNextPage.value = page < totalPages.value
      hasPreviousPage.value = page > 1
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  const fetchRouterById = async (id: number) => {
    try {
      loading.value = true
      error.value = null
      const response = await $api.api.apiRoutersRetrieve({ id })
      currentRouter.value = response.data
    } catch (e) {
      error.value = e as Error
    } finally {
      loading.value = false
    }
  }

  return {
    routers,
    currentRouter,
    loading,
    error,
    fetchRouters,
    fetchRouterById,
    totalPages,
    hasNextPage,
    hasPreviousPage
  }
} 
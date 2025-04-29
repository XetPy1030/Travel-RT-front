import { ref, computed } from 'vue'
import { $api } from '@/api'
import type { PaginatedPlaceListList, PlaceDetail } from "@/api/generated";

export const usePlaces = () => {
    const places = ref<PaginatedPlaceListList>({
        count: 0,
        results: [],
        page_size: 10,
        next: null,
        previous: null
    })
    const currentPlace = ref<PlaceDetail | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const fetchPlaces = async (pageSize?: number, page?: number, search?: string) => {
        try {
            loading.value = true
            const response = await $api.api.apiPlacesPlacesList({ pageSize, page, search })
            places.value = response.data
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    const fetchPlaceById = async (id: number) => {
        try {
            loading.value = true
            const response = await $api.api.apiPlacesPlacesRetrieve({ id })
            currentPlace.value = response.data
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    const totalPages = computed(() => Math.ceil(places.value.count / (places.value.page_size)))

    return {
        places: computed(() => places.value.results),
        currentPlace,
        loading,
        error,
        fetchPlaces,
        fetchPlaceById,
        totalPages,
        hasNextPage: computed(() => !!places.value.next),
        hasPreviousPage: computed(() => !!places.value.previous)
    }
} 
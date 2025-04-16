// modules/news/composables/useNews.ts
import { ref, computed } from 'vue'
import { $api } from '@/api'
import type { PaginatedNewsList, News } from "@/api/generated";

export const useNews = () => {
    const news = ref<PaginatedNewsList>({
        count: 0,
        results: [],
        page_size: 10,
        next: null,
        previous: null
    })
    const currentNews = ref<News | null>(null)
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const fetchNews = async (pageSize?: number, page?: number) => {
        try {
            loading.value = true
            const response = await $api.api.apiNewsList({ pageSize, page })
            news.value = response.data
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    const fetchNewsById = async (id: number) => {
        try {
            loading.value = true
            const response = await $api.api.apiNewsRetrieve({ id })
            currentNews.value = response.data
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    const featuredNews = computed(() => news.value.results.slice(0, 3))
    const totalPages = computed(() => Math.ceil(news.value.count / (news.value.page_size)))

    return {
        news: computed(() => news.value.results),
        currentNews,
        featuredNews,
        loading,
        error,
        fetchNews,
        fetchNewsById,
        totalPages,
        hasNextPage: computed(() => !!news.value.next),
        hasPreviousPage: computed(() => !!news.value.previous)
    }
}
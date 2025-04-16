// modules/news/composables/useNews.ts
import { ref, computed } from 'vue'
import { $api } from '@/api'
import type { NewsItem } from './types/news'

export const useNews = () => {
    const news = ref<NewsItem[]>([])
    const loading = ref(false)
    const error = ref<Error | null>(null)

    const fetchNews = async (limit?: number) => {
        try {
            loading.value = true
            const response = await $api.api.apiNewsList({pageSize: limit})
            news.value = response.data
        } catch (err) {
            error.value = err as Error
        } finally {
            loading.value = false
        }
    }

    const featuredNews = computed(() => news.value.slice(0, 3))

    return {
        news,
        featuredNews,
        loading,
        error,
        fetchNews
    }
}
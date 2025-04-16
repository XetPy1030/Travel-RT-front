// stores/useNewsStore.ts
import { defineStore } from 'pinia'
import { useNews } from '@/modules/news/composables/useNews'

export const useNewsStore = defineStore('news', () => {
    const {
        news,
        currentNews,
        featuredNews,
        loading,
        error,
        fetchNews,
        fetchNewsById
    } = useNews()

    return {
        news,
        currentNews,
        featuredNews,
        loading,
        error,
        fetchNews,
        fetchNewsById
    }
})
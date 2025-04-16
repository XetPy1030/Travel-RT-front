// stores/useNewsStore.ts
import { defineStore } from 'pinia'
import { useNews } from '@/modules/news/composables/useNews'

export const useNewsStore = defineStore('news', () => {
    const {
        news,
        featuredNews,
        loading,
        error,
        fetchNews
    } = useNews()

    return {
        news,
        featuredNews,
        loading,
        error,
        fetchNews
    }
})
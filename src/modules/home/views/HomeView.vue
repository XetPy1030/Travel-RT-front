<template>
  <div class="home">
    <div class="hero-section">
      <h1>Добро пожаловать в Travel RT</h1>
      <p>Откройте для себя удивительные места и последние новости</p>
    </div>

    <div class="content-section">
      <div class="section">
        <div class="section-header">
          <h2>Последние новости</h2>
          <Button 
            label="Все новости" 
            icon="pi pi-arrow-right" 
            @click="$router.push('/news')"
            text
          />
        </div>
        <div v-if="newsLoading" class="loading">
          <ProgressSpinner />
        </div>
        <div v-else-if="newsError" class="error">
          {{ newsError }}
        </div>
        <div v-else class="news-grid">
          <NewsCard
            v-for="item in latestNews"
            :key="item.id"
            :news="item"
          />
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2>Популярные места</h2>
          <Button 
            label="Все места" 
            icon="pi pi-arrow-right" 
            @click="$router.push('/places')"
            text
          />
        </div>
        <div v-if="placesLoading" class="loading">
          <ProgressSpinner />
        </div>
        <div v-else-if="placesError" class="error">
          {{ placesError }}
        </div>
        <div v-else class="places-grid">
          <PlaceCard
            v-for="place in popularPlaces"
            :key="place.id"
            :place="place"
          />
        </div>
      </div>

      <div class="section">
        <div class="section-header">
          <h2>Популярные маршруты</h2>
          <Button 
            label="Все маршруты" 
            icon="pi pi-arrow-right" 
            @click="$router.push('/routers')"
            text
          />
        </div>
        <div v-if="routersLoading" class="loading">
          <ProgressSpinner />
        </div>
        <div v-else-if="routersError" class="error">
          {{ routersError }}
        </div>
        <div v-else class="routers-grid">
          <RouterCard
            v-for="router in popularRouters"
            :key="router.id"
            :router="router"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useNews } from '@/modules/news/composables/useNews.ts'
import { usePlaces } from '@/modules/places/composables/usePlaces.ts'
import { useRouters } from '@/modules/routers/composables/useRouters.ts'
import NewsCard from '@/modules/news/components/NewsCard.vue'
import PlaceCard from '@/modules/places/components/PlaceCard.vue'
import RouterCard from '@/modules/routers/components/RouterCard.vue'
import Button from 'primevue/button'
import ProgressSpinner from 'primevue/progressspinner'
import type { PlaceList, RouterList } from '@/api/generated'

interface NewsItem {
  id: number
  title: string
  description: string
  imageUrl?: string
  date: string
}

const { news: apiNews, loading: newsLoading, error: newsError, fetchNews } = useNews()
const { places, loading: placesLoading, error: placesError, fetchPlaces } = usePlaces()
const { routers, loading: routersLoading, error: routersError, fetchRouters } = useRouters()

const latestNews = ref<NewsItem[]>([])
const popularPlaces = ref<PlaceList[]>([])
const popularRouters = ref<RouterList[]>([])

onMounted(async () => {
  await Promise.all([
    fetchNews(3, 1),
    fetchPlaces(3, 1),
    fetchRouters(3, 1)
  ])
  
  latestNews.value = apiNews.value.map(item => ({
    id: item.id,
    title: item.title,
    description: item.description,
    imageUrl: item.image || undefined,
    date: item.created_at
  }))
  
  popularPlaces.value = places.value
  popularRouters.value = routers.value
})
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 0;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  border-radius: 8px;
  /* color: white; */
}

.hero-section h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
}

.hero-section p {
  font-size: 1.2rem;
  opacity: 0.9;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  background-color: var(--paper-color);
  border-radius: 8px;
  padding: 2rem;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;
}

.section-header h2 {
  font-size: 1.8rem;
  color: var(--text-color);
  margin: 0;
}

.news-grid {
  display: flex;
  gap: 2rem;
  overflow-x: auto;
  padding-bottom: 1rem;
  scrollbar-width: thin;
  scrollbar-color: var(--primary-color) var(--surface-200);
  flex-direction: column;
}

.news-grid::-webkit-scrollbar {
  height: 6px;
}

.news-grid::-webkit-scrollbar-track {
  background: var(--surface-200);
  border-radius: 3px;
}

.news-grid::-webkit-scrollbar-thumb {
  background: var(--primary-color);
  border-radius: 3px;
}

.news-grid > * {
  flex: 0 0 300px;
  margin-bottom: 0 !important;
}

.places-grid,
.routers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
}

.loading, .error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 200px;
}

.error {
  color: var(--red-500);
}
</style> 
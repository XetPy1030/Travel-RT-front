<template>
  <div class="home">
    <div class="hero-section">
      <h1>Добро пожаловать в Travel RT!</h1>
      <p>Откройте для себя удивительные места и последние новости</p>
    </div>

    <div class="content-section">
      <!-- Новости -->
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

      <!-- Места -->
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

      <!-- Маршруты -->
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
import { useNews } from '@news/composables/useNews.ts'
import { usePlaces } from '@places/composables/usePlaces.ts'
import { useRouters } from '@routers/composables/useRouters.ts'
import NewsCard from '@news/components/NewsCard.vue'
import PlaceCard from '@places/components/PlaceCard.vue'
import RouterCard from '@routers/components/RouterCard.vue'
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
  padding: 2rem 1rem;
  transition: padding 0.3s ease;
}

.hero-section {
  text-align: center;
  margin-bottom: 3rem;
  padding: 3rem 2rem;
  background: linear-gradient(135deg, var(--primary-color) 0%, var(--primary-600) 100%);
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.hero-section:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 16px rgba(0, 0, 0, 0.25);
}

.hero-section h1 {
  font-size: 2.4rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.hero-section p {
  font-size: 1.15rem;
  opacity: 0.9;
}

.content-section {
  display: flex;
  flex-direction: column;
  gap: 3rem;
}

.section {
  background-color: var(--surface-card);
  border-radius: 14px;
  padding: 2rem;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.12);
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.section:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.75rem;
  flex-wrap: wrap;
  gap: 0.75rem;
}

.section-header h2 {
  font-size: 1.7rem;
  font-weight: 600;
  color: var(--text-color);
  margin: 0;
}

.news-grid,
.places-grid,
.routers-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.75rem;
}

.news-grid > *,
.places-grid > *,
.routers-grid > * {
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.news-grid > *:hover,
.places-grid > *:hover,
.routers-grid > *:hover {
  transform: translateY(-4px);
}

.loading,
.error {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 220px;
}

.error {
  color: var(--red-500);
  font-weight: 500;
}

/* === 📱 Адаптив === */
@media (max-width: 1200px) {
  .home {
    padding: 1.5rem;
  }
  .hero-section {
    padding: 2.5rem 1.5rem;
  }
  .hero-section h1 {
    font-size: 2.1rem;
  }
}

@media (max-width: 900px) {
  .home {
    padding: 1.25rem;
  }
  .hero-section {
    padding: 2rem 1.25rem;
  }
  .hero-section h1 {
    font-size: 1.9rem;
  }
  .hero-section p {
    font-size: 1rem;
  }
  .section-header {
    flex-direction: column;
    align-items: flex-start;
    gap: 0.5rem;
  }
  .section-header h2 {
    font-size: 1.5rem;
  }
  .news-grid,
  .places-grid,
  .routers-grid {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 1.5rem;
  }
}

@media (max-width: 600px) {
  .home {
    padding: 1rem 0.75rem;
  }
  .hero-section {
    margin-bottom: 2rem;
    padding: 1.75rem 1rem;
    border-radius: 12px;
  }
  .hero-section h1 {
    font-size: 1.6rem;
  }
  .hero-section p {
    font-size: 0.95rem;
  }
  .section {
    padding: 1.5rem 1rem;
  }
  .section-header h2 {
    font-size: 1.3rem;
  }
  .news-grid,
  .places-grid,
  .routers-grid {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}
</style>

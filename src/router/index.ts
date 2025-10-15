import { createWebHistory, createRouter } from "vue-router";

import NewsDetailView from "@news/views/NewsDetailView.vue";
import NewsListView from "@news/views/NewsListView.vue";
import PlacesListView from '@places/views/PlacesListView.vue'
import PlaceDetailView from '@places/views/PlaceDetailView.vue'
import HomeView from '@home/views/HomeView.vue'
import RoutersListView from "@routers/views/RoutersListView.vue";
import RouterDetailView from "@routers/views/RouterDetailView.vue";

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomeView,
    },
    {
        path: '/news',
        name: 'news-list',
        component: NewsListView,
    },
    {
        path: '/news/:id',
        name: 'news-detail',
        component: NewsDetailView,
    },
    {
        path: '/places',
        name: 'places',
        component: PlacesListView
    },
    {
        path: '/places/:id',
        name: 'place-detail',
        component: PlaceDetailView
    },
    {
        path: '/routers',
        name: 'routers',
        component: RoutersListView,
        // TODO: use meta?
        meta: {
            title: 'Маршруты'
        }
    },
    {
        path: '/routers/:id',
        name: 'router-detail',
        component: RouterDetailView,
        meta: {
            title: 'Маршрут'
        }
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const RUS_ROUTE_NAMES: Record<string, string> = {
    'home': 'Главная',
    'news-list': 'Новости',
    'news-detail': 'Новость',
    'places': 'Места',
    'place-detail': 'Место',
    'routers': 'Маршруты',
    'router-detail': 'Маршрут',
}

router.beforeEach((to) => {
    if (to.name && to.name in RUS_ROUTE_NAMES) {
        document.title = `Путешествуем РТ | ${RUS_ROUTE_NAMES[to.name as string]}`;
    } else {
        document.title = 'Путешествуем РТ';
    }
})

export default router;

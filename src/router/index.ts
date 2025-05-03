import {createWebHistory, createRouter} from "vue-router";

import NewsDetailView from "@/modules/news/views/NewsDetailView.vue";
import NewsListView from "@/modules/news/views/NewsListView.vue";
import PlacesListView from '@/modules/places/views/PlacesListView.vue'
import PlaceDetailView from '@/modules/places/views/PlaceDetailView.vue'
import HomeView from '@/modules/home/views/HomeView.vue'
import RoutersListView from "@/modules/routers/views/RoutersListView.vue";
import RouterDetailView from "@/modules/routers/views/RouterDetailView.vue";

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

export default router;

import {createWebHistory, createRouter} from "vue-router";

import NewsDetailView from "@/modules/news/views/NewsDetailView.vue";
import NewsListView from "@/modules/news/views/NewsListView.vue";
import PlacesListView from '@/modules/places/views/PlacesListView.vue'
import PlaceDetailView from '@/modules/places/views/PlaceDetailView.vue'

const routes = [
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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

import {createWebHistory, createRouter} from "vue-router";

import NewsDetailView from "@/modules/news/views/NewsDetailView.vue";
import NewsListView from "@/modules/news/views/NewsListView.vue";

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
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router;

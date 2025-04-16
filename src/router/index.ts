// router/index.ts
{
    path: '/news/:id',
    component: () => import('@/modules/news/views/NewsDetailView.vue'),
    meta: { requiresAuth: false }
}
import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

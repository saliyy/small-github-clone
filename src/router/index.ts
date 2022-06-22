import { createWebHistory, createRouter } from 'vue-router'
import { RouteRecordRaw } from 'vue-router'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'main',
    component: () => import('@/views/Main.vue'),
  },
  {
    path: '/repositories',
    name: 'repositories',
    component: () => import('@/views/Repositories/index.vue'),
  },
  {
    path: '/users',
    name: 'users',
    component: () => import('@/views/Users/index.vue'),
  },
  {
    path: "/users/:login",
    name: "show-user",
    props: route => ({ login: route.params.login }),
    component: () => import("@/views/users/UserShow.vue"),
  },
  {
    path: "/githubrepo/:ownerName/:repoName/:branch/:path*/",
    name: "show-repo",
    props: route => ({ 
        repoName: route.params.repoName, 
        ownerName: route.params.ownerName,
        branch: route.params.branch,
        path: route.params.path
    }),
    component: () => import("@/views/repositories/ReposShow.vue"),
  },

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

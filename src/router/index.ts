import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'
import { Main } from "../Pages";
import NotFound from '../Pages/404/index.vue'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: Main,
  },
  {
    path: '/404',
    name: 'NotFound',
    component: NotFound,
  },
  {
    // catch-all 404
    path: '/:pathMatch(.*)*',
    redirect: '/404',
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router

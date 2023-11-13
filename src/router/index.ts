import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import TabsPage from '../views/TabsPage.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/tabs/me'
  },
  {
    path: '/tabs/',
    component: TabsPage,
    children: [
      {
        path: '',
        redirect: '/tabs/me'
      },
      {
        path: 'general',
        component: () => import('@/views/GeneralInfoPage.vue')
      },
      {
        path: 'documents',
        component: () => import('@/views/DocumentsPage.vue')
      },
      {
        path: 'assets',
        component: () => import('@/views/AssetsPage.vue')
      },
      {
        path: 'me',
        component: () => import('@/views/MePage.vue')
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router

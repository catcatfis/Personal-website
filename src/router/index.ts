import { createRouter, createWebHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/AboutView.vue')
  },
  {
    path: '/education',
    name: 'Education',
    component: () => import('../views/EducationView.vue')
  },
  {
    path: '/skills',
    name: 'Skills',
    component: () => import('../views/SkillsView.vue')
  },
  {
    path: '/works',
    name: 'Works',
    component: () => import('../views/WorksView.vue')
  },
  {
    path: '/contact',
    name: 'Contact',
    component: () => import('../views/ContactView.vue')
  }
]

const router = createRouter({
  history: createWebHistory('/Personal-website/'),
  routes
})

export default router

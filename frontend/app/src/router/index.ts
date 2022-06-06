import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/login',
    name: 'login',
    component: () => import( '../views/LoginView.vue')
  },
  {
    path: '/pong',
    name: 'pong',
    component: () => import( '../views/PongView.vue')
  },
  {
    path: '/users',
    name: 'users',
    component: () => import( '../views/UsersView.vue')
  },
  {
    path: '/chat',
    name: 'chat',
    component: () => import( '../views/ChatView.vue')
  },
  {
    path: '/about',
    name: 'about',
    component: () => import( '../views/AboutView.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

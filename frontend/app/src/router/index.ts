import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PongView from '@/views/PongView.vue'
import UsersView from '@/views/UsersView.vue'
import ChatView from '@/views/ChatView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MyProfileView from '@/views/MyProfileView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/profile/:id?',
    name: 'profile',
    component: ProfileView,
  },
  {
    path: '/myprofile',
    name: 'myprofile',
    component: MyProfileView,
  },
  {
    path: '/pong',
    name: 'pong',
    component: PongView,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/chat',
    name: 'chat',
    component: ChatView,
  },
  {
    path: '/about',
    name: 'about',
    component: AboutView,
  },
  {
    path: '/:catchAll(.*)',
    name: 'not-found',
    component: NotFoundView,
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

export default router

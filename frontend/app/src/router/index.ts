import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { loginStatusStore } from '@/stores/profileData'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PongView from '@/views/PongView.vue'
import UsersView from '@/views/UsersView.vue'
import ChatView from '@/views/ChatView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import EditProfileView from '@/views/EditProfileView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import GameSelectView from '@/views/GameSelectView.vue'




const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
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
    path: '/myprofile-edit',
    name: 'myprofile-edit',
    component: EditProfileView,
  },
  {
    path: '/pong',
    name: 'pong',
    component: PongView,
  },
  {
    path: '/select-game',
    name: 'select-game',
    component: GameSelectView,
  },
  {
    path: '/users',
    name: 'users',
    component: UsersView,
  },
  {
    path: '/leaderboard',
    name: 'leaderboard',
    component: LeaderboardView,
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
  },
  {
    path: '/login',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/intraAuth',
    redirect: 'https://api.intra.42.fr/oauth/authorize'
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  const loggedIn = loginStatusStore()

  if (to.name !== 'login' && !loggedIn.loggedInStatus) {
    return('/login')
  }
  if (to.name === 'login' && loggedIn.loggedInStatus) {
    return('/')
  }
})


export default router

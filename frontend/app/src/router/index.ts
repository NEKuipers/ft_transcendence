import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import { useLoginStatusStore } from '@/stores/profileData'
import LoginView from '@/views/LoginView.vue'
import HomeView from '@/views/HomeView.vue'
import ProfileView from '@/views/ProfileView.vue'
import PongView from '@/views/PongView.vue'
import UsersView from '@/views/UsersView.vue'
import ChatView from '@/views/ChatView.vue'
import AboutView from '@/views/AboutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import MyProfileView from '@/views/MyProfileView.vue'
import LeaderboardView from '@/views/LeaderboardView.vue'
import GameSelectView from '@/views/GameSelectView.vue'
import TwoFactorAuthenticationView from '@/views/TwoFactorAuthenticationView.vue'



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
    path: '/two-factor-authentication',
    name: 'two-factor-authentication',
    component: TwoFactorAuthenticationView,
  },
  {
    path: '/pong/:mode',
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
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to) => {
  // const { getLoginStatus: loggedIn } = useLoginStatusStore()
  const store = useLoginStatusStore()

  const loggedIn = store.getLoginStatus
  console.log('Ma perché', store.$state.loggedInStatus)
  console.log('E', store.$state.diocane)
  
  if (to.name !== 'login' && !loggedIn) {
    return('/login')
  }
  // if (to.name === 'login' && loggedIn.loggedInStatus) {
  //   return('/')
  // }

})


export default router

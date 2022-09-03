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
import LeaderboardView from '@/views/LeaderboardView.vue'
import GameSelectView from '@/views/GameSelectView.vue'
import TFAView from '@/views/TFAView.vue'
import SetupAccountView from '@/views/SetupAccountView.vue'




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
  },
  {
    path: '/tfa',
    name: 'tfa',
    component: TFAView,
  },
  {
	path: '/setup-account',
	name: 'setupAccount',
	component: SetupAccountView,
  }
]

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes,
})

router.beforeEach((to) => {
	const statusStore = loginStatusStore();
	if (statusStore.isLoaded) {	// Only if we have loaded whether we have logged in or not do we start redirecting to /login
		const loggedIn = statusStore.loggedInStatus
	
		if ((to.name !== 'login' && to.name !== 'tfa') && !loggedIn) {
			return('/login')
		}
	}
})


export default router

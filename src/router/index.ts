import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'
import LoanComputer from '@/views/LoanComputers.vue'
import ManageLoans from '@/views/ManageLoans.vue'
import ManageProfiles from '@/views/ManageUsers.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },

  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    redirect: '/dashboard/loan',
    children: [
      { path: 'loan', name: 'LoanComputer', component: LoanComputer },
      { path: 'manage-loans', name: 'ManageLoans', component: ManageLoans },
      { path: 'manage-profiles', name: 'ManageProfiles', component: ManageProfiles },
    ],
  },

  { path: '/404', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🧭 Global guard
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Keep user state updated
  if (!userStore.user) {
    await userStore.fetchUser()
  }

  const publicPages = ['Login', 'SignUp', 'ForgotPassword']
  const isPublic = publicPages.includes(to.name as string)
  const isLoggedIn = !!userStore.user

  // Redirect logged-in users away from public pages
  if (isLoggedIn && isPublic) {
    return next({ path: '/dashboard' })
  }

  // Protect dashboard routes
  if (!isLoggedIn && to.path.startsWith('/dashboard')) {
    return next({ path: '/login' })
  }

  next()
})

export default router

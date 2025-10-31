import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import Dashboard from '@/views/Dashboard.vue'
import NotFound from '@/views/NotFound.vue'
import LoanComputer from '@/views/LoanComputers.vue'
import ManageLoans from '@/views/ManageLoans.vue'
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
      {
        path: 'loan',
        name: 'LoanComputer',
        component: LoanComputer,
        meta: { requiresStatus: true },
      },
      {
        path: 'manage-loans',
        name: 'ManageLoans',
        component: ManageLoans,
        meta: { requiresStatus: true },
      },
    ],
  },

  { path: '/404', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// 🧭 Global navigation guard
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // 🔄 Asegurar que el usuario y el rol estén cargados
  if (!userStore.user) {
    await userStore.fetchUser()
  }

  const publicPages = ['Home', 'Login', 'SignUp', 'ForgotPassword']
  const isPublic = publicPages.includes(to.name as string)
  const isLoggedIn = !!userStore.user

  // 🚫 Usuario logueado intentando ir a Login o SignUp
  if (isLoggedIn && isPublic) {
    return next({ path: '/dashboard' })
  }

  // 🔐 Bloquear acceso a dashboard si no está logueado
  if (!isLoggedIn && to.path.startsWith('/dashboard')) {
    return next({ path: '/login' })
  }

  // 🧑‍💼 Protección de rutas con meta.requiresAdmin
  if (to.meta.requiresStatus) {
    // Si aún no se cargó el rol, intentar fetchUser nuevamente
    if (!userStore.status) {
      await userStore.fetchUser()
    }

    if (userStore.status !== 'pending') {
      // No tiene permisos
      return next({ path: '/dashboard' })
    }
  }

  next()
})

export default router

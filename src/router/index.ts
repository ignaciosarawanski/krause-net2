import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'
import Login from '@/views/Login.vue'
import SignUp from '@/views/SignUp.vue'
import NotFound from '@/views/NotFound.vue'
import { useUserStore } from '@/stores/user'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login },
  { path: '/signup', name: 'SignUp', component: SignUp },
  { path: '/404', name: 'NotFound', component: NotFound },
  { path: '/:pathMatch(.*)*', redirect: '/404' },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

// Guard global
router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore()

  // Aseguramos tener el estado actualizado del usuario
  if (!userStore.user) {
    await userStore.fetchUser()
  }

  const publicPages = ['Login', 'SignUp', 'ForgotPassword']

  if (userStore.user && publicPages.includes(to.name as string)) {
    // Redirigir al home o dashboard si el usuario está logueado
    return next({ path: '/' })
  }

  // Aquí podrías agregar rutas privadas, ej:
  // const privatePages = ['Dashboard', 'Profile']
  // if (!userStore.user && privatePages.includes(to.name as string)) {
  //   return next({ path: '/login' })
  // }

  next()
})

export default router

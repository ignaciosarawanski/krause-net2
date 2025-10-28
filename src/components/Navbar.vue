<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <nav
    class="sticky top-0 z-50 bg-gray-200 text-black text-lg p-4 shadow-md font-medium h-20 flex items-center"
  >
    <div class="container mx-auto flex justify-between items-center">
      <!-- Logo con tamaño configurable -->
      <Logo :size="48" />

      <div class="space-x-4">
        <router-link to="/" class="hover:text-gray-600">Inicio</router-link>

        <template v-if="userStore.user">
          <router-link to="/dashboard" class="hover:text-gray-600">Dashboard</router-link>
          <button
            @click="handleLogout"
            class="px-2 py-2 text-white text-lg rounded-lg bg-red-600 transition hover:bg-red-700"
          >
            Cerrar Sesión
          </button>
        </template>

        <template v-else>
          <router-link to="/login" class="hover:text-gray-600">Iniciar Sesión</router-link>
          <router-link
            to="/signup"
            class="px-2 py-2 text-white text-lg rounded-lg bg-red-600 transition hover:bg-red-700"
          >
            Registrarse
          </router-link>
        </template>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Logo from '@/components/Logo.vue'
import type { Subscription } from '@supabase/supabase-js'

const router = useRouter()
const userStore = useUserStore()

let subscription: Subscription | null = null

onMounted(async () => {
  await userStore.fetchUser()
  subscription = userStore.listenAuthChanges()
})

onUnmounted(() => {
  subscription?.unsubscribe()
})

const handleLogout = async () => {
  await userStore.logout()
  router.push('/login')
}
</script>

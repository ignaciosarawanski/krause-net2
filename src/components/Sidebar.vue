<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside class="w-64 bg-white shadow-md h-screen flex flex-col">
    <!-- Logo -->
    <div class="p-6 border-b flex justify-center">
      <Logo :size="48" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <RouterLink
        v-for="item in menu"
        :key="item.to"
        :to="item.to"
        class="flex items-center px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
        :class="{ 'bg-blue-100 text-blue-600 font-medium': route.path === item.to }"
      >
        <span class="text-lg mr-3">{{ item.icon }}</span>
        <span>{{ item.label }}</span>
      </RouterLink>
    </nav>

    <!-- Logout -->
    <div class="border-t p-4">
      <button @click="store.logout" class="w-full py-2 text-red-600 hover:text-red-700 font-medium">
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import Logo from './Logo.vue'

const store = useUserStore()
const route = useRoute()

const menu = [
  { label: 'Loan a Computer', icon: '💻', to: '/dashboard/loan' },
  { label: 'Manage Loans', icon: '📋', to: '/dashboard/manage-loans' },
  { label: 'Manage Profiles', icon: '👤', to: '/dashboard/manage-profiles' },
]
</script>

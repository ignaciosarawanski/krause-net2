<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <aside class="fixed top-0 left-0 w-64 h-screen bg-white shadow-md flex flex-col z-50">
    <!-- Logo -->
    <div class="p-6 flex justify-center">
      <Logo :size="64" />
    </div>

    <!-- Navigation -->
    <nav class="flex-1 p-4 space-y-2">
      <SidebarItem label="Pedir Computadora" icon="💻" to="/dashboard/loan" />
      <SidebarItem label="Cancelar Prestamo" icon="📋" to="/dashboard/manage-loans" />
    </nav>

    <!-- Logout -->
    <div class="text-center p-5">
      <button
        @click="store.logout"
        class="px-2 py-2 text-white text-lg rounded-lg bg-red-500 transition hover:bg-red-800 hover:cursor-pointer"
      >
        Logout
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
import { useUserStore } from '@/stores/user'
import SidebarItem from './SidebarItem.vue'

import Logo from './Logo.vue'

const store = useUserStore()
</script>

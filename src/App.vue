<template>
  <div id="app">
    <!-- Mostrar Navbar solo en rutas permitidas -->
    <Navbar v-if="showNavbar" />
    <router-view />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import Navbar from '@/components/Navbar.vue'

const route = useRoute()

// Rutas donde el Navbar sí se muestra
const visiblePaths = ['/', '/dashboard']

const showNavbar = computed(() => visiblePaths.includes(route.path))
</script>

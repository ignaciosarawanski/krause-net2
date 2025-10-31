<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex min-h-screen bg-gray-50">
    <Sidebar />
    <main class="flex-1 p-6 overflow-y-auto">
      <RouterView />
    </main>
  </div>
</template>

<script setup lang="ts">
import Sidebar from '@/components/Sidebar.vue'
</script>

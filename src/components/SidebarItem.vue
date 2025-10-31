<!-- src/components/SidebarItem.vue -->
<template>
  <RouterLink
    :to="to"
    class="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
    :class="{ 'bg-blue-100 text-blue-600 font-medium': isActive }"
  >
    <span class="text-lg mr-3">{{ icon }}</span>
    <span>{{ label }}</span>
  </RouterLink>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute, RouterLink } from 'vue-router'

const props = defineProps<{
  label: string
  icon?: string
  to: string
}>()

const route = useRoute()
const isActive = computed(() => route.path === props.to)
</script>

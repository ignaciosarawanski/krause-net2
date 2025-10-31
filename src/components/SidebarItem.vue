<template>
  <button
    @click="$emit('click')"
    class="flex items-center w-full px-4 py-2 rounded-lg text-gray-700 hover:bg-gray-100 transition"
    :class="{ 'bg-blue-100 text-blue-600 font-medium': active }"
  >
    <span class="text-lg mr-3">{{ icon }}</span>
    <span>{{ label }}</span>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  label: string
  icon?: string
  active?: boolean
}>()

defineEmits<{
  (e: 'click'): void
}>()
</script>

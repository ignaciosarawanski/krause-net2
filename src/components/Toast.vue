<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="fixed top-4 right-4 flex flex-col gap-2 z-50">
    <div
      v-for="(toast, index) in toasts"
      :key="index"
      :class="[
        'px-4 py-2 rounded shadow text-white',
        toast.type === 'success' ? 'bg-green-500' : 'bg-red-500',
      ]"
    >
      {{ toast.message }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'
defineProps<{ toasts: { message: string; type: 'success' | 'error' }[] }>()
</script>

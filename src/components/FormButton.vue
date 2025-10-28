<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    :class="buttonClasses"
    class="font-semibold rounded-lg py-2 px-4 transition-colors flex items-center justify-center"
  >
    <span v-if="loading" class="loader mr-2"></span>
    <slot>{{ label }}</slot>
  </button>
</template>

<script setup lang="ts">
import { computed } from 'vue'

interface Props {
  type?: 'button' | 'submit' | 'reset'
  label?: string
  color?: 'red' | 'green' | 'blue' | 'gray'
  disabled?: boolean
  loading?: boolean
}

const props = defineProps<Props>()

const buttonClasses = computed(() => {
  const base = 'text-white hover:cursor-pointer'
  const colors: Record<string, string> = {
    red: 'bg-red-600 hover:bg-red-700',
    green: 'bg-green-600 hover:bg-green-700',
    blue: 'bg-blue-600 hover:bg-blue-700',
    gray: 'bg-gray-500 hover:bg-gray-600',
  }
  return `${base} ${colors[props.color ?? 'gray']}`
})
</script>

<style scoped>
.loader {
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top: 2px solid white;
  border-radius: 50%;
  width: 1rem;
  height: 1rem;
  animation: spin 0.6s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>

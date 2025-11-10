<template>
  <div
    class="flex items-center justify-between bg-white py-6 px-12 rounded-2xl shadow-md max-w-3/4 mx-auto"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <div class="flex items-center justify-center">
      <img
        :src="isHovered ? openLaptop : closedLaptop"
        alt="Laptop"
        class="mx-auto transition-all duration-2000 w-32 h-32"
      />
      <div class="flex items-center space-x-2">
        <h1 class="text-lg font-semibold">Laptop: {{ name }}</h1>

        <!-- 🔵 Indicador de disponibilidad -->
        <span
          :class="[
            'w-3 h-3 rounded-full inline-block transition-colors duration-300',
            available ? 'bg-green-500' : 'bg-red-500',
          ]"
          :title="available ? 'Disponible' : 'Ocupada'"
        ></span>
      </div>
    </div>
    <button
      @click="emit('request', name)"
      class="px-2 py-2 text-white text-lg rounded-lg bg-red-500 transition hover:bg-red-800 hover:cursor-pointer"
      :disabled="!available"
    >
      Solicitar
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import openLaptop from '@/assets/images/o_laptop.png'
import closedLaptop from '@/assets/images/c_laptop.png'

interface Props {
  name: string
  available: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'request', name: string): void }>()
const isHovered = ref(false)
</script>

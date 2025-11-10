<template>
  <div
    class="flex items-center justify-between bg-white py-6 px-12 rounded-2xl shadow-md max-w-3/4 mx-auto"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false"
  >
    <!-- 🖥️ Imagen y nombre -->
    <div class="flex items-center justify-center">
      <img
        :src="isHovered ? openLaptop : closedLaptop"
        alt="Laptop"
        class="mx-auto transition-all duration-2000 w-32 h-32"
      />
      <div class="flex items-center space-x-2 ml-4">
        <h1 class="text-lg font-semibold">Laptop: {{ name }}</h1>

        <!-- 🔵 Indicador de préstamo activo -->
        <span
          :class="[
            'w-3 h-3 rounded-full inline-block transition-colors duration-300',
            active ? 'bg-red-500' : 'bg-green-500',
          ]"
          :title="active ? 'En uso' : 'Devuelta'"
        ></span>
      </div>
    </div>

    <!-- 🔘 Botón devolver -->
    <button
      @click="emit('return', name)"
      class="px-2 py-2 text-white text-lg rounded-lg bg-blue-500 transition hover:bg-blue-700 hover:cursor-pointer"
      :disabled="!active"
    >
      Devolver
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import openLaptop from '@/assets/images/o_laptop.png'
import closedLaptop from '@/assets/images/c_laptop.png'

interface Props {
  name: string
  active: boolean
}

const props = defineProps<Props>()
const emit = defineEmits<{ (e: 'return', name: string): void }>()
const isHovered = ref(false)
</script>

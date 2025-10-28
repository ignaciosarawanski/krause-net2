<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Hero Section -->
    <section
      class="flex items-center justify-center h-[calc(100vh-5rem)] bg-cover bg-center bg-fixed text-white"
      :style="{ backgroundImage: `url(${laptopImg})` }"
    >
      <div
        class="bg-gradient-to-r from-red-300/50 to-gray-100/50 backdrop-blur-sm flex flex-col items-center justify-center h-full w-full p-4 text-center"
      >
        <div class="px-16">
          <h1 class="text-6xl font-bold mb-4 drop-shadow-lg">Bienvenido a Krause Net</h1>
          <p class="text-2xl italic mb-6 drop-shadow-sm">Maneja y pide prestada tu laptop.</p>
          <router-link
            to="/signup"
            class="px-6 py-2 text-white text-lg rounded-lg font-semibold bg-red-600 hover:bg-red-700 transition shadow-lg"
          >
            Comienza Ahora
          </router-link>
        </div>
      </div>
    </section>

    <!-- FAQ Section -->
    <section class="flex items-center justify-center min-h-[calc(100vh-5rem)] text-black">
      <div class="px-20 py-10 max-w-4xl w-full">
        <div class="text-center mb-16">
          <h1 class="text-4xl font-bold mb-4">Preguntas Frecuentes</h1>
          <p class="text-lg mb-6 italic">Encuentra las respuestas a tus preguntas.</p>
        </div>

        <div v-for="(item, i) in faqs" :key="i" class="border-b border-gray-300 py-3">
          <button
            class="w-full flex justify-between items-center focus:outline-none hover:cursor-pointer"
            @click="toggle(i)"
          >
            <h3 class="font-medium text-lg text-left">{{ item.question }}</h3>
            <span
              class="transform transition-transform duration-300"
              :class="{ 'rotate-180': openIndex === i }"
              >▼</span
            >
          </button>

          <transition name="faq">
            <p v-show="openIndex === i" class="text-gray-700 mt-2">{{ item.answer }}</p>
          </transition>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import laptopImg from '@/assets/images/laptop3.webp'

const openIndex = ref<number | null>(null)

const faqs = [
  {
    question: '¿Quiénes pueden solicitar el préstamo de una computadora?',
    answer:
      'Pueden solicitar el préstamo los estudiantes, docentes o personal autorizado que necesiten una computadora temporal para sus actividades académicas o laborales.',
  },
  {
    question: '¿Qué tipo de equipos están disponibles para préstamo?',
    answer:
      'Disponemos de diferentes modelos de computadoras portátiles, desktops, y otros equipos tecnológicos necesarios para las actividades.',
  },
  {
    question: '¿Cómo solicita una computadora en préstamo?',
    answer:
      'Puede solicitarla llenando el formulario de registro y solicitando en la sección correspondiente, o contactando al personal de soporte técnico.',
  },
  {
    question: '¿Cuándo y dónde busco/devolvemos el equipo?',
    answer:
      'La entrega y devolución del equipo se realiza en la oficina de soporte técnico, en horarios establecidos, generalmente durante el horario laboral.',
  },
  {
    question: '¿Qué pasa si no devuelvo el equipo a tiempo?',
    answer:
      'Se aplicarán sanciones y restricciones para futuros préstamos, y se deberá regularizar la devolución con el personal correspondiente.',
  },
  {
    question: '¿A quién puedo contactar si tengo problemas técnicos con el equipo?',
    answer:
      'Puede comunicarse con el soporte técnico a través del correo electrónico soporte@instituto.edu o llamar al número interno 1234.',
  },
]

const toggle = (index: number) => {
  openIndex.value = openIndex.value === index ? null : index
}
</script>

<style scoped>
.faq-enter-from,
.faq-leave-to {
  opacity: 0;
  max-height: 0;
}
.faq-enter-to,
.faq-leave-from {
  opacity: 1;
  max-height: 500px;
}
.faq-enter-active,
.faq-leave-active {
  transition: all 0.3s ease;
}
</style>

<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <!-- Logo -->
    <Logo :size="128" />

    <!-- Form -->
    <form class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4">
      <h2 class="text-2xl font-bold mb-2 text-center">Iniciar Sesión</h2>

      <!-- Email -->
      <div class="flex flex-col">
        <label for="email" class="mb-1 font-medium text-gray-700">Email</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <!-- Password -->
      <div class="flex flex-col">
        <label for="password" class="mb-1 font-medium text-gray-700">Contraseña</label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          class="border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-red-500"
        />
      </div>

      <!-- Forgot Password -->
      <p class="text-sm text-gray-600">
        ¿Olvidaste tu contraseña?
        <router-link to="/forgot-password" class="text-blue-500 hover:underline">Aquí</router-link>.
      </p>

      <!-- Submit Button -->
      <button
        type="submit"
        class="bg-red-600 text-white font-semibold rounded-lg py-2 hover:bg-red-700 transition hover:cursor-pointer"
      >
        Login
      </button>

      <!-- Signup Link -->
      <p class="text-sm text-gray-600 text-center">
        ¿No tienes una cuenta?
        <router-link to="/signup" class="text-blue-500 hover:underline">Registrate</router-link>.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue'
</script>

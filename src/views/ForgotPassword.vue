<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <Logo :size="128" />

    <form
      @submit.prevent="handleForgotPassword"
      novalidate
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-bold mb-2 text-center">Olvidaste tu contraseña</h2>

      <p class="text-md text-gray-800 italic text-center">
        Ingresa tu email para recibir un enlace de restablecimiento de contraseña.
      </p>

      <FormInput
        v-model="values.email.value"
        label="Email"
        id="email"
        type="email"
        :hasError="!!errors.email.value"
        :errorMessage="errors.email.value"
        @input="clearError('email')"
      />

      <FormButton type="submit" color="blue" label="Enviar enlace" />

      <p class="text-sm text-gray-600 text-center">
        ¿Recordaste tu contraseña?
        <router-link to="/login" class="text-blue-500 hover:underline">Inicia Sesión</router-link>.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import { useAuthForm } from '@/composables/useAuthForm'

type FieldName = 'email'
const fields: FieldName[] = ['email']

const { values, errors, validateAll, clearError } = useAuthForm(fields)

const handleForgotPassword = () => {
  if (!validateAll()) return
  console.log('Forgot password form submitted:', values.email.value)
}
</script>

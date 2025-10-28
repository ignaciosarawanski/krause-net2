<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <Logo :size="128" />

    <form
      @submit.prevent="handleLogin"
      novalidate
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-bold mb-2 text-center">Iniciar Sesión</h2>

      <FormInput
        v-model="values.email.value"
        label="Email"
        id="email"
        type="text"
        :hasError="!!errors.email.value"
        :errorMessage="errors.email.value"
        @input="clearError('email')"
      />

      <FormInput
        v-model="values.password.value"
        label="Contraseña"
        id="password"
        type="password"
        :hasError="!!errors.password.value"
        :errorMessage="errors.password.value"
        @input="clearError('password')"
      />

      <p class="text-sm text-gray-600">
        ¿Olvidaste tu contraseña?
        <router-link to="/forgotpassword" class="text-blue-500 hover:underline">Aquí</router-link>.
      </p>

      <FormButton type="submit" color="red" class="w-full"> Iniciar Sesión </FormButton>

      <p class="text-sm text-gray-600 text-center">
        ¿No tienes una cuenta?
        <router-link to="/signup" class="text-blue-500 hover:underline">Registrate</router-link>.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import Logo from '@/components/Logo.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import { useAuthForm } from '@/composables/useAuthForm'

type FieldName = 'email' | 'password'

const fields: FieldName[] = ['email', 'password']

const { values, errors, validateAll, clearError } = useAuthForm(fields)

const handleLogin = () => {
  if (!validateAll()) return

  console.log('Login válido:', {
    email: values.email.value,
    password: values.password.value,
  })
}
</script>

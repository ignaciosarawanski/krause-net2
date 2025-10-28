<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <Logo :size="128" class="mb-8" />

    <form
      @submit.prevent="handleRegister"
      novalidate
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-lg flex flex-col gap-6"
    >
      <h2 class="text-2xl font-bold mb-2 text-center">Regístrate</h2>

      <!-- Nombre & DNI -->
      <div class="w-full flex flex-col sm:flex-row gap-4">
        <FormInput
          v-model="values.fullName.value"
          label="Nombre Completo"
          id="fullName"
          :has-error="!!errors.fullName.value"
          :error-message="errors.fullName.value"
          @input="clearError('fullName')"
          class="flex-1"
        />
        <FormInput
          v-model="values.dni.value"
          label="DNI"
          id="dni"
          type="number"
          :has-error="!!errors.dni.value"
          :error-message="errors.dni.value"
          @input="clearError('dni')"
          class="flex-1"
        />
      </div>

      <!-- Email -->
      <FormInput
        v-model="values.email.value"
        label="Email"
        id="email"
        type="email"
        :has-error="!!errors.email.value"
        :error-message="errors.email.value"
        @input="clearError('email')"
      />

      <!-- Password -->
      <FormInput
        v-model="values.password.value"
        label="Contraseña"
        id="password"
        type="password"
        :has-error="!!errors.password.value"
        :error-message="errors.password.value"
        :visible-password="visiblePasswordId"
        :set-visible-password="setVisiblePassword"
        @input="clearError('password')"
      />

      <!-- Confirm Password -->
      <FormInput
        v-model="values.confirmPassword.value"
        label="Confirmar Contraseña"
        id="confirmPassword"
        type="password"
        :has-error="!!errors.confirmPassword.value"
        :error-message="errors.confirmPassword.value"
        :visible-password="visiblePasswordId"
        :set-visible-password="setVisiblePassword"
        @input="clearError('confirmPassword')"
      />

      <FormButton type="submit" color="green" class="w-full"> Registrarse </FormButton>

      <p class="text-sm text-gray-600 text-center mt-4">
        ¿Ya tienes una cuenta?
        <router-link to="/login" class="text-blue-500 hover:underline">Inicia Sesión</router-link>.
      </p>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import Logo from '@/components/Logo.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
import { useAuthForm } from '@/composables/useAuthForm'

const fields = ['fullName', 'dni', 'email', 'password', 'confirmPassword'] as const
const { values, errors, validateAll, clearError } = useAuthForm(fields.slice())

const visiblePasswordId = ref<string | null>(null)
const setVisiblePassword = (id: string) => {
  visiblePasswordId.value = visiblePasswordId.value === id ? null : id
}

const handleRegister = () => {
  if (!validateAll()) return
  console.log('Registro válido:', Object.fromEntries(fields.map((f) => [f, values[f].value])))
}
</script>

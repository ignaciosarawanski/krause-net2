<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <Logo :size="128" />

    <!-- Contenido según estado -->
    <div
      v-if="!isLoggedIn"
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-bold mb-2 text-center">Iniciar Sesión</h2>

      <FormInput
        v-model="values.email.value"
        label="Email"
        id="email"
        type="text"
        :has-error="!!errors.email.value"
        :error-message="errors.email.value"
        @input="clearError('email')"
      />

      <FormInput
        v-model="values.password.value"
        label="Contraseña"
        id="password"
        type="password"
        :has-error="!!errors.password.value"
        :error-message="errors.password.value"
        @input="clearError('password')"
      />

      <FormButton type="submit" color="red" class="w-full" @click="handleLogin">
        Iniciar Sesión
      </FormButton>

      <p class="text-sm text-gray-600 text-center">
        ¿No tienes una cuenta?
        <router-link to="/signup" class="text-blue-500 hover:underline">Registrate</router-link>.
      </p>
    </div>

    <!-- Mensaje de éxito -->
    <div
      v-else
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-6 items-center text-center"
    >
      <h2 class="text-2xl font-bold mb-2">¡Login Exitoso!</h2>
      <p class="text-gray-700 mb-4">Redireccionando a tu cuenta...</p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Components
import Logo from '@/components/Logo.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'
// Utilities
import { useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import { useAuthForm } from '@/composables/useAuthForm'
import { ref } from 'vue'

type FieldName = 'email' | 'password'
const fields: FieldName[] = ['email', 'password']

const { values, errors, validateAll, clearError } = useAuthForm(fields)

const router = useRouter()
const isLoggedIn = ref(false)

const handleLogin = async () => {
  if (!validateAll()) return

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.value,
      password: values.password.value,
    })

    if (error) {
      if (error.message.includes('Invalid login credentials')) {
        errors.email.value = 'Email o contraseña incorrecta'
        errors.password.value = 'Email o contraseña incorrecta'
      } else {
        alert(error.message)
      }
      return
    }
    if (!data.session) throw new Error('No se pudo iniciar sesión')

    isLoggedIn.value = true
    setTimeout(() => {
      router.push('/dashboard')
    }, 3000)
    //
  } catch (err: unknown) {
    console.error('Error al iniciar sesión:', err)

    if (err instanceof Error) {
      alert(err.message)
    } else if (typeof err === 'string') {
      alert(err)
    } else {
      alert('Ocurrió un error inesperado')
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
    <Logo :size="128" />

    <!-- Formulario -->
    <form
      v-if="!isSuccess"
      @submit.prevent="handleResetPassword"
      novalidate
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-4"
    >
      <h2 class="text-2xl font-bold mb-2 text-center">Restablecer contraseña</h2>
      <p class="text-md text-gray-800 italic text-center mb-4">Ingresa tu nueva contraseña.</p>

      <FormInput
        v-model="newPassword"
        label="Nueva Contraseña"
        id="newPassword"
        type="password"
        :has-error="!!errors.newPassword"
        :error-message="errors.newPassword"
        @input="errors.newPassword = ''"
      />

      <FormInput
        v-model="confirmPassword"
        label="Confirmar Contraseña"
        id="confirmPassword"
        type="password"
        :has-error="!!errors.confirmPassword"
        :error-message="errors.confirmPassword"
        @input="errors.confirmPassword = ''"
      />

      <FormButton type="submit" color="blue" class="w-full"> Cambiar Contraseña </FormButton>

      <p v-if="errors.general" class="text-red-500 text-sm text-center mt-2">
        {{ errors.general }}
      </p>
    </form>

    <!-- Mensaje de éxito -->
    <div
      v-else
      class="bg-white p-8 rounded-lg shadow-md w-full max-w-sm flex flex-col gap-6 items-center text-center"
    >
      <h2 class="text-2xl font-bold mb-2">¡Contraseña actualizada!</h2>
      <p class="text-gray-700 mb-4">
        Tu contraseña se cambió correctamente. Redireccionando a login...
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { supabase } from '@/lib/supabase'
import Logo from '@/components/Logo.vue'
import FormInput from '@/components/FormInput.vue'
import FormButton from '@/components/FormButton.vue'

const newPassword = ref('')
const confirmPassword = ref('')
const errors = ref({ newPassword: '', confirmPassword: '', general: '' })
const isSuccess = ref(false)

const router = useRouter()
const route = useRoute()
const token = ref<string | null>(null)

// Capturar token desde el hash (link de reset)
onMounted(() => {
  // Supabase envía el access_token en el hash del link
  token.value = route.hash.match(/access_token=([^&]+)/)?.[1] ?? null
  if (!token.value) {
    router.push('/login')
  }
})

const handleResetPassword = async () => {
  // Validaciones
  if (!newPassword.value) {
    errors.value.newPassword = 'Ingresa una nueva contraseña'
    return
  }
  if (newPassword.value !== confirmPassword.value) {
    errors.value.confirmPassword = 'Las contraseñas no coinciden'
    return
  }

  try {
    if (!token.value) throw new Error('Token inválido o expirado.')

    // Actualizar la contraseña. Supabase reconoce automáticamente la sesión temporal del link
    const { error } = await supabase.auth.updateUser({ password: newPassword.value })
    if (error) throw error

    isSuccess.value = true

    // Redirigir al login después de 3 segundos
    setTimeout(() => router.push('/login'), 3000)
  } catch (err: unknown) {
    console.error('Error al cambiar contraseña:', err)
    if (err instanceof Error) errors.value.general = err.message
    else errors.value.general = 'Ocurrió un error inesperado. Intenta nuevamente.'
  }
}
</script>

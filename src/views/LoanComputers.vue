<template>
  <div class="bg-white p-30 rounded-2xl shadow-md max-w-lg mx-auto text-center">
    <h2 class="text-2xl font-semibold mb-4">Solicitar computadora</h2>

    <button
      @click="requestLoan"
      :disabled="loading"
      class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:opacity-50"
    >
      {{ loading ? 'Procesando...' : 'Solicitar' }}
    </button>

    <p v-if="message" class="mt-4 text-gray-700">{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const message = ref<string | null>(null)
const loading = ref(false)

async function requestLoan() {
  loading.value = true
  message.value = null

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    message.value = 'Debes estar logueado.'
    loading.value = false
    return
  }

  // Buscar perfil
  const { data: profile } = await supabase
    .from('profiles')
    .select('id')
    .eq('id', user.id)
    .maybeSingle()

  if (!profile) {
    message.value = 'No se encontró tu perfil.'
    loading.value = false
    return
  }

  // Verificar si ya tiene préstamo
  const { data: activeLoan } = await supabase
    .from('loans')
    .select('*')
    .eq('user_id', profile.id)
    .maybeSingle()

  if (activeLoan) {
    message.value = 'Ya tenés una computadora asignada.'
    loading.value = false
    return
  }

  // Buscar una disponible
  const { data: available } = await supabase
    .from('computers')
    .select('*')
    .eq('available', true)
    .limit(1)
    .maybeSingle()

  if (!available) {
    message.value = 'No hay computadoras disponibles.'
    loading.value = false
    return
  }

  // Crear préstamo y marcar como no disponible
  const { error: loanError } = await supabase
    .from('loans')
    .insert([{ user_id: profile.id, computer_id: available.id }])

  if (loanError) {
    message.value = 'Error al registrar el préstamo.'
    loading.value = false
    return
  }

  await supabase.from('computers').update({ available: false }).eq('id', available.id)

  message.value = `Se te asignó la computadora: ${available.name}`
  loading.value = false
}
</script>

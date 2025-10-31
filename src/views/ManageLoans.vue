<template>
  <div class="bg-white p-30 rounded-2xl shadow-md max-w-lg mx-auto text-center">
    <h2 class="text-2xl font-semibold mb-4">Cancelar préstamo</h2>

    <button
      @click="cancelLoan"
      :disabled="loading"
      class="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 disabled:opacity-50"
    >
      {{ loading ? 'Procesando...' : 'Cancelar préstamo' }}
    </button>

    <p v-if="message" class="mt-4 text-gray-700">{{ message }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { supabase } from '@/lib/supabase'

const message = ref<string | null>(null)
const loading = ref(false)

async function cancelLoan() {
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

  // Buscar préstamo activo
  const { data: loan } = await supabase
    .from('loans')
    .select('*')
    .eq('user_id', user.id)
    .maybeSingle()

  if (!loan) {
    message.value = 'No tenés préstamos activos.'
    loading.value = false
    return
  }

  // Liberar computadora
  await supabase.from('computers').update({ available: true }).eq('id', loan.computer_id)

  // Borrar préstamo
  await supabase.from('loans').delete().eq('id', loan.id)

  message.value = 'Préstamo cancelado correctamente.'
  loading.value = false
}
</script>

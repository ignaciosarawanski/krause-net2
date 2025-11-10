<template>
  <div class="space-y-4">
    <LaptopDisplay
      v-for="laptop in laptops"
      :key="laptop.id"
      :name="laptop.name"
      :available="laptop.available"
      @request="requestLoan"
    />

    <p v-if="message" class="mt-4 text-center text-sm text-gray-600">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import LaptopDisplay from '@/components/LaptopDisplay.vue'

interface Laptop {
  id: string
  name: string
  available: boolean
}

const laptops = ref<Laptop[]>([])
const message = ref<string | null>(null)
const loading = ref(false)

// 📦 Cargar todas las computadoras al montar
onMounted(async () => {
  const { data } = await supabase.from('computers').select('*').order('name', { ascending: true })
  if (data) laptops.value = data
})

// 🖱️ Manejar solicitud desde un LaptopDisplay
async function requestLoan(name: string) {
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

  const { data: activeLoan } = await supabase
    .from('loans')
    .select('*, computers(name)')
    .eq('user_id', profile.id)
    .maybeSingle()

  if (activeLoan) {
    alert(`Ya tenés una computadora asignada: ${activeLoan.computers?.name || 'desconocida'}`)
    message.value = 'Ya tenés una computadora asignada.'
    loading.value = false
    return
  }

  // Buscar la laptop seleccionada
  const laptop = laptops.value.find((l) => l.name === name)
  if (!laptop || !laptop.available) {
    message.value = 'Esa computadora no está disponible.'
    loading.value = false
    return
  }

  // Crear préstamo
  const { error: loanError } = await supabase
    .from('loans')
    .insert([{ user_id: profile.id, computer_id: laptop.id }])

  if (loanError) {
    message.value = 'Error al registrar el préstamo.'
    loading.value = false
    return
  }

  await supabase.from('computers').update({ available: false }).eq('id', laptop.id)
  laptop.available = false // actualiza el estado local

  message.value = `Se te asignó la computadora: ${laptop.name}`
  loading.value = false
}
</script>

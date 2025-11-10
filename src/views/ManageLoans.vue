<template>
  <div class="space-y-4">
    <!-- 🖥️ Tarjetas de préstamos activos -->
    <ReturnLaptopCard
      v-for="loan in activeLoans"
      :key="loan.id"
      :name="loan.computers?.name || 'Desconocida'"
      :active="true"
      @return="cancelLoan"
    />

    <p v-if="message" class="mt-4 text-center text-sm text-gray-600">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { supabase } from '@/lib/supabase'
import ReturnLaptopCard from '@/components/ReturnLaptopDisplay.vue'

interface Loan {
  id: number
  computers: {
    id: number
    name: string
  }[]
}

const activeLoans = ref<Loan[]>([])
const message = ref<string | null>(null)
const loading = ref(false)

// 📦 Cargar préstamos activos del usuario
onMounted(async () => {
  await fetchLoans()
})

// 🔄 Obtener préstamos activos del usuario
async function fetchLoans() {
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

  const { data, error } = await supabase
    .from('loans')
    .select('id, computers:computer_id(id, name)')
    .eq('user_id', profile.id)

  if (error) {
    console.error(error)
    message.value = 'Error al cargar tus préstamos.'
  } else if (!data?.length) {
    message.value = 'No tenés préstamos activos.'
  } else {
    activeLoans.value = data
  }

  loading.value = false
}

// 💾 Cancelar préstamo (devolver computadora)
async function cancelLoan(name: string) {
  const confirmReturn = confirm(`¿Seguro que querés devolver la computadora ${name}?`)
  if (!confirmReturn) return

  loading.value = true
  message.value = null

  const { data: computer } = await supabase
    .from('computers')
    .select('id')
    .eq('name', name)
    .maybeSingle()

  if (!computer) {
    message.value = 'No se encontró la computadora.'
    loading.value = false
    return
  }

  const { error: deleteError } = await supabase
    .from('loans')
    .delete()
    .eq('computer_id', computer.id)

  if (deleteError) {
    console.error(deleteError)
    message.value = 'Error al devolver la computadora.'
    loading.value = false
    return
  }

  await supabase.from('computers').update({ available: true }).eq('id', computer.id)

  message.value = `Has devuelto la computadora ${name}.`
  await fetchLoans() // refresca lista
  loading.value = false
}
</script>

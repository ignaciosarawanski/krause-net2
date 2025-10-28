import { ref } from 'vue'
import { supabase } from '@/lib/supabase'
import { useToast } from './useToast'
import { useRouter } from 'vue-router'

export function useRegister() {
  const isLoading = ref(false)
  const toast = useToast()
  const router = useRouter()

  const register = async (email: string, password: string, fullname: string, dni: string) => {
    isLoading.value = true
    try {
      const { data: authData, error: authError } = await supabase.auth.signUp({ email, password })
      if (authError) throw new Error(authError.message)
      if (!authData.user) throw new Error('No se pudo crear el usuario.')

      const { error: profileError } = await supabase.from('profiles').insert({
        id: authData.user.id,
        fullname,
        document: parseInt(dni),
        status: 'pending',
        role: 'pending',
      })

      if (profileError) throw new Error(profileError.message)

      // ✅ Toast de éxito aquí
      toast.show('¡Registro exitoso! Redirigiendo al login...', 'success')
      setTimeout(() => router.push('/login'), 3000)
    } catch (err: unknown) {
      if (err instanceof Error) toast.show(err.message, 'error')
      else toast.show('Error inesperado', 'error')
    } finally {
      isLoading.value = false
    }
  }

  return { register, isLoading }
}

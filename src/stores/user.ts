import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  // 🔐 AUTH STATE
  const user = ref<User | null>(null)
  const status = ref<string | null>(null)

  // 🔄 Fetch user + status
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user

    if (user.value) {
      // Buscamos el rol en la tabla users (columna status)
      const { data: profile, error } = await supabase
        .from('profiles')
        .select('status')
        .eq('id', user.value.id)
        .single()

      if (!error && profile) {
        status.value = profile.status
      } else {
        status.value = null
      }
    } else {
      status.value = null
    }
  }

  // 👂 Escucha cambios de sesión
  const listenAuthChanges = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
      if (!session) status.value = null
    })
    return subscription
  }

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    status.value = null
  }

  // 💻 DASHBOARD VIEW STATE (opcional si usás router)
  const currentView = ref<'loan' | 'manageLoans' | 'manageProfiles'>('loan')
  const setView = (view: 'loan' | 'manageLoans' | 'manageProfiles') => {
    currentView.value = view
  }

  return {
    user,
    status,
    fetchUser,
    listenAuthChanges,
    logout,
    currentView,
    setView,
  }
})

import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  // 🔐 AUTH STATE
  const user = ref<User | null>(null)
  const role = ref<string | null>(null)

  // 🔄 Fetch user + role
  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user

    if (user.value) {
      // Buscamos el rol en la tabla users (columna role)
      const { data: profile, error } = await supabase
        .from('users')
        .select('role')
        .eq('id', user.value.id)
        .single()

      if (!error && profile) {
        role.value = profile.role
      } else {
        role.value = null
      }
    } else {
      role.value = null
    }
  }

  // 👂 Escucha cambios de sesión
  const listenAuthChanges = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
      if (!session) role.value = null
    })
    return subscription
  }

  // 🚪 Logout
  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
    role.value = null
  }

  // 💻 DASHBOARD VIEW STATE (opcional si usás router)
  const currentView = ref<'loan' | 'manageLoans' | 'manageProfiles'>('loan')
  const setView = (view: 'loan' | 'manageLoans' | 'manageProfiles') => {
    currentView.value = view
  }

  return {
    user,
    role,
    fetchUser,
    listenAuthChanges,
    logout,
    currentView,
    setView,
  }
})

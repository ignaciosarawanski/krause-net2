// src/stores/store.ts
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'

export const useUserStore = defineStore('user', () => {
  // 🔐 AUTH STATE
  const user = ref<User | null>(null)

  const fetchUser = async () => {
    const { data } = await supabase.auth.getUser()
    user.value = data.user
  }

  const listenAuthChanges = () => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      user.value = session?.user || null
    })
    return subscription
  }

  const logout = async () => {
    await supabase.auth.signOut()
    user.value = null
  }

  // 💻 DASHBOARD VIEW STATE
  const currentView = ref<'loan' | 'manageLoans' | 'manageProfiles'>('loan')

  const setView = (view: 'loan' | 'manageLoans' | 'manageProfiles') => {
    currentView.value = view
  }

  return {
    user,
    fetchUser,
    listenAuthChanges,
    logout,
    currentView,
    setView,
  }
})

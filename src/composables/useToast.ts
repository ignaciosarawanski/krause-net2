// useToast.ts
import { reactive } from 'vue'

const state = reactive<{ toasts: { message: string; type: 'success' | 'error' }[] }>({
  toasts: [],
})

export function useToast() {
  const show = (message: string, type: 'success' | 'error') => {
    state.toasts.push({ message, type })
    setTimeout(() => {
      state.toasts.shift()
    }, 3000)
  }

  return { toasts: state.toasts, show }
}

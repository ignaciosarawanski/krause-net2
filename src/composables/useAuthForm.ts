import { ref, type Ref } from 'vue'
import { validateField, type FieldType } from '@/lib/validators'

export type FieldName = FieldType
type FieldRefs = { [K in FieldName]: Ref<string> }
type ErrorRefs = { [K in FieldName]: Ref<string | undefined> }

export function useAuthForm<T extends FieldName>(fields: T[]) {
  const values = {} as FieldRefs
  const errors = {} as ErrorRefs

  fields.forEach((f) => {
    values[f] = ref('')
    errors[f] = ref(undefined)
  })

  const validateAll = (): boolean => {
    let hasError = false
    for (const field of fields) {
      const value = values[field].value
      const error =
        field === 'confirmPassword'
          ? validateField(value, field, values['password'].value)
          : validateField(value, field)
      errors[field].value = error ?? undefined
      if (error) hasError = true
    }
    return !hasError
  }

  const clearError = (field: T) => {
    errors[field].value = undefined
  }

  return { values, errors, validateAll, clearError }
}

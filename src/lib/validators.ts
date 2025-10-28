export type FieldType = 'email' | 'password' | 'confirmPassword' | 'fullName' | 'dni'

export function validateField(
  value: string,
  type: FieldType,
  passwordValue?: string,
): string | undefined {
  if (!value || value.trim() === '') {
    switch (type) {
      case 'email':
        return 'Este campo es obligatorio'
      case 'password':
      case 'confirmPassword':
        return 'La contraseña es obligatoria'
      case 'fullName':
        return 'El nombre completo es obligatorio'
      case 'dni':
        return 'El DNI es obligatorio'
    }
  }

  switch (type) {
    case 'email': {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) return 'Ingrese un email válido'
      break
    }
    case 'password': {
      if (value.length < 8) return 'La contraseña debe tener al menos 8 caracteres'
      break
    }
    case 'confirmPassword': {
      if (passwordValue !== undefined && value !== passwordValue)
        return 'Las contraseñas no coinciden'
      break
    }
    case 'dni': {
      if (!/^\d{7,}$/.test(value)) return 'El DNI debe tener al menos 7 dígitos'
      break
    }
  }

  return undefined
}

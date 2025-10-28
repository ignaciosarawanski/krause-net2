export function getAuthErrorMessage(error: { status?: number; message?: string }) {
  if (!error) return 'Error inesperado'

  // Ejemplos de códigos comunes de Supabase Auth
  switch (error.status) {
    case 400:
      return 'Email o contraseña incorrectos'
    case 403:
      return 'Usuario no autorizado'
    case 429:
      return 'Demasiados intentos, intente más tarde'
    default:
      return error.message || 'Error de autenticación'
  }
}

export function showError({ err }) {
  console.error(err.response?.data?.message || 'Error desconocido')
  return { success: err.response?.data?.success, error: err.response?.data?.message || 'Error desconocido' }
}
export function dataRevision(data){
  if (!data.success) {
    alert(data.error || 'Error desconocido')
    return
  }
}
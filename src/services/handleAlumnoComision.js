export function handleAlumnoComision({ e, alumnos }) {
  const { value } = e.target
  alumnos.push(value)

}
export function handleCursoComision({ e, year }) {
  const { value } = e.target
  console.log(value)
  const materias = JSON.parse(value)
  const materiasYear = materias.filter((materia) => materia.year === year)
  console.log(materiasYear)

  return materiasYear
}
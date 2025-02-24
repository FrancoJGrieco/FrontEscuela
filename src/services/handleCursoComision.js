export function handleCursoComision({ e, year }) {
  const { value } = e.target
  const materias = JSON.parse(value)
  const materiasYear = materias.filter((materia) => materia.year === year)

  return materiasYear
}
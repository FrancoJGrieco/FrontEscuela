import axios from "axios"

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function deleteMateriaCurso( element, curso ) {
  curso.materias = curso.materias.filter((materia) => materia._id !== element._id)
  console.log(element, curso)
  const res = await axios.put(`${URL_FETCH_DATA}cursos/${curso._id}`, curso, { withCredentials: true })

  console.log(res)
}
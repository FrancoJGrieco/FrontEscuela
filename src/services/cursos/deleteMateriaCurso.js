import axios from "axios"

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function deleteMateriaCurso(element, curso) {
  const newCurso = curso.materias.filter((materia) => materia._id !== element._id)
  
  const res = await axios.put(`${URL_FETCH_DATA}cursos/${curso._id}`, {materias: newCurso}, { withCredentials: true })

  return res.data.curso
}
import axios from "axios";

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function addMateriaCurso({ curso, _id }) {
  curso.materias.push(_id)
  const res = await axios.put(`${URL_FETCH_DATA}cursos/${curso._id}`, curso , { withCredentials: true })
  return res.data.curso
}
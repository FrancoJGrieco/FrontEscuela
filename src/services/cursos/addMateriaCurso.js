import axios from "axios";

const URL_FETCH_DATA = process.env.REACT_APP_API_URL

export async function addMateriaCurso({ curso, _id }) {
  curso.materias.push(_id)
  const res = await axios.put(`${URL_FETCH_DATA}/cursos/${curso._id}`, curso , { withCredentials: true })
  return res.data.curso
}
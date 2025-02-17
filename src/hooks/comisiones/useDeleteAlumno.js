import axios from "axios"

export function useDeleteAlumno() {
  const URL_FETCH_DATA = 'http://localhost:3030/'

  const deleteAlumno = async (element, comision) => {
    const newComision = comision.alumnos.filter((alumno) => alumno._id !== element._id)

    const res = await axios.put(`${URL_FETCH_DATA}comisiones/${comision._id}`, { curso: comision.curso, materias: comision.materias, alumnos: newComision }, { withCredentials: true })

    return res.data.comision
  }

  return { deleteAlumno }
}
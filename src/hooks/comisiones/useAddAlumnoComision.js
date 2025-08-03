import axios from "axios"
import { DataContext } from "../global/data"
import { useContext } from "react"

export function useAddAlumnoComision() {
  const { data, setData } = useContext(DataContext)

  const addAlumnoComision = async ({ comision, alumnoDNI }) => {

    if (!comision.curso) {
      alert(`Error: La comision no tiene curso. \nAgrege un curso en modificar comision.`)
      return
    }

    if (comision.materias.length === 0) {
      alert(`Error: La comision no tiene materias. \nAgrege materias al curso y vuelva a modificar la comision.`)
      return
    }

    const alumnoFilter = (data.alumnos.filter((alumno) => alumno.dni === alumnoDNI))[0]

    if (!alumnoFilter) {
      alert(`Error: No se encontro el alumno con DNI: ${alumnoDNI}`)
      return
    }

    const index = comision.alumnos.findIndex((alumno) => alumno.dni === alumnoDNI)

    if (index >= 0) {
      alert(`Error: El alumno ${comision.alumnos[index].nombre + ' ' + comision.alumnos[index].apellido} ya pertenece a la comision`)
      return
    }

    comision.alumnos.push(alumnoFilter)

    setData((prevState) => ({
      ...prevState,
      comisiones: prevState.comisiones.map((item) =>
        item._id === comision._id ? comision : item
      )
    }))


    let materiasBoletin = []

    try {
      const resMaterias = await Promise.all(
        comision.materias.map((materia) =>
          axios.post(process.env.REACT_APP_API_URL + '/materias_boletin', { materia, notas: [] })
        )
      )
      resMaterias.forEach(resMateria => {
        materiasBoletin.push(resMateria.data.materiaBoletin._id)
      })
    } catch (err) {
      console.error('Error en una de las solicitudes: ' + err)
    }

    const resBoletin = await axios.post(
      process.env.REACT_APP_API_URL + '/boletines',
      {
        curso: comision.curso._id,
        comision: comision._id,
        year: new Date().getFullYear(),
        materias: materiasBoletin,
        alumno: alumnoFilter
      })

    const idBoletin = resBoletin.data.boletin._id

    await Promise.all(
      materiasBoletin.map((materia) =>
        axios.put(process.env.REACT_APP_API_URL + '/materias_boletin/' + materia, { boletin: idBoletin, materia, notas: [] })
      )
    )
    alumnoFilter.boletines.push(resBoletin.data.boletin)

    await axios.put(process.env.REACT_APP_API_URL + '/alumnos/' + alumnoFilter._id, alumnoFilter)

    await axios.put(`${process.env.REACT_APP_API_URL}comisiones/${comision._id}`, comision, { withCredentials: true })

  }

  return { addAlumnoComision }
}
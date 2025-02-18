import axios from "axios"
import { DataContext } from "../global/data"
import { useContext } from "react"

export function useAddAlumnoComision() {
  const URL_FETCH_DATA = 'http://localhost:3030/'
  const { data, setData } = useContext(DataContext)

  const addAlumnoComision = async ({ comision, alumnoDNI }) => {
    const alumnoFilter = (data.alumnos.filter((alumno) => alumno.dni === alumnoDNI))[0]

    if(!alumnoFilter){
      console.error('Error: No se encontro el alumno con DNI:', alumnoDNI)
      return
    }
    
    comision.alumnos.push(alumnoFilter)

    setData((prevState) => ({
      ...prevState,
      comisiones: prevState.comisiones.map((item) =>
        item._id === comision._id ? comision : item
      )
    }))
    await axios.put(`${URL_FETCH_DATA}comisiones/${comision._id}`, comision, { withCredentials: true })

    let materiasBoletin = []

    try {
      const resMaterias = await Promise.all(
        comision.materias.map((materia) =>
          axios.post('http://localhost:3030/materias_boletin', { materia, notas: [] })
        )
      )
      resMaterias.forEach(resMateria => {
        materiasBoletin.push(resMateria.data.materiaBoletin._id)
      })
    } catch (err) {
      console.error('Error en una de las solicitudes: ' + err)
    }


    const resBoletin = await axios.post(
      'http://localhost:3030/boletines',
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
        axios.put('http://localhost:3030/materias_boletin/' + materia, { boletin: idBoletin, materia, notas: [] })
      )
    )
    alumnoFilter.boletines.push(resBoletin.data.boletin)

    await axios.put('http://localhost:3030/alumnos/' + alumnoFilter._id, alumnoFilter)

  }

  return { addAlumnoComision }
}
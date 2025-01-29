import { useContext } from 'react'
import alumnosStore from '../../stores/alumnosStore'
import comisionesStore from '../../stores/comisionesStore'
import { FormContext } from '../../hooks/global/forms'
import ModalWindow from '../general/ModalWindow'
import { updateData } from '../../services/updateData'
import { FormVisibilityContext } from '../../hooks/global/filters'

export default function AlumnosComisiones() {
  const store = comisionesStore()
  const storeAlumnos = alumnosStore()
  const { formVisibility } = useContext(FormVisibilityContext)
  // el fetch hacerlo cuando entro a comisiones
  console.log(formVisibility)
  if (formVisibility !== 'alumnos') return <></>

  return (
    <>
      <button onClick={store.cerrarForm}>x</button>
      <h2>{store.updateForm.numero}</h2>
      <h3>Año: {store.updateForm.year}</h3>
      <label>Alumnos</label>
      {store.updateForm.alumnos.length > 0 &&
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Edad</th>
              <th>DNI</th>
            </tr>
          </thead>
          <tbody>

            {store.updateForm.alumnos.map((alumno) => {
              return (
                <tr>
                  <td>{alumno.nombre}</td>
                  <td>{alumno.apellido}</td>
                  <td>{alumno.edad}</td>
                  <td>{alumno.dni}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
      }
      <select onChange={store.handleAlumnoSeleccionado} name="alumnoSeleccionado" >
        <option value=''> </option>
        {storeAlumnos.alumnos.map((alumno) => (
          <option key={alumno._id} value={alumno._id}>
            {alumno.nombre} {alumno.apellido}
          </option>
        ))}
      </select>
      <button onClick={store.agregarAlumno}>Agregar</button><br />
    </>
  )
}

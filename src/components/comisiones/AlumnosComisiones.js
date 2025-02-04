import { useContext, useEffect, useState } from 'react'
import comisionesStore from '../../stores/comisionesStore'
import { FormContext } from '../../hooks/global/forms'
import { updateData } from '../../services/updateData'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { useGetAlumnos } from '../../hooks/alumnos/useGetAlumnos'
import { handleCursoComision } from '../../services/handleCursoComision'

export default function AlumnosComisiones() {
  const store = comisionesStore()
  const { alumnos } = useGetAlumnos()
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { updateForm, handleUpdateFieldChangeManual } = useContext(FormContext)
  const [listaAlumnos, setListaAlumnos] = useState({})

  useEffect(() => {
    if (updateForm._id) {
      setListaAlumnos(updateForm.alumnos)
    }
  }, [updateForm._id])

  if (formVisibility !== 'alumnos') return <></>

  return (
    <>
      <button onClick={() => toggleFormVisibility({ formName: 'alumnos' })}>x</button>
      <h2>{updateForm.numero}</h2>
      <h3>Año: {updateForm.year}</h3>
      <label>Alumnos</label>
      {updateForm.alumnos.length > 0 &&
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
            {listaAlumnos.length > 0 &&
              <>
                {
                  listaAlumnos.map((alumno) => {
                    return (
                      <tr>
                        <td>{alumno.nombre}</td>
                        <td>{alumno.apellido}</td>
                        <td>{alumno.edad}</td>
                        <td>{alumno.dni}</td>
                      </tr>
                    )
                  })
                }
              </>
            }
          </tbody>
        </table>
      }
      {/* <select onChange={(e) => handleUpdateFieldChangeManual({ name: 'alumnos', value: handleAlumnosComision({ e, alumnos: updateForm.alumnos }) })} name="alumnoSeleccionado" >
        <option value=''> </option>
        {alumnos.map((alumno) => (
          <option key={alumno._id} value={alumno._id}>
            {alumno.nombre} {alumno.apellido}
          </option>
        ))}
      </select> */}
      <button onClick={store.agregarAlumno}>Agregar</button><br />
    </>
  )
}

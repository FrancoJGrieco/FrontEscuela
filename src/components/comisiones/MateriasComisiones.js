import Materia from '../materias/Materia'
import { useGetCursos } from '../../hooks/cursos/useGetCursos'
import { Button } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { FormContext } from '../../hooks/global/forms'
import { handleCursoComision } from '../../services/handleCursoComision'
import { updateData } from '../../services/updateData'

export default function MateriasComisiones() {
  const { cursos } = useGetCursos()
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { updateForm, handleUpdateFieldChangeManual } = useContext(FormContext)
  const [materias, setMaterias] = useState({})

  useEffect(() => {
    if (updateForm._id) {
      setMaterias(updateForm.materias)
    }
  }, [updateForm._id])

  if (formVisibility !== 'materias') return <></>
  return (
    <>
      <Button onClick={() => toggleFormVisibility({ formName: 'materias' })}>x</Button>
      <h2>{updateForm.numero}</h2>
      <h3>Año: {updateForm.year}</h3>
      <label>Materias</label>
      <table>
        <thead>
          <tr>
            <th>Nombre</th>
            <th>Descripción</th>
            <th>Año</th>
          </tr>
        </thead>
        <tbody>
          {materias.length > 0 &&
            materias.map((materia) => {
              return (
                <tr>
                  <Materia key={materia._id} materia={materia} />
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <label>Agregar curso</label>
      <select onChange={(e) => handleUpdateFieldChangeManual({ name: 'materias', value: handleCursoComision({ e, year: updateForm.year }) })} name="curso" >
        <option value=""> </option>
        {cursos && <>
          {cursos.map((curso) => (
            <option key={curso._id} value={JSON.stringify(curso.materias)}>
              {curso.titulatura}
            </option>
          ))
          }
        </>
        }
      </select>
      <button onClick={(e) => updateData({ e, type: 'comisiones', _id: updateForm._id, data: updateForm})}>Agregar</button><br />
    </>
  )
}

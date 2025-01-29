/* eslint-disable react-hooks/exhaustive-deps */
import comisionesStore from '../../stores/comisionesStore'
import ModalWindow from '../general/ModalWindow'
import { useGetCursos } from '../../hooks/cursos/useGetCursos'
import { useContext } from 'react'
import { Button } from '@mui/material'
import { FormContext } from '../../hooks/global/forms'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { handleCursoComision } from '../../hooks/comisiones/handleCursoComision'
import { createData } from '../../services/createData'

export default function CreateForm() {
  const { cursos } = useGetCursos()
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { createForm, handleCreateFieldChange, handleCreateFieldChangeManual } = useContext(FormContext)

  if (formVisibility !== 'create') return <></>

  return (
    <>
      <ModalWindow>
        {console.log(formVisibility)}
        <Button onClick={() => toggleFormVisibility('create')}>x</Button>
        <h2>Crear Comision</h2>
        <form onSubmit={(e) => createData({e, type: 'comisiones', data: createForm})} >
          <label>Numero de comisión</label>
          <input onChange={(e) => handleCreateFieldChange({ e })} value={createForm.numero} name="numero" />
          <label>Año de comisión</label>
          <input onChange={(e) => handleCreateFieldChange({ e })} value={createForm.year} name="year" />
          {createForm.year && <>
            <label>Agregar curso</label>
            <select onChange={(e) => handleCreateFieldChangeManual({ name: 'materias', value: handleCursoComision({ e, year: createForm.year })})} name="curso" >
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
        </>
          }
        <button type="submit">Crear</button>
      </form>
    </ModalWindow >
    </>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import comisionesStore from '../../stores/comisionesStore'
import ModalWindow from '../general/ModalWindow'
import { useGetCursos } from '../../hooks/cursos/useGetCursos'
import { CreateFormVisibilityContext } from '../../hooks/visibilidad/filtroCreate'
import { useContext } from 'react'
import { Button } from '@mui/material'
import { ComisionFormContext } from '../../hooks/comisiones/updateForm'

export default function CreateForm() {
  const store = comisionesStore((store) => {
    return {
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createComision: store.createComision,
      handleCursoSeleccionado: store.handleCursoSeleccionado,
      cursoSeleccionado: store.cursoSeleccionado
    }
  })
  const { cursos } = useGetCursos()
  const { createFormVisibility, toggleCreateFormVisibility } = useContext(CreateFormVisibilityContext)
  const { createForm } = useContext(ComisionFormContext)
  if (!createFormVisibility.crearComision) return <></>
  return (
    <>
      <ModalWindow>
        <Button onClick={() => toggleCreateFormVisibility('crearComision')}>x</Button>
        <h2>Crear Comision</h2>
        <form onSubmit={store.createComision} >
          <label>Numero de comisión</label>
          <input onChange={store.updateCreateFormField} value={createForm.numero} name="numero" />
          <label>Año de comisión</label>
          <input onChange={store.updateCreateFormField} value={createForm.year} name="year" />
          <label>Agregar curso</label>
          <select onChange={store.handleCursoSeleccionado} name="cursoSeleccionado" >
            <option value=""> </option>
            {cursos.map((curso) => (
              <option key={curso._id} value={curso._id}>
                {curso.titulatura}
              </option>
            ))}
          </select>
          <button type="submit">Crear</button>
        </form>
      </ModalWindow>
    </>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import comisionesStore from '../../stores/comisionesStore'
import ModalWindow from '../general/ModalWindow'
import BtnExit from '../general/BtnExit'
import { useGetCursos } from '../../hooks/cursos/useGetCursos'
import { CreateFormVisibilityContext } from '../../hooks/visibilidad/filtroCreate'
import { useContext } from 'react'
import { Button } from '@mui/material'

export default function CreateForm() {
  const store = comisionesStore((store) => {
    return {
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createComision: store.createComision,
      cursos: store.cursos,
      cerrarForm: store.cerrarForm,
      handleCursoSeleccionado: store.handleCursoSeleccionado,
      cursoSeleccionado: store.cursoSeleccionado
    }
  })
  const { cursos } = useGetCursos()
  const { formVisibility, toggleFormVisibility } = useContext(CreateFormVisibilityContext)
  if (!formVisibility.crearComision) return <></>
  return (
    <>
      <ModalWindow>
        <Button onClick={() => toggleFormVisibility('crearComision')}>x</Button>
        <h2>Crear Comision</h2>
        <form onSubmit={store.createComision} >
          <label>Numero de comisión</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.numero} name="numero" />
          <label>Año de comisión</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.year} name="year" />
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

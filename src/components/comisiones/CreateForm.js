/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import comisionesStore from '../../stores/comisionesStore'
import cursosStore from '../../stores/cursosStore'
import ModalWindow from '../general/ModalWindow'

export default function CreateForm () {
  const store = comisionesStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createComision: store.createComision,
      cursos: store.cursos,
      cerrarForm: store.cerrarForm,
      handleCursoSeleccionado: store.handleCursoSeleccionado,
      cursoSeleccionado: store.cursoSeleccionado
    }
  })
  const storeCursos = cursosStore((store) => {
    return {
      fetchCursos: store.fetchCursos,
      cursos: store.cursos
    }
  })

  useEffect(() => {
    storeCursos.fetchCursos()
  }, [])

  if (!store.createFormVisibility) return <></>
  return (
    <>
      <ModalWindow>
        <button onClick={store.cerrarForm}>x</button>
        <h2>Crear Comision</h2>
        <form onSubmit={store.createComision} >
          <label>Numero de comisión</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.numero} name="numero" />
          <label>Año de comisión</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.year} name="year" />
          <label>Agregar curso</label>
          <select onChange={store.handleCursoSeleccionado} name="cursoSeleccionado" >
            <option value=""> </option>
            {storeCursos.cursos.map((curso) => (
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

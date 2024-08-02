import cursosStore from '../../stores/cursosStore'

export default function UpdateForm () {
  const store = cursosStore((store) => {
    return {
      updateForm: store.updateForm,
      updateCurso: store.updateCurso,
      handleUpdateFieldChange: store.handleUpdateFieldChange,
      updateFormVisibility: store.updateFormVisibility,
      cerrarForm: store.cerrarForm
    }
  })

  if (!store.updateFormVisibility) return <></>
  return (
    <div class="formulario">
      <button onClick={store.cerrarForm}>x</button>
      <h2>Modificar Curso</h2>
      <form onSubmit={store.updateCurso}>
        <label>Titulatura</label>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.titulatura} name='titulatura' />
        <label>Año</label>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.years} name='years' />
        <button type='submit'>Modificar</button>
      </form>
    </div>
  )
}

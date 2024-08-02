import cursosStore from '../../stores/cursosStore'

export default function CreateForm () {
  const store = cursosStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createCurso: store.createCurso,
      cerrarForm: store.cerrarForm
    }
  })

  if (!store.createFormVisibility) return <></>
  return (
    <div class="formulario">
      <button onClick={store.cerrarForm}>x</button>
      <h2>Crear Curso</h2>
      <form onSubmit={store.createCurso}>
        <label>Curso</label>
        <input onChange={store.updateCreateFormField} value={store.createForm.titulatura} name="titulatura" />
        <label>Años</label>
        <input onChange={store.updateCreateFormField} value={store.createForm.years} name="years" />
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

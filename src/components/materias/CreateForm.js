import materiasStore from '../../stores/materiasStore'

export default function CreateForm () {
  const store = materiasStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createMateria: store.createMateria
    }
  })

  if (!store.createFormVisibility) return <></>
  return (
    <div>
      <h2>Crear Materia</h2>
      <form onSubmit={store.createMateria}>
        <label>Nombre</label>
        <input onChange={store.updateCreateFormField} value={store.createForm.nombre} name="nombre" />
        <label>Descripción</label>
        <input onChange={store.updateCreateFormField} value={store.createForm.descripcion} name="descripcion" />
        <label>Año</label>
        <input onChange={store.updateCreateFormField} value={store.createForm.year} name="year" />
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

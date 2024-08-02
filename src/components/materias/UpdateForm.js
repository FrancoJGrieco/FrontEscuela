import materiasStore from '../../stores/materiasStore'

export default function UpdateForm () {
  const store = materiasStore((store) => {
    return {
      updateForm: store.updateForm,
      updateMateria: store.updateMateria,
      handleUpdateFieldChange: store.handleUpdateFieldChange

    }
  })

  if (!store.updateForm._id) return <></>
  return (
    <div>
      <h2>Modificar Materia</h2>
      <form onSubmit={store.updateMateria}>
        <label>Nombre</label>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.nombre} name='nombre' />
        <label>Descripción</label>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.descripcion} name='descripcion' />
        <label>Año</label>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.year} name='year' />
        <button type='submit'>Modificar</button>
      </form>
    </div>
  )
}

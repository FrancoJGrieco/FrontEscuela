import alumnosStore from '../../stores/alumnosStore'

export default function UpdateForm () {
  const store = alumnosStore((store) => {
    return {
      updateForm: store.updateForm,
      updateAlumno: store.updateAlumno,
      handleUpdateFieldChange: store.handleUpdateFieldChange

    }
  })

  if (!store.updateForm._id) return <></>
  return (
    <div>
      <h2>Modificar alumno</h2>
      <form onSubmit={store.updateAlumno}>
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.nombre} name='nombre' /><br />
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.apellido} name='apellido' /><br />
        <input onChange={store.handleUpdateFieldChange} value={store.updateForm.edad} name='edad' /><br />
        <button type='submit'>Modificar</button>
      </form>
    </div>
  )
}

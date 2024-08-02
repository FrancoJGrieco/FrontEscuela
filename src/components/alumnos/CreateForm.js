import alumnosStore from '../../stores/alumnosStore'

export default function CreateForm () {
  const store = alumnosStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createAlumno: store.createAlumno
    }
  })

  if (!store.createFormVisibility) return <></>
  return (
    <div>
      <h2>Crear alumno</h2>
      <form onSubmit={store.createAlumno}>
        <input onChange={store.updateCreateFormField} value={store.createForm.nombre} name="nombre" /><br />
        <input onChange={store.updateCreateFormField} value={store.createForm.apellido} name="apellido" /><br />
        <input onChange={store.updateCreateFormField} value={store.createForm.edad} name="edad" /><br />
        <button type="submit">Crear</button>
      </form>
    </div>
  )
}

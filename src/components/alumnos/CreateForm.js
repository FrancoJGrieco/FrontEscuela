import alumnosStore from '../../stores/alumnosStore'
import ModalWindow from '../general/ModalWindow'

export default function CreateForm () {
  const store = alumnosStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createAlumno: store.createAlumno,
      toggleCreate: store.toggleCreate
    }
  })

  if (!store.createFormVisibility) return <></>
  return (
    <>
      <ModalWindow>
        <div className='exit-modal' onClick={() => store.toggleCreate()}><span>X</span></div>
        <h2>Crear alumno</h2>
        <form onSubmit={store.createAlumno} className='form-modal'>
          <label>Nombre</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.nombre} name="nombre" /><br />
          <label>Apellido</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.apellido} name="apellido" /><br />
          <label>Edad</label>
          <input onChange={store.updateCreateFormField} value={store.createForm.edad} name="edad" /><br />
          <button type="submit">Crear</button>
        </form>
      </ModalWindow>
    </>
  )
}

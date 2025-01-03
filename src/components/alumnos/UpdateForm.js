import alumnosStore from '../../stores/alumnosStore'
import ModalWindow from '../general/ModalWindow'

export default function UpdateForm () {
  const store = alumnosStore((store) => {
    return {
      updateForm: store.updateForm,
      updateAlumno: store.updateAlumno,
      handleUpdateFieldChange: store.handleUpdateFieldChange,
      btnClose: store.btnClose,
      updateFormVisibility: store.updateFormVisibility
    }
  })

  if (!store.updateFormVisibility) return <></>
  return (
    <>
      <ModalWindow>
        <div className='exit-modal' onClick={() => store.btnClose()}><span>X</span></div>
        <h2>Modificar alumno</h2>
        <form onSubmit={store.updateAlumno} className='form-modal'>
          <label>Nombre</label>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.nombre} name='nombre' /><br />
          <label>Apellido</label>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.apellido} name='apellido' /><br />
          <label>Edad</label>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.edad} name='edad' /><br />
          <label>DNI</label>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.dni} name='dni' /><br />
          <button type='submit'>Modificar</button>
        </form>
      </ModalWindow>
    </>
  )
}

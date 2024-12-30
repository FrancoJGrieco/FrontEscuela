import alumnosStore from '../../stores/alumnosStore'
import BtnExit from '../general/BtnExit'
import InputLabel from '../general/InputLabel'
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
        <BtnExit funcion={store.toggleCreate}/>
        <h2>Crear alumno</h2>
        <form onSubmit={store.createAlumno} className='form-modal'>
          <InputLabel titulo='Nombre' onChangeFuncion={store.updateCreateFormField} valueForm={store.createForm.nombre} nameForm='nombre'/>
          <InputLabel titulo='Apellido' onChangeFuncion={store.updateCreateFormField} valueForm={store.createForm.apellido} nameForm='apellido'/>
          <InputLabel titulo='Edad' onChangeFuncion={store.updateCreateFormField} valueForm={store.createForm.edad} nameForm='edad'/>
          <InputLabel titulo='DNI' onChangeFuncion={store.updateCreateFormField} valueForm={store.createForm.dni} nameForm='dni'/>
          <button type="submit">Crear</button>
        </form>
      </ModalWindow>
    </>
  )
}

import materiasStore from '../../stores/materiasStore'
import BtnExit from '../general/BtnExit'
import ModalWindow from '../general/ModalWindow'

export default function UpdateForm () {
  const store = materiasStore((store) => {
    return {
      updateForm: store.updateForm,
      updateMateria: store.updateMateria,
      handleUpdateFieldChange: store.handleUpdateFieldChange,
      toggleUpdate: store.toggleUpdate,
      btnClose: store.btnClose

    }
  })

  if (!store.updateForm._id) return <></>
  return (
    <ModalWindow>
      <BtnExit funcion={store.btnClose} />
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
    </ModalWindow>
  )
}

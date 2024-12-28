import comisionesStore from '../../stores/comisionesStore'
import BtnExit from '../general/BtnExit'
import ModalWindow from '../general/ModalWindow'

export default function UpdateForm () {
  const store = comisionesStore((store) => {
    return {
      updateForm: store.updateForm,
      updateComision: store.updateComision,
      handleUpdateFieldChange: store.handleUpdateFieldChange,
      updateFormVisibility: store.updateFormVisibility,
      cerrarForm: store.cerrarForm
    }
  })

  if (!store.updateFormVisibility) return <></>
  return (
    <>
      <ModalWindow>
        <BtnExit funcion={store.cerrarForm} />
        <h2>Modificar Comision</h2>
        <form onSubmit={store.updateComision}>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.numero} name='numero' /><br />
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.year} name='year' /><br />
          <button type='submit'>Modificar</button>
        </form>
      </ModalWindow>
    </>
  )
}

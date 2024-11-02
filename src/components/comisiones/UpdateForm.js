import comisionesStore from '../../stores/comisionesStore'
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
        <h2>Modificar Comision</h2>
        <button onClick={store.cerrarForm}>x</button>
        <form onSubmit={store.updateComision}>
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.numero} name='numero' /><br />
          <input onChange={store.handleUpdateFieldChange} value={store.updateForm.year} name='year' /><br />
          <button type='submit'>Modificar</button>
        </form>
      </ModalWindow>
    </>
  )
}

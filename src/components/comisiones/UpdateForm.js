import { useContext } from 'react'
import ModalWindow from '../general/ModalWindow'
import { FormContext } from '../../hooks/global/forms'
import { updateData } from '../../services/updateData'
import { FormVisibilityContext } from '../../hooks/global/filters'

export default function UpdateForm() {

  const { formVisibility } = useContext(FormVisibilityContext)
  const { updateForm, handleUpdateFieldChange } = useContext(FormContext)

  if (formVisibility !== 'update') return <></>

  return (
    <>
      <ModalWindow>
        <h2>Modificar Comision</h2>
        <form onSubmit={(e) => updateData({ e, type: 'comisiones', _id: updateForm._id, data: updateForm })}>
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.numero} name='numero' /><br />
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.year} name='year' /><br />
          <button type='submit'>Modificar</button>
        </form>
      </ModalWindow>
    </>
  )
}

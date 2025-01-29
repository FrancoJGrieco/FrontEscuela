import { useContext } from 'react'
import { UpdateFormVisibilityContext } from '../../hooks/visibilidad/filtroUpdate'
import ModalWindow from '../general/ModalWindow'
import { ComisionFormContext } from '../../hooks/comisiones/updateForm'
import { updateData } from '../../services/updateData'

export default function UpdateForm() {

  const { updateFormVisibility } = useContext(UpdateFormVisibilityContext)
  const { updateForm, handleUpdateFieldChange } = useContext(ComisionFormContext)

  if (!updateFormVisibility.comisionForm.updateComision) return <></>

  return (
    <>
      <ModalWindow>
        <h2>Modificar Comision</h2>
        <form onSubmit={(e) => updateData({e, type: 'comisiones', _id: updateForm._id, data: updateForm})}>
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.numero} name='numero' /><br />
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.year} name='year' /><br />
          <button type='submit'>Modificar</button>
        </form>
      </ModalWindow>
    </>
  )
}

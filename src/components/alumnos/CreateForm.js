import { useContext } from 'react'
import { FormContext } from '../../hooks/global/forms'
import InputLabel from '../general/InputLabel'
import ModalWindow from '../general/ModalWindow'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { Button } from '@mui/material'
import { createData } from '../../services/createData'

export default function CreateForm() {
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { createForm, handleCreateFieldChange } = useContext(FormContext)

  if (formVisibility !== 'create') return <></>
  return (
    <>
      <ModalWindow>
        <Button onClick={() => toggleFormVisibility({ formName: 'create' })}>x</Button>
        <h2>Crear alumno</h2>
        <form onSubmit={(e) => createData({ e, type: 'alumnos', data: createForm })} className='form-modal'>
          <InputLabel titulo='Nombre' onChangeFuncion={(e) => handleCreateFieldChange({ e })} valueForm={createForm.nombre} nameForm='nombre' />
          <InputLabel titulo='Apellido' onChangeFuncion={(e) => handleCreateFieldChange({ e })} valueForm={createForm.apellido} nameForm='apellido' />
          <InputLabel titulo='Edad' onChangeFuncion={(e) => handleCreateFieldChange({ e })} valueForm={createForm.edad} nameForm='edad' />
          <InputLabel titulo='DNI' onChangeFuncion={(e) => handleCreateFieldChange({ e })} valueForm={createForm.dni} nameForm='dni' />
          <button type="submit">Crear</button>
        </form>
      </ModalWindow>
    </>
  )
}

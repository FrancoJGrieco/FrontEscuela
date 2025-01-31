import { Box, Button, Dialog } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { FormContext } from '../../hooks/global/forms'
import { updateData } from '../../services/updateData'

export default function UpdateForm() {
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { updateForm, handleUpdateFieldChange } = useContext(FormContext)

  if (formVisibility !== 'update') return <></>

  return (
    <Dialog
      open={formVisibility === 'update'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: ((e) => updateData({ e, type: 'alumnos', _id: updateForm._id, data: updateForm })),
          style: { padding: '16px', borderRadius: 10 }
        }
      }}
    >
      <Box>
        <Button onClick={() => toggleFormVisibility({ formName: 'alumnos' })}>x</Button>
        <h2>Modificar alumno</h2>
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.nombre} name='nombre' /><br />
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.apellido} name='apellido' /><br />
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.edad} name='edad' /><br />
          <input onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.dni} name='dni' /><br />
          <button type='submit'>Modificar</button>
      </Box>
    </Dialog>
  )
}

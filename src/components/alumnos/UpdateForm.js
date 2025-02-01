import { Button, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { FormContext } from '../../hooks/global/forms'
import { updateData } from '../../services/updateData'
import CloseIcon from '@mui/icons-material/Close'


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
          sx: ({padding:'20px 40px', borderRadius: 5})
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'alumnos' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Modificar Curso</DialogTitle>
      <FormGroup>
        <TextField name='nombre' label='Nombre' variant='standard' size='small' margin='dense' onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.nombre} />
        <TextField name='apellido' label='Apellido' variant='standard' size='small' margin='dense' onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.apellido} />
        <TextField name='edad' label='Edad' variant='standard' size='small' margin='dense' onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.edad} />
        <TextField name='dni' label='DNI' variant='standard' size='small' margin='dense' onChange={(e) => handleUpdateFieldChange({ e })} value={updateForm.dni} />
        <Button type="submit">Modificar</Button>
      </FormGroup>
    </Dialog>
  )
}

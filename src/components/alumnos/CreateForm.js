import { useContext } from 'react'
import { FormContext } from '../../hooks/global/forms'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { Button, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createData } from '../../services/createData'

export default function CreateForm() {
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { createForm, handleCreateFieldChange } = useContext(FormContext)

  return (
    <Dialog
      open={formVisibility === 'create'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (e) => createData({ e, type: 'alumnos', data: createForm }),
          sx: ({ padding: '20px 40px', borderRadius: 5 })
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'create' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Crear Curso</DialogTitle>
      <FormGroup>
        <TextField name='nombre' label='Nombre' variant='standard' size='small' margin='dense' onChange={(e) => handleCreateFieldChange({ e })} value={createForm.nombre} />
        <TextField name='apellido' label='Apellido' variant='standard' size='small' margin='dense' onChange={(e) => handleCreateFieldChange({ e })} value={createForm.apellido} />
        <TextField name='edad' label='Edad' variant='standard' size='small' margin='dense' onChange={(e) => handleCreateFieldChange({ e })} value={createForm.edad} />
        <TextField name='dni' label='DNI' variant='standard' size='small' margin='dense' onChange={(e) => handleCreateFieldChange({ e })} value={createForm.dni} />
        <Button type="submit">Crear</Button>
      </FormGroup>
    </Dialog>
  )
}

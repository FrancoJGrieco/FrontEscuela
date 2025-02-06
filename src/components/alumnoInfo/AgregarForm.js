import { Button, Container, Dialog, DialogTitle, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { useContext } from 'react'
import { useAgregarNota } from '../../hooks/alumnos/useAgregarNota'
import { ResourcesContext } from '../../hooks/alumnos/resources'

export default function AgregarForm() {
  const medidas = { padding: '16px', borderRadius: 10 }
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { handleNotaFieldChange } = useContext(ResourcesContext)
  const { agregarNota } = useAgregarNota()

  return (
    <Dialog
      open={formVisibility === 'add'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: agregarNota,
          style: medidas
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'add' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Nota</DialogTitle>
      <Container
        sx={{ display: 'flex', flexDirection: 'column', gap: '5px' }}
      >
        <TextField name='nota' label='Nota' variant='standard' size='small' margin='dense' onChange={handleNotaFieldChange} />
        <Button type="submit">Crear</Button>
      </Container>
    </Dialog>
  )
}

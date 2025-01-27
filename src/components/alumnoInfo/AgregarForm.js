import { Button, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import alumnosInfoStore from '../../stores/alumnoInfoStore'
import ModalWindow from '../general/ModalWindow'
import CloseIcon from '@mui/icons-material/Close'

export default function AgregarForm () {
  const store = alumnosInfoStore()
  const medidas = { padding: '16px', borderRadius: 10 }
  return <ModalWindow>
    <Dialog
      open={store.notaFormVisibility}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: store.agregarNota,
          style: medidas
        }
      }}
    >
      <IconButton onClick={store.btnClose} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Nota</DialogTitle>
      <FormGroup>
        <TextField name='nota' label='Nota' variant='standard' size='small' margin='dense' onChange={store.handleNotaFieldChange} />
        <Button type="submit">Crear</Button>
      </FormGroup>
    </Dialog>
  </ModalWindow>
}

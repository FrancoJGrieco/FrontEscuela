import { Button, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import cursosStore from '../../stores/cursosStore'

export default function UpdateForm () {
  const store = cursosStore((store) => {
    return {
      updateForm: store.updateForm,
      updateCurso: store.updateCurso,
      handleUpdateFieldChange: store.handleUpdateFieldChange,
      updateFormVisibility: store.updateFormVisibility,
      cerrarForm: store.cerrarForm
    }
  })

  return (
    <Dialog
      open={store.updateFormVisibility}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: store.updateCurso,
          style: { padding: '16px', borderRadius: 10 }
        }
      }}
    >
      <IconButton onClick={store.cerrarForm} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Modificar Curso</DialogTitle>
      <FormGroup>
        <TextField name='titulatura' label='Titulatura' variant='standard' size='small' margin='dense' onChange={store.handleUpdateFieldChange} value={store.updateForm.titulatura} />
        <TextField name='years' label='Años' variant='standard' size='small' margin='dense' onChange={store.handleUpdateFieldChange} value={store.updateForm.years} />
        <Button type="submit">Modificar</Button>
      </FormGroup>
    </Dialog>
  )
}

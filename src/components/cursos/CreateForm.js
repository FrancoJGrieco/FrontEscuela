import { Button, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import cursosStore from '../../stores/cursosStore'

export default function CreateForm () {
  const store = cursosStore((store) => {
    return {
      createFormVisibility: store.createFormVisibility,
      updateCreateFormField: store.updateCreateFormField,
      createForm: store.createForm,
      createCurso: store.createCurso,
      cerrarForm: store.cerrarForm
    }
  })

  return (
    <Dialog
      open={store.createFormVisibility}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: store.createCurso,
          style: { padding: '16px', borderRadius: 10 }
        }
      }}
    >
      <IconButton onClick={store.cerrarForm} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Crear Curso</DialogTitle>
      <FormGroup>
        <TextField name='titulatura' label='Titulatura' variant='standard' size='small' margin='dense' onChange={store.updateCreateFormField} value={store.createForm.titulatura} />
        <TextField name='years' label='Años' variant='standard' size='small' margin='dense' onChange={store.updateCreateFormField} value={store.createForm.years} />
        <Button type="submit">Crear</Button>
      </FormGroup>
    </Dialog >
  )
}

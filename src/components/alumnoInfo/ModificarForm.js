import { Button, Container, Dialog, FormGroup, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import alumnosInfoStore from '../../stores/alumnoInfoStore'

// falta eliminar la nota

export default function ModificarForm () {
  const store = alumnosInfoStore()
  const medidas = { padding: '16px', borderRadius: 10 }

  return (
    <Dialog
      open={store.updateFormVisibility}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: store.updateNotas,
          style: medidas
        }
      }}
    >
      <IconButton onClick={store.btnClose} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant='h4' component='h5'>{store.materia?.materia.nombre}</Typography>
      <Typography variant='h5' component='h6'>Notas</Typography>
      <FormGroup>
        {store.materia &&
          <>
            {store.notass.map((nota, index) => {
              return <>
                <Container>
                  <TextField name={index} key={index} label={'Nota ' + (index + 1)} value={nota} onChange={store.handleUpdateFieldChange} size='small' margin='dense'></TextField>
                </Container>
              </>
            }
            )}
          </>
        }
        <Button type='submit'> Modificar</Button>
      </FormGroup>
    </Dialog>
  )
}

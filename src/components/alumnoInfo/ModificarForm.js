import { Button, Container, Dialog, FormGroup, IconButton, TextField, Typography } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { ResourcesContext } from '../../hooks/alumnos/resources'
import { useUpdateNotas } from '../../hooks/alumnos/useUpdateNotas'

export default function ModificarForm() {
  const medidas = { padding: '16px', borderRadius: 10 }
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { materia, notas, handleNotasFieldChange } = useContext(ResourcesContext)
  const { updateNotas } = useUpdateNotas()

  return (
    <Dialog
      open={formVisibility === 'update'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: updateNotas,
          style: medidas
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'update' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <Typography variant='h4' component='h5'>{materia?.materia?.nombre}</Typography>
      <Typography variant='h5' component='h6'>Notas</Typography>
      <FormGroup>
        {notas &&
          <>
            {notas?.map((nota, index) => {
              return <>
                <Container>
                  <TextField name={index} key={index} label={'Nota ' + (index + 1)} value={nota} onChange={(e)=> handleNotasFieldChange(e)} size='small' margin='dense'></TextField>
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

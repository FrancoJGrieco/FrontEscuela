import { useContext } from 'react'
import { FormContext } from '../hooks/global/forms'
import { FormVisibilityContext } from '../hooks/global/filters'
import { Button, Container, Dialog, DialogTitle, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { createData } from '../services/createData'

export default function CreateForm(props) {
  const { headCells, children, type } = props
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { createForm, handleCreateFieldChange } = useContext(FormContext)

  return (
    <Dialog
      open={formVisibility === 'create'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (e) => createData({ e, type, data: createForm }),
          sx: ({ padding: '20px 40px', borderRadius: 5 })
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'create' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Crear Curso</DialogTitle>
      {createForm &&
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {headCells.map((cell) =>
            <TextField key={cell.id} name={cell.id} label={cell.label} variant='standard' size='small' margin='dense' onChange={handleCreateFieldChange} value={createForm[cell.id]} />
          )}
          {children}
          <Button type="submit">Crear</Button>
        </Container>
      }

    </Dialog>
  )
}

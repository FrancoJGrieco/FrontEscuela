import { useContext } from 'react'
import { FormContext } from '../hooks/global/forms'
import { FormVisibilityContext } from '../hooks/global/filters'
import { Button, Container, Dialog, DialogTitle, IconButton, TextField } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'
import { useCreateData } from '../hooks/useCreateData'

export default function CreateForm(props) {
  const { headCells, children, typeDB, typeElement, typeCreateForm } = props
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { createForm, handleCreateFieldChange } = useContext(FormContext)
  const { createDB } = useCreateData()

  return (
    <Dialog
      open={formVisibility === 'create'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: (e) => createDB({ e, typeDB, datos: createForm, typeElement, typeCreateForm }),
          sx: ({ padding: '20px 40px', borderRadius: 5 })
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'create' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Crear {typeElement}</DialogTitle>
      {createForm &&
        <Container
          sx={{
            display: 'flex',
            flexDirection: 'column'
          }}
        >
          {headCells.map((cell) =>
            <TextField
              key={cell.id}
              type={cell.type} name={cell.id}
              label={cell.label}
              variant='standard'
              size='small'
              margin='dense'
              onChange={handleCreateFieldChange}
              value={createForm[cell.id]}
              required
              slotProps={{
                inputLabel: { shrink: true }
              }}
            />
          )}
          {children}
          <Button type="submit">Crear</Button>
        </Container>
      }

    </Dialog>
  )
}

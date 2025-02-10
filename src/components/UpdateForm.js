import { Button, Container, Dialog, DialogTitle, FormGroup, IconButton, TextField } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../hooks/global/filters'
import { FormContext } from '../hooks/global/forms'
import CloseIcon from '@mui/icons-material/Close'
import { useUpdateData } from '../hooks/useUpdateData'


export default function UpdateForm(props) {
  const { headCells, children, typeDB, typeElement } = props
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { updateForm, handleUpdateFieldChange } = useContext(FormContext)
  const { updateDB } = useUpdateData()

  if (formVisibility !== 'update') return <></>

  return (
    <Dialog
      open={formVisibility === 'update'}
      slotProps={{
        paper: {
          component: 'form',
          onSubmit: ((e) => updateDB({ e, typeDB: typeDB, _id: updateForm._id, datos: updateForm, typeElement: typeElement })),
          sx: ({ padding: '20px 40px', borderRadius: 5 })
        }
      }}
    >
      <IconButton onClick={() => toggleFormVisibility({ formName: 'update' })} color='primary' edge='start' sx={{ maxWidth: 35, borderRadius: 1, ml: 0 }}>
        <CloseIcon />
      </IconButton>
      <DialogTitle>Modificar Curso</DialogTitle>
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        {headCells.map((cell) =>
          <TextField
            key={cell.id}
            type={cell.type}
            name={cell.id}
            label={cell.label}
            variant='standard'
            size='small'
            margin='dense'
            onChange={handleUpdateFieldChange}
            value={updateForm[cell.id]}
            required
            slotProps={{
              inputLabel: { shrink: true }
            }}
          />
        )}
        {children}
        <Button type="submit">Modificar</Button>
      </Container>
    </Dialog>
  )
}

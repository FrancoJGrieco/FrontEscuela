import { Link } from 'react-router-dom'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton, TableCell, TableRow } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { FormContext } from '../../hooks/global/forms'
import { deleteData } from '../../services/deleteData'

export default function Alumno({ alumno }) {

  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setUpdateForm } = useContext(FormContext)

  return (
    <TableRow>
      <TableCell
        component={Link}
        to={'/alumno/' + alumno._id}
        variant='contained'
        color='primary'
        disableElevation
      >{alumno.nombre}</TableCell>
      <TableCell>{alumno.apellido}</TableCell>
      <TableCell>{alumno.edad}</TableCell>
      <TableCell>{alumno.dni || 'No DNI'}</TableCell>
      <TableCell>
        <IconButton onClick={() => deleteData({ type: 'alumnos', _id: alumno._id })} color='primary'>
          <PersonRemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => {
          toggleFormVisibility({ formName: 'update' })
          setUpdateForm(alumno)
        }} color='primary'>
          <SettingsIcon />
        </IconButton>
      </TableCell>
    </TableRow >
  )
}

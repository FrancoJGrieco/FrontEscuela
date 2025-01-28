import { Link } from 'react-router-dom'
import alumnosStore from '../../stores/alumnosStore'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SettingsIcon from '@mui/icons-material/Settings'
import { IconButton, TableCell, TableRow } from '@mui/material'

export default function Alumno ({ alumno }) {
  const store = alumnosStore(store => {
    return {
      deleteAlumno: store.deleteAlumno,
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <TableRow
      component={Link}
      to={'/alumno/' + alumno._id}
      variant='contained'
      color='primary'
      disableElevation
    >
      <TableCell>{alumno.nombre}</TableCell>
      <TableCell>{alumno.apellido}</TableCell>
      <TableCell>{alumno.edad}</TableCell>
      <TableCell>{alumno.dni || 'No DNI'}</TableCell>
      <TableCell>
        <IconButton onClick={() => store.deleteAlumno()} color='primary'>
          <PersonRemoveIcon />
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={() => store.toggleUpdate(alumno)} color='primary'>
          <SettingsIcon />
        </IconButton>
      </TableCell>
    </TableRow>
  )
}

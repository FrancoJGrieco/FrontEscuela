import { Button, TableCell, TableRow } from '@mui/material'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import cursosStore from '../../stores/cursosStore'

export default function Curso ({ curso }) {
  const store = cursosStore(store => {
    return {
      deleteCurso: store.deleteCurso,
      toggleUpdate: store.toggleUpdate,
      verMaterias: store.verMaterias,
      agregarMaterias: store.agregarMaterias
    }
  })
  return (
    <TableRow key={curso._id}>
      <TableCell>{curso.titulatura}</TableCell>
      <TableCell align='center'>{curso.years}</TableCell>
      <TableCell align='center'><Button onClick={() => store.verMaterias(curso)}>Ver</Button></TableCell>
      <TableCell align='center'><Button onClick={() => store.deleteCurso(curso._id)}><DeleteForeverIcon/></Button></TableCell>
      <TableCell align='center'><Button onClick={() => store.toggleUpdate(curso)}><SettingsIcon/></Button></TableCell>
    </TableRow>
  )
}

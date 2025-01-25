import comisionesStore from '../../stores/comisionesStore'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function Comision ({ comision }) {
  const store = comisionesStore(store => {
    return {
      deleteComision: store.deleteComision,
      toggleUpdate: store.toggleUpdate,
      verMaterias: store.verMaterias,
      verAlumnos: store.verAlumnos
    }
  })
  return (
    <tr>
      <td>{comision.numero}</td>
      <td>{comision.year}</td>
      <td><button onClick={() => store.verAlumnos(comision)}>Agregar</button></td> {/* Al agregar al alumno se crea el boletin */}
      <td><button onClick={() => store.verMaterias(comision)}>Ver</button></td>
      <td><button onClick={() => store.deleteComision(comision._id)}><DeleteForeverIcon/></button></td>
      <td><button onClick={() => store.toggleUpdate(comision)}><SettingsIcon/></button></td>
    </tr>
  )
}

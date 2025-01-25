import materiasStore from '../../stores/materiasStore'
import Materia from './Materia'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'

export default function ListaMateria ({ materia }) {
  const store = materiasStore(store => {
    return {
      deleteMateria: store.deleteMateria,
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <tr>
      <Materia key={materia._id} materia={materia}/>
      <td><button onClick={() => store.deleteMateria(materia._id)}><DeleteForeverIcon/></button></td>
      <td><button onClick={() => store.toggleUpdate(materia)}><SettingsIcon/></button></td>
    </tr>
  )
}

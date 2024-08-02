import materiasStore from '../../stores/materiasStore'
import Materia from './Materia'

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
      <td><button onClick={() => store.deleteMateria(materia._id)}>Eliminar</button></td>
      <td><button onClick={() => store.toggleUpdate(materia)}>Modificar</button></td>
    </tr>
  )
}

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
    <tr key={curso._id}>
      <td>{curso.titulatura}</td>
      <td>{curso.years}</td>
      <td><button onClick={() => store.verMaterias(curso)}>Ver</button></td>
      <td><button onClick={() => store.deleteCurso(curso._id)}>Eliminar</button></td>
      <td><button onClick={() => store.toggleUpdate(curso)}>Modificar</button></td>
    </tr >
  )
}

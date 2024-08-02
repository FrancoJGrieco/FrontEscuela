import alumnosStore from '../../stores/alumnosStore'

export default function Alumno ({ alumno }) {
  const store = alumnosStore(store => {
    return {
      deleteAlumno: store.deleteAlumno,
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <tr>
      <td>{alumno.nombre}</td>
      <td>{alumno.apellido}</td>
      <td>{alumno.edad}</td>
      <td><button>Ver</button></td>
      <td><button onClick={() => store.deleteAlumno(alumno._id)}>Eliminar</button></td>
      <td><button onClick={() => store.toggleUpdate(alumno)}>Modificar</button></td>
    </tr>
  )
}

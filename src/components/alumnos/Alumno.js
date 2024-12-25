import { Link } from 'react-router-dom'
import alumnosStore from '../../stores/alumnosStore'
import CeldaTabla from '../general/CeldaTabla'
import FilaTabla from '../general/FilaTabla'

export default function Alumno ({ alumno }) {
  const store = alumnosStore(store => {
    return {
      deleteAlumno: store.deleteAlumno,
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <>
      <FilaTabla>
        <CeldaTabla>{alumno.nombre}</CeldaTabla>
        <CeldaTabla>{alumno.apellido}</CeldaTabla>
        <CeldaTabla>{alumno.edad}</CeldaTabla>
        <CeldaTabla>
            <Link to={'/alumno/' + alumno._id}>Información</Link>
        </CeldaTabla>
        <CeldaTabla><button onClick={() => store.deleteAlumno(alumno._id)}>Eliminar</button></CeldaTabla>
        <CeldaTabla><button onClick={() => store.toggleUpdate(alumno)}>Modificar</button></CeldaTabla>
      </FilaTabla>
    </>
  )
}

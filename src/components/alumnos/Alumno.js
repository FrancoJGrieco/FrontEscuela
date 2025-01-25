import { Link } from 'react-router-dom'
import alumnosStore from '../../stores/alumnosStore'
import CeldaTabla from '../general/CeldaTabla'
import FilaTabla from '../general/FilaTabla'
import PersonRemoveIcon from '@mui/icons-material/PersonRemove'
import SettingsIcon from '@mui/icons-material/Settings'

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
        <CeldaTabla>{alumno.dni || 'No DNI'}</CeldaTabla>
        <CeldaTabla>
          <Link to={'/alumno/' + alumno._id}>Información</Link>
        </CeldaTabla>
        <CeldaTabla><button onClick={() => store.deleteAlumno(alumno._id)}><PersonRemoveIcon/></button></CeldaTabla>
        <CeldaTabla><button onClick={() => store.toggleUpdate(alumno)}><SettingsIcon/></button></CeldaTabla>
      </FilaTabla>
    </>
  )
}

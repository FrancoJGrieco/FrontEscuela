import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { useContext } from 'react'
import { Button } from '@mui/material'
import { FormContext } from '../../hooks/global/forms'
import { deleteData } from '../../services/deleteData'
import { FormVisibilityContext } from '../../hooks/global/filters'


export default function Comision({ comision }) {

  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setUpdateForm } = useContext(FormContext)

  return (
    <tr>
      <td>{comision.numero}</td>
      <td>{comision.year}</td>
      <td><button onClick={() => toggleFormVisibility({ formName: 'alumnos' })}>Agregar</button></td> {/* Al agregar al alumno se crea el boletin */}
      <td><button onClick={() => toggleFormVisibility({ formName: 'materias' })}>Ver</button></td>


      <td><Button onClick={() => deleteData({ type: 'comisiones', _id: comision._id })}>
        <DeleteForeverIcon />
      </Button></td>

      <td><Button onClick={() => {
        toggleFormVisibility({ formName: 'update' })
        setUpdateForm(comision)
      }}>
        <SettingsIcon />
      </Button></td>
    </tr >
  )
}

import comisionesStore from '../../stores/comisionesStore'
import SettingsIcon from '@mui/icons-material/Settings'
import DeleteForeverIcon from '@mui/icons-material/DeleteForever'
import { UpdateFormVisibilityContext } from '../../hooks/visibilidad/filtroUpdate'
import { useContext } from 'react'
import { Button } from '@mui/material'
import { ComisionFormContext } from '../../hooks/comisiones/updateForm'
import { deleteData } from '../../services/deleteData'


export default function Comision({ comision }) {
  const store = comisionesStore(store => {
    return {
      verMaterias: store.verMaterias,
      verAlumnos: store.verAlumnos
    }
  })
  const { toggleUpdateFormVisibility } = useContext(UpdateFormVisibilityContext)
  const { setUpdateForm } = useContext(ComisionFormContext)

  return (
    <tr>
      <td>{comision.numero}</td>
      <td>{comision.year}</td>
      <td><button onClick={() => store.verAlumnos(comision)}>Agregar</button></td> {/* Al agregar al alumno se crea el boletin */}
      <td><button onClick={() => store.verMaterias(comision)}>Ver</button></td>

      <td><Button onClick={() => deleteData({ type: 'comisiones', _id: comision._id })}>
        <DeleteForeverIcon />
      </Button></td>

      <td><Button onClick={() => {
        toggleUpdateFormVisibility({ name: 'comision', formName: 'updateComision', datos: comision })
        setUpdateForm(comision)
      }}>
        <SettingsIcon />
      </Button></td>
    </tr >
  )
}

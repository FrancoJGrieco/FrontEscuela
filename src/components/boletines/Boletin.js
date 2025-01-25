import boletinesStore from '../../stores/boletinesStore'
import Button from '@mui/material/Button'

export default function ListaMateria ({ boletin }) {
  const store = boletinesStore(store => {
    return {
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <tr>
      <td>{boletin.curso.titulatura}</td>
      <td>{boletin.comision.numero}</td>
      <td>{boletin.year}</td>
      <td>{boletin.alumno.nombre} {boletin.alumno.apellido}</td>
      <td><Button onClick={() => store.toggleUpdate(boletin)}>Ver</Button></td>
    </tr>
  )
}

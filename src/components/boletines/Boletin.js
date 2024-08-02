import boletinesStore from '../../stores/boletinesStore'

export default function ListaMateria ({ boletin }) {
  const store = boletinesStore(store => {
    return {
      toggleUpdate: store.toggleUpdate
    }
  })
  return (
    <tr>
      <td>{boletin.curso}</td>
      <td>{boletin.comision}</td>
      <td>{boletin.year}</td>
      <td>{boletin.alumno.nombre} {boletin.alumno.apellido}</td>
      <td><button onClick={() => store.toggleUpdate(boletin)}>Ver</button></td>
    </tr>
  )
}

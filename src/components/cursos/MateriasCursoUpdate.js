/* eslint-disable react-hooks/exhaustive-deps */
import cursosStore from '../../stores/cursosStore'
import Materia from '../materias/Materia'
import materiasStore from '../../stores/materiasStore'

export default function MateriasCursoUpdate () {
  const store = cursosStore()
  const storeMaterias = materiasStore((store) => {
    return {
      materias: store.materias
    }
  })

  if (!store.materiasVisibility) return <></>
  return (
    <div class="formulario">
      <form onSubmit={store.agregarMateria}>
        <button onClick={store.cerrarForm}>x</button>
        <h2>{store.updateForm.titulatura}</h2>
        <label>Años {store.updateForm.years}</label>
        <label>Materias</label>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {store.updateForm.materias.length > 0 &&
              store.updateForm.materias.map((materia) => {
                return (
                  <tr>
                    <Materia key={materia._id} materia={materia} />
                    <td><button onClick={(e) => store.eliminarMateria(e, materia)}> Eliminar</button></td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>

        <select onChange={store.handleMateriaSeleccionada} name="materiaSeleccionada" >
          <option value=""> </option>
          {storeMaterias.materias.map((materia) => (
            <option key={materia._id} value={materia._id}>
              {materia.nombre}
            </option>
          ))}
        </select>
        <button onClick={store.updateCurso}>Agregar</button><br />
      </form>
      <button type="submit">Listo</button>
    </div>
  )
}

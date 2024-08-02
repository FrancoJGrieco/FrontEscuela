import materiasStore from '../../stores/materiasStore'
import ListaMateria from './ListaMateria'

export default function Materias () {
  const store = materiasStore()
  return (
    <section>
      <header>
        <h2>Tabla de Materias</h2>
      </header>
      <div>
        <button onClick={() => store.toggleCreate()}>Crear</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Año</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {store.materias &&
                store.materias.map((materia) => {
                  return (
                      <ListaMateria key={materia._id} materia={materia} />
                  )
                })
              }
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}

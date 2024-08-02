import cursosStore from '../../stores/cursosStore'
import Curso from './Curso'

export default function Cursos () {
  const store = cursosStore()
  return (
    <section>
      <header>
        <h2>Tabla de Cursos</h2>
      </header>
      <div>
        <button onClick={() => store.toggleCreate()}>Crear</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Titulatura</th>
                <th>Años</th>
                <th>Materias</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {store.cursos &&
                store.cursos.map((curso) => {
                  return (
                    <Curso curso={curso} />
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

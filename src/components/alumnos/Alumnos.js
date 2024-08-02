import alumnosStore from '../../stores/alumnosStore'
import Alumno from './Alumno'

export default function Alumnos () {
  const store = alumnosStore()
  return (
    <section>
      <header>
        <h2>Tabla de Alumnos</h2>
      </header>
      <div>
        <button onClick={() => store.toggleCreate()}>Crear</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Apellido</th>
                <th>Edad</th>
                <th>Boletin</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {store.alumnos &&
                store.alumnos.map((alumno) => {
                  return (
                    <Alumno key={alumno._id} alumno={alumno} />
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

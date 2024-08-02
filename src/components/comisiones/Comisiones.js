import comisionesStore from '../../stores/comisionesStore'
import Comision from './Comision'

export default function Comisiones () {
  const store = comisionesStore()
  return (
    <section>
      <header>
        <h2>Tabla de Comisiones</h2>
      </header>
      <div>
        <button onClick={() => store.toggleCreate()}>Crear</button>
        <div>
          <table>
            <thead>
              <tr>
                <th>Comision</th>
                <th>Año</th>
                <th>Alumno</th>
                <th>Materias</th>
                <th>Eliminar</th>
                <th>Modificar</th>
              </tr>
            </thead>
            <tbody>
              {store.comisiones &&
                store.comisiones.map((comision) => {
                  return (
                    <Comision key={comision._id} comision={comision} />
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

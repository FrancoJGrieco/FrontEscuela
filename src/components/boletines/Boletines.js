import Boletin from './Boletin'
import boletinesStore from '../../stores/boletinesStore'

export default function Boletines () {
  const store = boletinesStore()
  return (
    <section>
      <header>
        <h2>Tabla de Boletines</h2>
      </header>
      <div>
        <div>
          <table>
            <thead>
              <tr>
                <th>Curso</th>
                <th>Comision</th>
                <th>Año</th>
                <th>Alumno</th>
                <th>Ver</th>
              </tr>
            </thead>
            <tbody>
              {store.boletines &&
                store.boletines.map((boletin) => {
                  return (
                      <Boletin key={boletin._id} boletin={boletin} />
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

import { useContext } from 'react'
import { useGetComisiones } from '../../hooks/comisiones/useGetComisiones'
import Comision from './Comision'
import { CreateFormVisibilityContext } from '../../hooks/visibilidad/filtroCreate'

export default function Comisiones() {
  const { comisiones } = useGetComisiones()
  const { toggleFormVisibility } = useContext(CreateFormVisibilityContext)
  return (
    <section>
      <header>
        <h2>Tabla de Comisiones</h2>
      </header>
      <div>
        <button onClick={() => (toggleFormVisibility( 'crearComision'))}>Crear</button>
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
              {comisiones &&
                comisiones.map((comision) => {
                  return (
                    <Comision key={comision._id} comision={comision} />
                  )
                })
              }
            </tbody>

          </table>
        </div>
      </div>
    </section >
  )
}

import { Link } from 'react-router-dom'
import alumnosInfoStore from '../../stores/alumnoInfoStore'

export default function AlumnoInfo () {
  const store = alumnosInfoStore()
  if (!store.alumno) return <>Error al encontrar el alumno</>
  return (
    <main>
      <div className='container-aip'>
        <Link className='btn-atras' to='/alumnos'>Atras</Link>
        {store.alumno &&
          <div>
            <label>Nombre: {store.alumno.nombre}</label>
            <label>Apellido: {store.alumno.apellido}</label>
            <label>Edad: {store.alumno.edad}</label>
            <label>ID Alumno: {store.alumno._id}</label>
          </div>
        }
        {!store.alumno.boletines && <span>No se ha encontrado un boletin</span>}
        {store.alumno.boletines &&
          <div>
            {store.alumno.boletines.length > 0 &&
              store.alumno.boletines.map((boletin) => {
                return <div key={boletin._id}>
                  <label>Comision: {boletin.comision.numero}</label>
                  <table>
                    <thead>
                      <th>Materia</th>
                      <th>Notas</th>
                      <th>Agregar</th>
                      <th>Modificar</th>
                    </thead>
                    <tbody>
                      {boletin.materias.map((materia) => {
                        return <tr>
                          <td>{materia.materia.nombre}</td>
                          <td>{materia.notas && materia.notas.map((nota) => { return <td>{nota}</td> })}</td>
                          <td><input type='button' value='Agregar' onClick={() => store.toggleNota(materia)} /></td>
                          <td><input type='button' value='Modificar' onClick={() => store.toggleUpdate(materia, boletin._id)} /></td>
                        </tr>
                      })
                      }
                    </tbody>
                  </table>
                </div>
              })
            }
          </div>
        }
      </div>
    </main>
  )
}

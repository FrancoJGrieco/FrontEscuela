/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import alumnoInfoStore from '../stores/alumnoInfoStore'
import { Link, useParams } from 'react-router-dom'
import Materia from '../components/materias/Materia'

export default function AlumnoInfoPage () {
  const store = alumnoInfoStore()
  const _id = useParams()

  useEffect(() => {
    store.fetchAlumno(_id._id)
  }, [])

  if (!store.alumno) return <></>
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
        {!store.boletin && <span>No se ha encontrado un boletin</span>}
        {store.boletin &&
          <div>
            <label>Titulatura: {store.boletin.curso}</label>
            <table>
              <thead>
                <tr>
                  <th>Nombre</th>
                  <th>Descripción</th>
                  <th>Año</th>
                  <th>notas</th>
                </tr>
              </thead>
              <tbody>
                {store.boletin.materias.length > 0 &&
                  store.boletin.materias.map((materia) => {
                    return (
                      <tr key={materia._id}>
                        <Materia key={materia.materia._id} materia={materia.materia} />
                        <tr>
                          {
                            materia.notas.map((nota) => {
                              return <td>{nota}</td>
                            })
                          }
                        </tr>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        }
      </div>
    </main>
  )
}

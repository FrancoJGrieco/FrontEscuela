/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import alumnoInfoStore from '../stores/alumnoInfoStore'
import { Link, useParams } from 'react-router-dom'
import ModalWindow from '../components/general/ModalWindow'
import BtnExit from '../components/general/BtnExit'

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
        {!store.alumno.boletines && <span>No se ha encontrado un boletin</span>}
        {store.alumno.boletines &&
          <div>
            {store.alumno.boletines.length > 0 &&
              store.alumno.boletines.map((boletin) => {
                return <div key={boletin._id}>
                  <label>Titulatura: {boletin.curso.titulatura}</label>
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
                          <td><input type='button' value='Modificar' onClick={() => store.toggleUpdate(materia)} /></td>
                        </tr>
                      })
                      }
                    </tbody>
                  </table>
                  {store.notaFormVisibility &&
                    <ModalWindow>
                      <BtnExit funcion={store.btnClose}></BtnExit>
                      <h2>Nota</h2>
                      <input type='number' placeholder='1-10' name='nota' onChange={store.handleNotaFieldChange} />
                      <input type='button' value='Agregar' onClick={() => store.agregarNota()} />
                    </ModalWindow>
                  }
                  {store.updateFormVisibility &&
                    <ModalWindow>
                      <BtnExit funcion={store.btnClose}></BtnExit>
                      <h2>{store.materia.materia.nombre}</h2>
                      <h3>Notas</h3>
                      {store.materia &&
                        <>
                          {store.notass.map((nota, index) => {
                            return <>
                              <input type='number' value={nota} key={index} placeholder='1-10' name={index} onChange={store.handleUpdateFieldChange} />
                            </>
                          }
                          )}
                        </>
                      }
                      <input type='button' value='Agregar' onClick={() => store.updateNotas(store.materia, boletin._id)} />
                    </ModalWindow>
                  }
                </div>
              })
            }
          </div>
        }
      </div>
    </main>
  )
}

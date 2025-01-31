import { useContext, useEffect } from 'react'
import CeldaTituloTabla from '../general/CeldaTituloTabla'
import FilaTituloTabla from '../general/FilaTituloTabla'
import Alumno from './Alumno'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { useInitializeCreateForm } from '../../hooks/alumnos/useInitializeCreateForm'
import { useGetAlumnos } from '../../hooks/alumnos/useGetAlumnos'

export default function Alumnos() {
  const titulos = ['Nombre', 'Apellido', 'Edad', 'DNI', 'Boletin', 'Eliminar', 'Modificar']
  const { alumnos } = useGetAlumnos()
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  useInitializeCreateForm()

  return (
    <section>
      <header>
        <h2>Alumnos</h2>
      </header>
      <div>
        {/* <div className='container-search'>
          <input type='text' placeholder='DNI' onChange={store.updateSearchField} />
          <input type='image' src='/lupa.png' alt='Buscar' onClick={() => store.fetchAlumno()} />
        </div> */}
        <button onClick={() => toggleFormVisibility({ formName: 'create' })}>Crear</button>
        <div>
          <table>
            <thead>
              <FilaTituloTabla>
                {titulos.map((titulo) => {
                  return (
                    <CeldaTituloTabla key={titulo}>{titulo}</CeldaTituloTabla>
                  )
                })}
              </FilaTituloTabla>
            </thead>
            <tbody>
              {alumnos &&
                alumnos.map((alumno) => {
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

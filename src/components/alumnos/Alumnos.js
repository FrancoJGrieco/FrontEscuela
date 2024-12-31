import { useEffect } from 'react'
import alumnosStore from '../../stores/alumnosStore'
import CeldaTituloTabla from '../general/CeldaTituloTabla'
import FilaTituloTabla from '../general/FilaTituloTabla'
import Alumno from './Alumno'

export default function Alumnos () {
  const store = alumnosStore()
  const titulos = ['Nombre', 'Apellido', 'Edad', 'DNI', 'Boletin', 'Eliminar', 'Modificar']

  useEffect(() => {
    if (store.alumnos) {
      store.paginarAlumnos()
    }
  }, [store.maxPagina, store.pagina, store.alumnos])
  return (
    <section>
      <header>
        <h2>Alumnos</h2>
      </header>
      <div>
        <div className='container-search'>
          <input type='text' placeholder='DNI' onChange={store.updateSearchField} />
          <input type='image' src='/lupa.png' alt='Buscar' onClick={() => store.fetchAlumno()} />
        </div>
        <button onClick={() => store.toggleCreate()}>Crear</button>
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
              {store.alumnosFiltrados &&
                store.alumnosFiltrados.map((alumno) => {
                  return (
                    <Alumno key={alumno._id} alumno={alumno} />
                  )
                })
              }
            </tbody>
          </table>
          <div className='container-pages'>
            <input type='button' value='<' onClick={store.previousPage} />
            <label onClick={() => store.toggleGoPage()}>{store.pagina + 1}</label>
            <input type='button' value='>' onClick={store.nextPage} />
          </div>
        </div>
      </div>
    </section>
  )
}

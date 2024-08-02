import { useEffect } from 'react'
import Cursos from '../components/cursos/Cursos'
import CreateForm from '../components/cursos/CreateForm'
import UpdateForm from '../components/cursos/UpdateForm'
import MateriasCursoUpdate from '../components/cursos/MateriasCursoUpdate'
import cursosStore from '../stores/cursosStore'

export default function CursosPage () {
  const store = cursosStore()

  useEffect(() => {
    store.fetchCursos()
  }, [])

  return (
    <main>
      <Cursos />
      <UpdateForm />
      <CreateForm />
      <MateriasCursoUpdate />
    </main>
  )
}

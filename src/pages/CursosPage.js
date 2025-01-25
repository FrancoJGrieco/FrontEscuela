import { useEffect } from 'react'
import Cursos from '../components/cursos/Cursos'
import CreateForm from '../components/cursos/CreateForm'
import UpdateForm from '../components/cursos/UpdateForm'
import MateriasCursoUpdate from '../components/cursos/MateriasCursoUpdate'
import cursosStore from '../stores/cursosStore'
import materiasStore from '../stores/materiasStore'

export default function CursosPage () {
  const store = cursosStore()
  const storeMaterias = materiasStore((store) => {
    return {
      fetchMaterias: store.fetchMaterias
    }
  })

  useEffect(() => {
    store.fetchCursos()
    storeMaterias.fetchMaterias()
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

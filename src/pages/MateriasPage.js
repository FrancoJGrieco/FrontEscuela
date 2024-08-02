import { useEffect } from 'react'
import Materias from '../components/materias/Materias'
import CreateForm from '../components/materias/CreateForm'
import UpdateForm from '../components/materias/UpdateForm'
import materiasStore from '../stores/materiasStore'

export default function MateriasPage () {
  const store = materiasStore()

  useEffect(() => {
    store.fetchMaterias()
  }, [])

  return (
    <main>
      <Materias />
      <UpdateForm />
      <CreateForm />
    </main>
  )
}

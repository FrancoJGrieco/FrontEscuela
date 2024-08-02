/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Comisiones from '../components/comisiones/Comisiones'
import CreateForm from '../components/comisiones/CreateForm'
import UpdateForm from '../components/comisiones/UpdateForm'
import comisionesStore from '../stores/comisionesStore'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'

export default function ComisionesPage () {
  const store = comisionesStore()

  useEffect(() => {
    store.fetchComisiones()
  }, [])

  return (
    <main>
      <Comisiones />
      <UpdateForm />
      <CreateForm />
      <AlumnosComisiones />
      <MateriasComisiones />
    </main>
  )
}

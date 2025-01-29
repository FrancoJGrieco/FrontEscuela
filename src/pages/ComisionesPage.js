import { useEffect } from 'react'
import Comisiones from '../components/comisiones/Comisiones'
import CreateForm from '../components/comisiones/CreateForm'
import UpdateForm from '../components/comisiones/UpdateForm'
import comisionesStore from '../stores/comisionesStore'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'
import { CreateFormVisibilityProvider } from '../hooks/visibilidad/filtroCreate'
import { UpdateFormVisibilityProvider } from '../hooks/visibilidad/filtroUpdate'
import { ComisionFormProvider } from '../hooks/comisiones/updateForm'

export default function ComisionesPage() {
  const store = comisionesStore()

  useEffect(() => {
    store.fetchComisiones()
  }, [])

  return (
    <main>
      <UpdateFormVisibilityProvider>
        <CreateFormVisibilityProvider>
          <ComisionFormProvider>
            <Comisiones />
            <CreateForm />
            <UpdateForm />
            <AlumnosComisiones />
            <MateriasComisiones />
          </ComisionFormProvider>
        </CreateFormVisibilityProvider>
      </UpdateFormVisibilityProvider>
    </main>
  )
}

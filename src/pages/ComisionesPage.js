import { useEffect } from 'react'
import Comisiones from '../components/comisiones/Comisiones'
import CreateForm from '../components/comisiones/CreateForm'
import UpdateForm from '../components/comisiones/UpdateForm'
import comisionesStore from '../stores/comisionesStore'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'

export default function ComisionesPage() {
  const store = comisionesStore()

  useEffect(() => {
    store.fetchComisiones()
  }, [])

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <Comisiones />
          <CreateForm />
          <UpdateForm />
          <AlumnosComisiones />
          <MateriasComisiones />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Alumnos from '../components/alumnos/Alumnos'
import CreateForm from '../components/alumnos/CreateForm'
import UpdateForm from '../components/alumnos/UpdateForm'
import alumnosStore from '../stores/alumnosStore'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
// import EnhancedTable from '../components/alumnos/EnhancedTable'

export default function AlumnosPage() {
  const store = alumnosStore()

  useEffect(() => {
    store.fetchAlumnos().then(() => {
      store.iniciarValores()
      store.cargado()
    })
  }, [])

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <Alumnos />
          <UpdateForm />
          <CreateForm />
        </FormProvider>
      </FormVisibilityProvider>
      {/* {store.cargadoValor &&
        <EnhancedTable />
      } */}
    </main>
  )
}

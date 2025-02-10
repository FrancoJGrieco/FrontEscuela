/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import AgregarForm from '../components/alumnoInfo/AgregarForm'
import ModificarForm from '../components/alumnoInfo/ModificarForm'
import ComisionInfo from '../components/comisionInfo/ComisionInfo'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { ResourcesProvider } from '../hooks/alumnos/resources'

export default function ComisionInfoPage() {

  const location = useLocation()
  const comision = location.state.element

  return (
      <FormVisibilityProvider>
        <FormProvider>
          <ResourcesProvider>
            <ComisionInfo
              comision={comision}
            />
            <ModificarForm />
            <AgregarForm />
          </ResourcesProvider>
        </FormProvider>
      </FormVisibilityProvider>
  )
}

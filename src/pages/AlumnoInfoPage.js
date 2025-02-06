/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import AgregarForm from '../components/alumnoInfo/AgregarForm'
import ModificarForm from '../components/alumnoInfo/ModificarForm'
import AlumnoInfo from '../components/alumnoInfo/AlumnoInfo'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { ResourcesProvider } from '../hooks/alumnos/resources'

export default function AlumnoInfoPage() {

  const location = useLocation()
  const alumno = location.state.element

  return (
    <FormVisibilityProvider>
      <FormProvider>
        <ResourcesProvider>
          <AlumnoInfo
            alumno={alumno}
          />
          <ModificarForm />
          <AgregarForm />
        </ResourcesProvider>
      </FormProvider>
    </FormVisibilityProvider>
  )
}

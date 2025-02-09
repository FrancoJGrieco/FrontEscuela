/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import AgregarForm from '../components/alumnoInfo/AgregarForm'
import ModificarForm from '../components/alumnoInfo/ModificarForm'
import AlumnoInfo from '../components/alumnoInfo/AlumnoInfo'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { ResourcesProvider } from '../hooks/alumnos/resources'
import { Container } from '@mui/material'

export default function AlumnoInfoPage() {

  const location = useLocation()
  const alumno = location.state.element

  return (
    <Container type='main'>
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
    </Container>
  )
}

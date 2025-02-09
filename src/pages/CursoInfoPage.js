/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import AgregarForm from '../components/alumnoInfo/AgregarForm'
import ModificarForm from '../components/alumnoInfo/ModificarForm'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { ResourcesProvider } from '../hooks/alumnos/resources'
import CursoInfo from '../components/cursoInfo/CursoInfo'
import { Container } from '@mui/material'

export default function ComisionInfoPage() {

  const location = useLocation()
  const curso = location.state.element

  return (
    <Container type='main'>
      <FormVisibilityProvider>
        <FormProvider>
          <ResourcesProvider>
            <CursoInfo
              curso={curso}
            />
            <ModificarForm />
            <AgregarForm />
          </ResourcesProvider>
        </FormProvider>
      </FormVisibilityProvider>
    </Container>
  )
}

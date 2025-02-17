/* eslint-disable react-hooks/exhaustive-deps */
import { useLocation } from 'react-router-dom'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { ResourcesProvider } from '../hooks/alumnos/resources'
import MateriaInfo from '../components/materiaInfo/MateriaInfo'

export default function MateriaInfoPage() {

  const location = useLocation()
  const materia = location.state.element

  return (
    <FormVisibilityProvider>
      <FormProvider>
        <ResourcesProvider>
          <MateriaInfo 
            materia={materia}
          />
        </ResourcesProvider>
      </FormProvider>
    </FormVisibilityProvider>
  )
}

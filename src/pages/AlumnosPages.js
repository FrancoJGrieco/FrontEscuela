import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/UpdateForm'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/alumnos/headCells'
import { alumnoCreateForm } from '../services/alumnos/alumnoCreateForm'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'

export default function AlumnosPage() {

  const { data } = useContext(DataContext)

  return (
      <FormVisibilityProvider>
        <FormProvider>
          <UpdateForm
            headCells={headCells}
            type='alumnos'
          >
          </UpdateForm>
          <CreateForm
            headCells={headCells}
            type='alumnos'
          >
          </CreateForm>
          <EnhancedTable
            data={data.alumnos}
            labelSearch='DNI'
            headCells={headCells}
            tableName='Alumnos'
            type='alumnos'
            typeFilter='dni'
            typeCreateForm={alumnoCreateForm}
            nameOrderBy='nombre'
            keys={['dni', 'nombre', 'apellido', 'nacimiento', 'mail']}
          />
        </FormProvider>
      </FormVisibilityProvider>
  )
}

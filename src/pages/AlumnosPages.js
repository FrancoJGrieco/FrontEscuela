import CreateForm from '../components/alumnos/CreateForm'
import UpdateForm from '../components/alumnos/UpdateForm'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/EnhancedTable'
import { headCells } from '../services/alumnos/headCells'

export default function AlumnosPage() {
  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <UpdateForm />
          <CreateForm />
          <EnhancedTable
            labelSearch='DNI'
            headCells={headCells}
            tableName='Alumnos'
            type='alumnos'
            typeFilter='dni'
            nameOrderBy='nombre'
            keys={['nombre', 'apellido', 'edad', 'dni']}
          />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

import CreateForm from '../components/materias/CreateForm'
import UpdateForm from '../components/materias/UpdateForm'
import EnhancedTable from '../components/EnhancedTable'
import { headCells } from '../services/materias/headCells'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'

export default function MateriasPage() {
  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <EnhancedTable
            labelSearch='Nombre'
            headCells={headCells}
            tableName='Materias'
            type='materias'
            typeFilter='nombre'
            nameOrderBy='nombre'
            keys={['nombre', 'descripcion', 'year']}
          />
          <UpdateForm />
          <CreateForm />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

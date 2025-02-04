import CreateForm from '../components/materias/CreateForm'
import UpdateForm from '../components/materias/UpdateForm'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/materias/headCells'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'

export default function MateriasPage() {

  const { materias } = useContext(DataContext)

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <EnhancedTable
            data={materias}
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

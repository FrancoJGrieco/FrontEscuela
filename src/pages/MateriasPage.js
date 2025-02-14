import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/UpdateForm'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/materias/headCells'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { materiasCreateForm } from '../services/materias/materiasCreateForm'

export default function MateriasPage() {

  const { data } = useContext(DataContext)

  return (
    <FormVisibilityProvider>
      <FormProvider>
        <EnhancedTable
          data={data.materias}
          labelSearch='Nombre'
          headCells={headCells}
          tableName='Materias'
          type='materias'
          typeFilter='nombre'
          typeCreateForm={materiasCreateForm}
          nameOrderBy='nombre'
          keys={['nombre', 'descripcion', 'year']}
        />
        <UpdateForm
          headCells={headCells}
          typeDB='materias'
          typeElement='materia'
        />
        <CreateForm
          headCells={headCells}
          typeDB='materias'
          typeElement='materia'
        />
      </FormProvider>
    </FormVisibilityProvider>
  )
}

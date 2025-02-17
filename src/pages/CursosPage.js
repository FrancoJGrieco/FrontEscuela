import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/UpdateForm'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/cursos/headCells'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { cursoCreateForm } from '../services/cursos/cursoCreateForm'

export default function CursosPage() {
  const { data } = useContext(DataContext)

  return (
    <FormVisibilityProvider>
      <FormProvider>
        <EnhancedTable
          data={data.cursos}
          labelSearch='Titulatura'
          headCells={headCells}
          tableName='Cursos'
          type='cursos'
          typeFilter='titulatura'
          typeCreateForm={cursoCreateForm}
          nameOrderBy='titulatura'
          keys={['titulatura', 'years']}
        />
        <UpdateForm
          headCells={headCells}
          typeCreateForm={cursoCreateForm}
          typeDB='cursos'
          typeElement='curso'
        />
        <CreateForm
          headCells={headCells}
          typeDB='cursos'
          typeElement='curso'
        />
      </FormProvider>
    </FormVisibilityProvider>
  )
}

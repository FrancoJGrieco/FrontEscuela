import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/alumnos/UpdateForm'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/alumnos/headCells'
import { alumnoCreateForm } from '../services/alumnos/alumnoCreateForm'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'

export default function AlumnosPage() {

  const { alumnos } = useContext(DataContext)
  
  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <UpdateForm />
          <CreateForm
            headCells={headCells}
            type='alumnos'
          />
          <EnhancedTable
            data={alumnos}
            labelSearch='DNI'
            headCells={headCells}
            tableName='Alumnos'
            type='alumnos'
            typeFilter='dni'
            typeCreateForm={alumnoCreateForm}
            nameOrderBy='nombre'
            keys={['nombre', 'apellido', 'edad', 'dni']}
          />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

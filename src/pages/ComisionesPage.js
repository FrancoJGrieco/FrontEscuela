import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/UpdateForm'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'
import { FormContext, FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import EnhancedTable from '../components/table/EnhancedTable'
import { comisionCreateForm } from '../services/comision/comisionCreateForm'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { SelectCurso } from '../components/SelectCurso'

const headCells = [
  {
    id: 'numero',
    numeric: false,
    disablePadding: true,
    label: 'Numero'
  },
  {
    id: 'year',
    numeric: false,
    disablePadding: true,
    label: 'Año'
  }
]

export default function ComisionesPage() {

  const { comisiones } = useContext(DataContext)

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <EnhancedTable
            data={comisiones}
            labelSearch='Numero'
            headCells={headCells}
            tableName='Comisiones'
            type='comisiones'
            typeFilter='numero'
            typeCreateForm={comisionCreateForm}
            nameOrderBy='numero'
            keys={['numero', 'year']}
          />

          <CreateForm
            headCells={headCells}
            type='comisiones'
          >
            <SelectCurso
              type='create'
            />
          </CreateForm>
          <UpdateForm
            headCells={headCells}
            type='comisiones'
          >
            <SelectCurso
              type='update'
            />
          </UpdateForm>
          <AlumnosComisiones />
          <MateriasComisiones />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

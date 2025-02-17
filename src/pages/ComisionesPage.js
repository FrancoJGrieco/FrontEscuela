import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/UpdateForm'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import EnhancedTable from '../components/table/EnhancedTable'
import { comisionCreateForm } from '../services/comisiones/comisionCreateForm'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { SelectCurso } from '../components/SelectCurso'
import { headCells } from '../services/comisiones/headCells'



export default function ComisionesPage() {

  const { data } = useContext(DataContext)

  return (
    <FormVisibilityProvider>
      <FormProvider>
        <EnhancedTable
          data={data.comisiones}
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
          typeCreateForm={comisionCreateForm}
          typeDB='comisiones'
          typeElement='comision'
        >
          <SelectCurso
            type='create'
          />
        </CreateForm>
        <UpdateForm
          headCells={headCells}
          typeDB='comisiones'
          typeElement='comision'
        >
          <SelectCurso
            type='update'
          />
        </UpdateForm>
      </FormProvider>
    </FormVisibilityProvider>
  )
}

import CreateForm from '../components/comisiones/CreateForm'
import UpdateForm from '../components/comisiones/UpdateForm'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import EnhancedTable from '../components/EnhancedTable'

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

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          <EnhancedTable
            labelSearch='Numero'
            headCells={headCells}
            tableName='Comisiones'
            type='comisiones'
            typeFilter='numero'
            nameOrderBy='numero'
            keys={['numero', 'year']}
          />
          <CreateForm />
          <UpdateForm />
          <AlumnosComisiones />
          <MateriasComisiones />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

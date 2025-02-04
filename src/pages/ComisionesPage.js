import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/comisiones/UpdateForm'
import MateriasComisiones from '../components/comisiones/MateriasComisiones'
import AlumnosComisiones from '../components/comisiones/AlumnosComisiones'
import { FormProvider } from '../hooks/global/forms'
import { FormVisibilityProvider } from '../hooks/global/filters'
import EnhancedTable from '../components/table/EnhancedTable'
import { comisionCreateForm } from '../services/comision/comisionCreateForm'
import { useGetData } from '../hooks/useGetData'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'

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

          {/* meter en un children las materias */}
          <CreateForm
            headCells={headCells}
          >
            {/* <select onChange={(e) => handleCreateFieldChangeManual({ name: 'materias', value: handleCursoComision({ e, year: createForm.year }) })} name="curso" >
                          <option value=""> </option>
                          {cursos && <>
                            {cursos.map((curso) => (
                              <option key={curso._id} value={JSON.stringify(curso.materias)}>
                                {curso.titulatura}
                              </option>
                            ))
                            }
                          </>
                          }
                        </select> */}
          </CreateForm>
          <UpdateForm />
          <AlumnosComisiones />
          <MateriasComisiones />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

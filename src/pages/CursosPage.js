import CreateForm from '../components/CreateForm'
import UpdateForm from '../components/cursos/UpdateForm'
import MateriasCursoUpdate from '../components/cursos/MateriasCursoUpdate'
import materiasStore from '../stores/materiasStore'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/table/EnhancedTable'
import { headCells } from '../services/cursos/headCells'
import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { cursoCreateForm } from '../services/cursos/cursoCreateForm'

export default function CursosPage() {
  const storeMaterias = materiasStore((store) => {
    return {
      fetchMaterias: store.fetchMaterias
    }
  })

  const { cursos } = useContext(DataContext)


  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          {/* Agregar ver materias */}
          <EnhancedTable
            data={cursos}
            labelSearch='Titulatura'
            headCells={headCells}
            tableName='Cursos'
            type='cursos'
            typeFilter='titulatura'
            typeCreateForm={cursoCreateForm}
            nameOrderBy='titulatura'
            keys={['titulatura', 'years']}
          />
          <UpdateForm />
          <CreateForm
            headCells={headCells}
            type='cursos'
          />
          <MateriasCursoUpdate />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

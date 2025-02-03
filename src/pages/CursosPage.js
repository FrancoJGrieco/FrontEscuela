import CreateForm from '../components/cursos/CreateForm'
import UpdateForm from '../components/cursos/UpdateForm'
import MateriasCursoUpdate from '../components/cursos/MateriasCursoUpdate'
import materiasStore from '../stores/materiasStore'
import { FormVisibilityProvider } from '../hooks/global/filters'
import { FormProvider } from '../hooks/global/forms'
import EnhancedTable from '../components/EnhancedTable'
import { headCells } from '../services/cursos/headCells'

export default function CursosPage() {
  const storeMaterias = materiasStore((store) => {
    return {
      fetchMaterias: store.fetchMaterias
    }
  })

  return (
    <main>
      <FormVisibilityProvider>
        <FormProvider>
          {/* Agregar ver materias */}
          <EnhancedTable
            labelSearch='Titulatura'
            headCells={headCells}
            tableName='Cursos'
            type='cursos'
            typeFilter='titulatura'
            nameOrderBy='titulatura'
            keys={['titulatura', 'years']}
          />
          <UpdateForm />
          <CreateForm />
          <MateriasCursoUpdate />
        </FormProvider>
      </FormVisibilityProvider>
    </main>
  )
}

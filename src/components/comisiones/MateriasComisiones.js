import comisionesStore from '../../stores/comisionesStore'
import Materia from '../materias/Materia'

export default function MateriasComisiones () {
  const store = comisionesStore((store) => {
    return {
      updateForm: store.updateForm,
      materiasVisibility: store.materiasVisibility,
      cerrarForm: store.cerrarForm
    }
  })

  if (!store.materiasVisibility) return <></>
  return (
    <>
      <button onClick={store.cerrarForm}>x</button>
      <h2>{store.updateForm.numero}</h2>
      <h3>Año: {store.updateForm.year}</h3>
        <label>Materias</label>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Año</th>
            </tr>
          </thead>
          <tbody>
            {store.updateForm.materias.length > 0 &&
              store.updateForm.materias.map((materia) => {
                return (
                  <tr>
                    <Materia key={materia._id} materia={materia} />
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </>
  )
}

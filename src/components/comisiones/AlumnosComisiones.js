import comisionesStore from '../../stores/comisionesStore'

export default function AlumnosComisiones () {
  const store = comisionesStore((store) => {
    return {
      updateForm: store.updateForm,
      alumnosVisibility: store.alumnosVisibility,
      cerrarForm: store.cerrarForm
    }
  })

  if (!store.alumnosVisibility) return <></>
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
                  </tr>
                )
              })
            }
          </tbody>
        </table>
    </>
  )
}

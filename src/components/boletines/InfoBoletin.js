import boletinesStore from '../../stores/boletinesStore'
import Materia from '../materias/Materia'

export default function InfoBoletin () {
  const store = boletinesStore((store) => {
    return {
      updateForm: store.updateForm,
      cerrarForm: store.cerrarForm,
      updateFormVisibility: store.updateFormVisibility
    }
  })

  if (!store.updateFormVisibility) return <></>
  return (
    <div>
      <button onClick={store.cerrarForm}>x</button>
      <h2>Modificar Boletín</h2>
      <form onSubmit={store.updateMateria}>
        <h2>Alumno: {store.updateForm.alumno.nombre} {store.updateForm.alumno.apellido}</h2>
        <h3>Curso: {store.updateForm.curso}</h3>
        <h3>Comision: {store.updateForm.comision}</h3>
        <h3>Año: {store.updateForm.year}</h3>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Descripción</th>
              <th>Año</th>
              <th>notas</th>
            </tr>
          </thead>
          <tbody>
            {store.updateForm.materias.length > 0 &&
              store.updateForm.materias.map((materia) => {
                return (
                  <tr key={materia._id}>
                    <Materia key={materia.materia._id} materia={materia.materia} />
                    <tr>
                      {
                        materia.notas.map((nota) => {
                          return <td>{nota}</td>
                        })
                      }
                    </tr>
                  </tr>
                )
              })
            }
          </tbody>
        </table><br />
        <button type='submit'>Modificar</button>
      </form>
    </div>
  )
}

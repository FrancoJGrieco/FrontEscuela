import { useContext } from "react"
import { DataContext } from "./global/data"
import { deleteAllData } from "../services/deleteAllData"
import { dataRevision } from "../services/dataRevision"

export function useDeleteData() {
  const { data, setData } = useContext(DataContext)

  const deleteDB = async ({ typeDB, _ids }) => {

    if (typeDB === 'materias') {
      alert(`Error: No se pueden eliminar materias`)
      return
    }

    if (typeDB === 'comisiones') {
      revisarAlumnos(_ids)
      return
    }

    const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar ${typeDB}?\n Cuando elimine ${typeDB} se eliminaran ses referencias`);

    if (!confirmar) return

    if (typeDB === 'alumnos') {
      deleteAlumnosComision({ _ids })
    }

    const dataDeleted = await deleteAllData({ type: typeDB, _ids: _ids })

    dataRevision(dataDeleted)

    setData((prevState) => ({
      ...prevState,
      [typeDB]: prevState[typeDB].filter((item) => !_ids.includes(item._id)),
    }))

  }

  const deleteAlumnosComision = ({ _ids }) => {
    setData((prevState) => ({
      ...prevState,
      comisiones: prevState.comisiones.map((comision) => ({
        ...comision,
        alumnos: comision.alumnos.filter((alumno) => !_ids.includes(alumno._id))
      }))
    }))
  }

  const revisarAlumnos = async (_ids) => {
    const resComisiones = data.comisiones.filter((comision) => _ids.includes(comision._id))
    const tienenAlumnos = resComisiones.map((comision) => comision.alumnos.length !== 0)
    if (tienenAlumnos) {
      alert(`Error: No se pueden eliminar comisiones con alumnos`)
      return
    }
  }

  return { deleteDB }
}

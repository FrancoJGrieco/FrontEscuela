import { useContext } from "react"
import { DataContext } from "./global/data"
import { deleteAllData } from "../services/deleteAllData"
import { dataRevision } from "../services/dataRevision"

export function useDeleteData() {
  const { setData } = useContext(DataContext)

  const deleteDB = async ({ typeDB, _ids }) => {
    console.log(typeDB, _ids)
    const confirmar = window.confirm(`¿Estás seguro de que quieres eliminar ${typeDB}?\n Cuando elimine ${typeDB} se eliminaran ses referencias`);

    if (!confirmar) return

    const dataDeleted = await deleteAllData({ type: typeDB, _ids: _ids })

    dataRevision(dataDeleted)

    setData((prevState) => ({
      ...prevState,
      [typeDB]: prevState[typeDB].filter((item) => !_ids.includes(item._id)),
    }))

    if (typeDB === 'alumnos') {
      deleteAlumnosComision({ _ids })
    }
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

  return { deleteDB }
}

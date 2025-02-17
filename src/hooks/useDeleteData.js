import { useContext } from "react"
import { DataContext } from "./global/data"
import { deleteAllData } from "../services/deleteAllData"

export function useDeleteData() {
  const { setData } = useContext(DataContext)

  const deleteDB = async ({ typeDB, _ids }) => {
    console.log(typeDB, _ids)
    await deleteAllData({ type: typeDB, _ids: _ids })


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
        alumnos: comision.alumnos.filter((alumno) => !_ids.includes(alumno._id)) // Filtra los alumnos eliminados
      }))
    }))
  }

  return { deleteDB }
}

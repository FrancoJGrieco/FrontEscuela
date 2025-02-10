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

  }
  return { deleteDB }
}

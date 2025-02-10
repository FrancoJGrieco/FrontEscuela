import { useContext } from "react";
import { DataContext } from "./global/data";
import { updateData } from "../services/updateData";
import { FormVisibilityContext } from "./global/filters";

export function useUpdateData() {
  const { setData } = useContext(DataContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const updateDB = async ({ e, typeDB, _id, datos, typeElement }) => {
    const updatedElement = await updateData({ e, typeDB: typeDB, _id: _id, data: datos })
    
    console.log(updatedElement)
    setData((prevState) => ({
      ...prevState,
      [typeDB]: prevState[typeDB].map((item) =>
        item._id === _id ? updatedElement[typeElement] : item
    )
  }))
  toggleFormVisibility({formName: 'update'})
  }
  return { updateDB }
}

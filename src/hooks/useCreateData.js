import { useContext } from "react";
import { DataContext } from "./global/data";
import { FormVisibilityContext } from "./global/filters";
import { createData } from "../services/createData";

export function useCreateData() {
  const { setData } = useContext(DataContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const createDB = async ({ e, typeDB, datos, typeElement }) => {
    console.log(datos)
    const createdElement = await createData({ e, typeDB: typeDB, data: datos })

    console.log(createdElement)
    setData((prevState) => ({
      ...prevState,
      [typeDB]: [...prevState[typeDB], createdElement[typeElement]]
    }))

    toggleFormVisibility({ formName: 'create' })
  }
  return { createDB }
}

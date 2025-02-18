import { createElement, useContext } from "react";
import { DataContext } from "./global/data";
import { FormVisibilityContext } from "./global/filters";
import { createData } from "../services/createData";
import { useInitializeCreateForm } from "./useInitializeCreateForm";
import { dataRevision } from "../services/dataRevision";

export function useCreateData() {
  const { setData } = useContext(DataContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { InitializeForm } = useInitializeCreateForm()

  const createDB = async ({ e, typeDB, datos, typeElement, typeCreateForm }) => {
    const createdElement = await createData({ e, typeDB: typeDB, data: datos })

    dataRevision(createdElement)
    
    setData((prevState) => ({
      ...prevState,
      [typeDB]: [...prevState[typeDB], createdElement[typeElement]]
    }))

    InitializeForm({ typeCreateForm })
    toggleFormVisibility({ formName: 'create' })
  }
  return { createDB }
}

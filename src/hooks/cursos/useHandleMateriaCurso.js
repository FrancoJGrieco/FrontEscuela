import { useContext, useState } from "react";
import { DataContext } from "../global/data";
import { addMateriaCurso } from "../../services/cursos/addMateriaCurso";
import { deleteMateriaCurso } from "../../services/cursos/deleteMateriaCurso";

export function useHandleMateriaCurso({ curso }) {
  const { setData } = useContext(DataContext)
  const [newCurso, setNewCurso] = useState(curso)

  const handleUpdateMateriaCurso = async ({ curso, _id }) => {
    const res = await addMateriaCurso({ curso, _id })
    
    setData((prevState) => ({
      ...prevState,
      cursos: prevState.cursos.map((item) =>
        item._id === curso._id ? res : item
      )
    }))

    setNewCurso(res)
  }

  const handleDeleteMateriaCurso = async ( element, contenedor ) => {
    const res = await deleteMateriaCurso(element, contenedor)

    setNewCurso(res)
  }

  return { newCurso, handleUpdateMateriaCurso, handleDeleteMateriaCurso }
}
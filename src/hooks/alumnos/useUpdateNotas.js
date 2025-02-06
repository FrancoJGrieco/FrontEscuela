import axios from "axios"
import { useContext } from "react"
import { ResourcesContext } from "./resources"
import { FormVisibilityContext } from "../global/filters"

export function useUpdateNotas() {
  const { materia, setMateria, notas } = useContext(ResourcesContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const updateNotas = async (e) => {
    e.preventDefault()

    console.log(notas)
    const res = await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    setMateria(res.data.materiaBoletin)
    toggleFormVisibility({ formName: 'update' })
  }

  return { updateNotas }
}
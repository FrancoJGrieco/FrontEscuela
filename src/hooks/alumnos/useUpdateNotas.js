import axios from "axios"
import { useContext } from "react"
import { ResourcesContext } from "./resources"
import { FormVisibilityContext } from "../global/filters"

export function useUpdateNotas() {
  const { materia, notas } = useContext(ResourcesContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const updateNotas = async (e) => {
    e.preventDefault()

    await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    materia.notas = notas
    toggleFormVisibility({ formName: 'update' })
  }

  return { updateNotas }
}
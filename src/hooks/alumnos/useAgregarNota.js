import axios from "axios"
import { useContext } from "react"
import { ResourcesContext } from "./resources"
import { FormVisibilityContext } from "../global/filters"

export function useAgregarNota() {
  const { materia, nota } = useContext(ResourcesContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const agregarNota = async (e) => {
    e.preventDefault()
    materia.notas.push(nota)
    const notas = materia.notas

    await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    toggleFormVisibility({ formName: 'add' })
  }

  return { agregarNota }
}
import axios from "axios"
import { useContext } from "react"
import { ResourcesContext } from "./resources"
import { FormVisibilityContext } from "../global/filters"

export function useAgregarNota() {
  const { materia, nota } = useContext(ResourcesContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const agregarNota = async (e) => {
    e.preventDefault()

    if (materia.notas.length >= 3) {
      alert('La cantidad maxima de notas es 3.')
      toggleFormVisibility({ formName: 'add' })
      return
    }

    if (nota > 10 || nota < 1) {
      alert('Ingrese una nota entre 1 - 10.')
      toggleFormVisibility({ formName: 'add' })
      return
    }
    materia.notas.push(nota)
    const notas = materia.notas

    const resMateria = await axios.put('http://localhost:3030/materias_boletin/' + materia._id, { notas })

    materia.promedio = resMateria.data.materiaBoletin.promedio

    toggleFormVisibility({ formName: 'add' })
  }

  return { agregarNota }
}
import axios from "axios"
import { useContext } from "react"
import { ResourcesContext } from "./resources"
import { FormVisibilityContext } from "../global/filters"

export function useUpdateNotas() {
  const { materia, notas } = useContext(ResourcesContext)
  const { toggleFormVisibility } = useContext(FormVisibilityContext)

  const updateNotas = async (e) => {
    e.preventDefault()

    const mayorDiez = notas.filter((nota) => (parseInt(nota) > 10)).length
    const menorUno = notas.filter((nota) => (parseInt(nota) < 1)).length
    if (mayorDiez > 0 || menorUno > 0) {
      alert('Ingrese una nota entre 1 - 10.')
      toggleFormVisibility({ formName: 'update' })
      return
    }

    const res = await axios.put(process.env.REACT_APP_API_URL + '/materias_boletin/' + materia._id, { notas })

    materia.notas = res.data.materiaBoletin.notas
    materia.promedio = res.data.materiaBoletin.promedio

    toggleFormVisibility({ formName: 'update' })
  }

  return { updateNotas }
}
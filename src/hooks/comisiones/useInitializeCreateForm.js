import { useContext, useEffect } from "react"
import { FormContext } from "../global/forms"

export function useInitializeCreateForm() {
  const { setCreateForm } = useContext(FormContext)
  useEffect(() => {
    setCreateForm({
      numero: '',
      year: null,
      alumnos: [],
      materias: []
    })
  }, [])
}
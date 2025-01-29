import { useContext, useEffect } from "react"
import { ComisionFormContext } from "./updateForm"

export function useInitializeCreateForm() {
  const { setCreateForm } = useContext(ComisionFormContext)
  useEffect(() => {
    setCreateForm({
      numero: '',
      year: '',
      alumnos: [],
      materias: []
    })
  }, [])
}
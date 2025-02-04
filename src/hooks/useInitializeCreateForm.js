import { useContext, useEffect } from "react"
import { FormContext } from "./global/forms"

export function useInitializeCreateForm(typeCreateForm) {
  const { setCreateForm } = useContext(FormContext)
  useEffect(() => {
    setCreateForm(typeCreateForm)
  }, [])
}
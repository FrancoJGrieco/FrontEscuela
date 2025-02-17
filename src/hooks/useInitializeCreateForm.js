import { useContext } from "react"
import { FormContext } from "./global/forms"

export function useInitializeCreateForm() {
  const { setCreateForm } = useContext(FormContext)

  const InitializeForm = ({ typeCreateForm }) => {
    setCreateForm(typeCreateForm)
  }

  return { InitializeForm }
}
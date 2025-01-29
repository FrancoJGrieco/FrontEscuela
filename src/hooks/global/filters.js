import { createContext, useState } from 'react'

export const FormVisibilityContext = createContext()

export function FormVisibilityProvider({ children }) {
  const [formVisibility, setFormVisibility] = useState(null)

  const toggleFormVisibility = ({ formName }) => {
    setFormVisibility((prevState) => (prevState === formName ? null : formName))
  }

  return (
    <FormVisibilityContext.Provider value={{
      formVisibility,
      toggleFormVisibility,
    }}>
      {children}
    </FormVisibilityContext.Provider>
  )
}

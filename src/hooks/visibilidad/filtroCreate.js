import { createContext, useState } from 'react'

export const CreateFormVisibilityContext = createContext()

export function CreateFormVisibilityProvider({ children }) {
  const [formVisibility, setFormVisibility] = useState({
    crearAlumno: false,
    crearComision: false,
    crearMateria: false,
    crearCurso: false
  })

  const toggleFormVisibility = (formName) => {
    setFormVisibility((prevState) => ({
      ...prevState,
      [formName]: !prevState[formName]
    }))
  }

  return (
    <CreateFormVisibilityContext.Provider value={{
      formVisibility,
      toggleFormVisibility
    }}>
      {children}
    </CreateFormVisibilityContext.Provider>
  )
}

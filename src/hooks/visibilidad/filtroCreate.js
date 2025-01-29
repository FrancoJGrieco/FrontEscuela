import { createContext, useState } from 'react'

export const CreateFormVisibilityContext = createContext()

export function CreateFormVisibilityProvider({ children }) {
  const [createFormVisibility, setCreateFormVisibility] = useState({
    crearAlumno: false,
    crearComision: false,
    crearMateria: false,
    crearCurso: false
  })

  const toggleCreateFormVisibility = (formName) => {
    setCreateFormVisibility((prevState) => ({
      ...prevState,
      [formName]: !prevState[formName]
    }))
  }

  return (
    <CreateFormVisibilityContext.Provider value={{
      createFormVisibility,
      toggleCreateFormVisibility
    }}>
      {children}
    </CreateFormVisibilityContext.Provider>
  )
}

import { createContext, useState } from 'react'

export const UpdateFormVisibilityContext = createContext()

export function UpdateFormVisibilityProvider({ children }) {
  const [updateFormVisibility, setUpdateFormVisibility] = useState({
    alumnoForm: {
      updateAlumno: false,
      alumno: null
    },
    comisionForm: {
      updateComision: false,
      comision: null
    },
    materiaForm: {
      updateMateria: false,
      materia: null
    },
    cursoForm: {
      updateCurso: false,
      curso: null
    },
  })

  const toggleUpdateFormVisibility = ({ name, formName, datos }) => {
    setUpdateFormVisibility((prevState) => ({
      ...prevState,
      [`${name}Form`]: {
        ...prevState[`${name}Form`],
        [formName]: !prevState[`${name}Form`][formName],
        [name]: datos
      }
    }))
  }

  return (
    <UpdateFormVisibilityContext.Provider value={{
      updateFormVisibility,
      toggleUpdateFormVisibility
    }}>
      {children}
    </UpdateFormVisibilityContext.Provider>
  )
}

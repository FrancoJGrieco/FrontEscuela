import { createContext, useState } from "react";

export const ResourcesContext = createContext()

export function ResourcesProvider({ children }) {

  const [materia, setMateria] = useState({})
  const [nota, setNota] = useState('')

  const handleNotaFieldChange = (e) => {
    setNota(e.target.value)
    console.log(e.target.value)
  }

  return (
    <ResourcesContext.Provider value={{
      materia,
      setMateria,
      nota,
      setNota,
      handleNotaFieldChange
    }}>
      {children}
    </ResourcesContext.Provider>
  )
}
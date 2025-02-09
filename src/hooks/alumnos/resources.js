import { createContext, useState } from "react";

export const ResourcesContext = createContext()

export function ResourcesProvider({ children }) {

  const [materia, setMateria] = useState({})
  const [nota, setNota] = useState('')
  const [notas, setNotas] = useState([])

  const handleNotaFieldChange = (e) => {
    setNota(e.target.value)
  }
  const handleNotasFieldChange = (e) => {
    const { name, value } = e.target

    const nameInt = parseInt(name, 10)

    setNotas((prevNotas) =>
      prevNotas.map((nota, i) => (i === nameInt ? value : nota)))
  }

  return (
    <ResourcesContext.Provider value={{
      materia,
      setMateria,
      nota,
      setNota,
      handleNotaFieldChange,
      notas,
      setNotas,
      handleNotasFieldChange
    }}>
      {children}
    </ResourcesContext.Provider>
  )
}
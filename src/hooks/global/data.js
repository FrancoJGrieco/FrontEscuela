import { createContext } from "react";
import { useGetData } from "../useGetData";

export const DataContext = createContext()

export function DataProvider({ children }) {

  const alumnos = useGetData({ type: 'alumnos' })
  const materias = useGetData({ type: 'materias' })
  const cursos = useGetData({ type: 'cursos' })
  const comisiones = useGetData({ type: 'comisiones' })

  return (
    <DataContext.Provider value={{
      alumnos,
      materias,
      cursos,
      comisiones
    }}>
      {children}
    </DataContext.Provider>
  )
}
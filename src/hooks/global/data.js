import { createContext, useContext, useEffect, useState } from "react"
import { AuthContext } from "./auth"
import { getData } from "../../services/getData"

export const DataContext = createContext()

export function DataProvider({ children }) {
  const { loggedIn } = useContext(AuthContext)
  const [data, setData] = useState({
    alumnos: [],
    materias: [],
    cursos: [],
    comisiones: [],
  });

  const fetchData = async () => {
    try {
      const [alumnos, materias, cursos, comisiones] = await Promise.all([
        getData({ type: "alumnos" }),
        getData({ type: "materias" }),
        getData({ type: "cursos" }),
        getData({ type: "comisiones" }),
      ])

      setData({ alumnos, materias, cursos, comisiones })
    } catch (error) {
      console.error("Error cargando datos:", error)
    }
  }

  useEffect(() => {
    if (!loggedIn) return

    fetchData()
  }, [loggedIn])

  return (
    <DataContext.Provider value={{
      data,
      setData
    }}>
      {children}
    </DataContext.Provider>
  )
}
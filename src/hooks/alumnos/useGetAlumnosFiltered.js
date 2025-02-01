import { useEffect, useState } from "react"

export function useGetAlumnosFiltered({ alumnos }) {
  const [alumnosFiltered, setAlumnosFiltered] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    if (alumnos)
      setAlumnosFiltered(alumnos.filter((alumno) => alumno.dni === filter))
  }, [filter])

  return { alumnosFiltered, filter, setFilter }
}
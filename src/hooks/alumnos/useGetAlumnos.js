import { useEffect, useState } from 'react'
import getData from '../../services/getData'

export async function useGetAlumnos () {
  const [alumnos, setAlumnos] = useState(null)
  useEffect(() => {
    setAlumnos(getData({ type: 'alumnos' }).alumnos)
  }, [])

  return { alumnos }
}

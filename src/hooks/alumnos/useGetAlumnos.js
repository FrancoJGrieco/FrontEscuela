import { useEffect, useState } from 'react'
import { getData } from '../../services/getData'

export function useGetAlumnos () {
  const [alumnos, setAlumnos] = useState(null)

  useEffect(() => {
    try {
      getData({ type: 'alumnos' }).then((data) => {
        setAlumnos(data.res.alumnos)
      })
    } catch (err) {
      console.log('Error: ', err)
    }
  }, [])

  return { alumnos }
}

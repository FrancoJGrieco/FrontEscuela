import { useEffect, useState } from 'react'
import { getData } from '../../services/getData'

export function useGetCursos () {
  const [cursos, setCursos] = useState(null)

  useEffect(() => {
    try {
      getData({ type: 'cursos' }).then((data) => {
        setCursos(data.res.cursos)
      })
    } catch (err) {
      console.log('Error: ', err)
    }
  }, [])

  return { cursos }
}

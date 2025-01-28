import { useEffect, useState } from 'react'
import { getData } from '../../services/getData'

export function useGetComisiones () {
  const [comisiones, setComisiones] = useState(null)

  useEffect(() => {
    try {
      getData({ type: 'comisiones' }).then((data) => {
        setComisiones(data.res.comisiones)
      })
    } catch (err) {
      console.log('Error: ', err)
    }
  }, [])

  return { comisiones }
}

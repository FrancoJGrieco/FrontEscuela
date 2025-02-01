import { useEffect, useState } from 'react'
import { getData } from '../services/getData'

export function useGetData({ type }) {
  const [entitie, setEntitie] = useState(null)

  useEffect(() => {
    try {
      getData({ type }).then((data) => {
        setEntitie(data.res[type])
      })
    } catch (err) {
      console.log('Error: ', err)
    }
  }, [])

  return entitie
}

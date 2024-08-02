/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react'
import Boletines from '../components/boletines/Boletines'
import boletinesStore from '../stores/boletinesStore'
import InfoBoletin from '../components/boletines/InfoBoletin'

export default function BoletinesPage () {
  const store = boletinesStore()
  useEffect(() => {
    store.fetchBoletines()
  }, [])

  return (
    <main>
      <Boletines />
      <InfoBoletin />
    </main>
  )
}

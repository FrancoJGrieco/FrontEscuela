import { useState } from "react"

export function useBoletines({alumno}) {
  const [boletinSelected, setBoletinSelected] = useState({ _id: '' })

  const handleBoletinChangeField = (e) => {
    const { value } = e.target
    if (value !== '') {
      const boletin = alumno.boletines.find((boletin) => value === boletin._id)
      setBoletinSelected(boletin)
      return
    }

    setBoletinSelected({ _id: '' })
  }

  return {boletinSelected, handleBoletinChangeField}
}
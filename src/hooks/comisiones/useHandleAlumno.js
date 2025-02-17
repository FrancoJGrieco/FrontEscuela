import { useState } from "react"

export function useHandleAlumno() {
  const [alumnoDNI, setAlumnoDNI] = useState('')
  const handleAlumnoChangeField = (e) => {
    const { value } = e.target
    setAlumnoDNI(value)
  }

  return { alumnoDNI, handleAlumnoChangeField }

}
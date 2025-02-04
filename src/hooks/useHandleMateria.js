import { useState } from "react";

export function useHandleMateria(){
  const [materias, setMaterias] = useState('')

  const handleChange = (event) => {
    setMaterias(event.target.value);
  }

  return {materias, handleChange}
}
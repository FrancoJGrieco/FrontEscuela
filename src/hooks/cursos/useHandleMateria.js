import { useState } from "react";

export function useHandleMateria(){
  const [materia, setMateria] = useState('')

  const handleMateriaFieldChange = (event) => {
    setMateria(event.target.value);
  }

  return {materia, handleMateriaFieldChange}
}
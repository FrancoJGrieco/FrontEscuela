import { useContext } from "react"
import { DataContext } from "../hooks/global/data"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { FormContext } from "../hooks/global/forms"

export function SelectCurso() {
  const { cursos } = useContext(DataContext)
  const { createForm, handleCreateFieldChange } = useContext(FormContext)

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-curso-label">Cursos</InputLabel>
      <Select
        id="select-curso"
        labelId="select-curso-label"
        value={createForm.materias}
        label="Cursos"
        name='materias'
        onChange={handleCreateFieldChange}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {cursos?.map((curso) => (
          <MenuItem key={curso._id} value={curso.materias}>
            {curso.titulatura}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
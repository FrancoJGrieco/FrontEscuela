import { useContext } from "react"
import { DataContext } from "../hooks/global/data"
import { FormControl, InputLabel, MenuItem, Select } from "@mui/material"
import { FormContext } from "../hooks/global/forms"

export function SelectCurso(props) {
  const { type } = props
  const { data } = useContext(DataContext)
  const { createForm, updateForm, handleCreateFieldChange, handleUpdateFieldChange } = useContext(FormContext)

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
      <InputLabel id="select-curso-label">Cursos</InputLabel>
      <Select
        id="select-curso"
        labelId="select-curso-label"
        value={type === 'create' ? createForm?.curso || '' : updateForm?.curso || ''}
        label="Cursos"
        name='curso'
        onChange={type === 'create' ? handleCreateFieldChange : handleUpdateFieldChange}
      >
        {data.cursos?.map((curso) => (
          <MenuItem key={curso._id} value={curso._id}>
            {curso.titulatura}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  )
}
import { useContext } from "react"
import { TextField } from "@mui/material"
import { FormContext } from "../hooks/global/forms"

export function SelectDate(props) {
  const { type } = props
  const { createForm, updateForm, handleCreateFieldChange, handleUpdateFieldChange } = useContext(FormContext)

  return (
    <>
      <TextField
        type='Date'
        name='nacimiento'
        label='Fecha de Nacimiento'
        variant='standard'
        size='small'
        margin='dense'
        required
        value={type === 'create' ? createForm.nacimiento : updateForm.nacimiento}
        onChange={type === 'create' ? handleCreateFieldChange : handleUpdateFieldChange}
      />
      {console.log(createForm)}
    </>
    //<TextField key={cell.id} name={cell.id} label={cell.label} variant='standard' size='small' margin='dense' onChange={handleCreateFieldChange} value={createForm[cell.id]} required/>

  )
}
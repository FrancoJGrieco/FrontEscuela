import { createContext, useState } from 'react'

export const FormContext = createContext()

export function FormProvider({ children }) {
  const [updateForm, setUpdateForm] = useState({})

  const [createForm, setCreateForm] = useState({})

  const handleUpdateFieldChange = ({ e }) => {
    const { name, value } = e.target

    console.log(name, value)
    console.log(updateForm)
    setUpdateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleUpdateFieldChangeManual = ({ name, value }) => {
    setUpdateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCreateFieldChange = ({ e }) => {
    const { name, value } = e.target
    console.log(name, value)
    setCreateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }
  const handleCreateFieldChangeManual = ({ name, value }) => {
    setCreateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <FormContext.Provider value={{
      updateForm,
      setUpdateForm,
      createForm,
      setCreateForm,
      handleUpdateFieldChange,
      handleUpdateFieldChangeManual,
      handleCreateFieldChange,
      handleCreateFieldChangeManual
    }}>
      {children}
    </FormContext.Provider>
  )

}
import { createContext, useState } from 'react'

export const ComisionFormContext = createContext()

export function ComisionFormProvider({ children }) {
  const [updateForm, setUpdateForm] = useState({})

  const [createForm, setCreateForm] = useState({})

  const handleUpdateFieldChange = ({ e }) => {
    const { name, value } = e.target

    setUpdateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  const handleCreateFieldChange = ({ e }) => {
    const { name, value } = e.target

    setCreateForm((prevState) => ({
      ...prevState,
      [name]: value
    }))
  }

  return (
    <ComisionFormContext.Provider value={{
      updateForm,
      setUpdateForm,
      createForm,
      setCreateForm,
      handleUpdateFieldChange,
      handleCreateFieldChange
    }}>
      {children}
    </ComisionFormContext.Provider>
  )

}
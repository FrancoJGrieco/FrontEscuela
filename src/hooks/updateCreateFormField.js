import { useState } from 'react'

export function useUpdateCreateFormField ({ e, baseForm }) {
  const [form, setForm] = useState(baseForm)
  const { name, value } = e.target

  setForm((prevState) => ({
    ...prevState,
    [name]: value
  }
  ))

  return { form }
}

// onChange((e) => updateCreateFormField(e, baseForm))

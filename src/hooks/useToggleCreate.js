import { useState } from 'react'

export function useToggleCreate () {
  const [createVisibility, setCreateVisibility] = useState(false)

  return { createVisibility, setCreateVisibility }
}

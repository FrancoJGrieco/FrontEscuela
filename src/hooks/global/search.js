import { useState } from "react";

export function useSearch() {
  const [search, setSearch] = useState('')

  const handleSearchFieldChange = (e) => {
    const { value } = e.target
    setSearch('')
  }

}
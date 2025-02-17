import { useState } from "react"

export function useHandleSelected({ visibleRows }) {
  const [selected, setSelected] = useState([])
  const handleSelectAllClick = (event) => {
    if (event.target.checked) {
      const newSelected = visibleRows.map((n) => n._id)
      setSelected(newSelected)
      return
    }
    setSelected([])
  }

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id)
    let newSelected = []

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id)
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1))
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1))
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      )
    }
    setSelected(newSelected)
  }

  return { selected, setSelected, handleClick, handleSelectAllClick }
}
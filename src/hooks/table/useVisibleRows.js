import { useMemo } from "react"

export function useVisibleRows({ list, filteredList, order, orderBy, page, rowsPerPage, getComparator }) {
  const visibleRows = useMemo(
    () => {
      if (!list || list.length === 0) { return [] }
      if (filteredList.length > 0) {
        return filteredList
      }
      return [...list]
        .sort(getComparator(order, orderBy))
        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)

    }, [list, filteredList, getComparator, order, orderBy, page, rowsPerPage]
  )

  return { visibleRows }
}
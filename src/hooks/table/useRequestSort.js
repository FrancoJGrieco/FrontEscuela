import { useState } from "react"

export function useRequestSort({ defaultOrderBy }) {
  const [order, setOrder] = useState('asc')
  const [orderBy, setOrderBy] = useState(defaultOrderBy)

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc'
    setOrder(isAsc ? 'desc' : 'asc')
    setOrderBy(property)
  }

  return{order, orderBy, handleRequestSort}
}
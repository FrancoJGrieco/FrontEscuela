import { useEffect, useState } from "react"

export function useGetFilteredData({ arrayToFilter, type }) {
  const [filteredData, setFilteredData] = useState([])
  const [filter, setFilter] = useState('')


  useEffect(() => {
    if (arrayToFilter)
      setFilteredData(arrayToFilter.filter((data) => data[type] === filter))
  }, [filter])

  return { filteredData, filter, setFilter }
}
import { useState } from "react"

export function useHandlePages(){
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(5)

    const handleChangePage = (e, newPage) => {
      setPage(newPage)
    }
  
    const handleChangeRowsPerPage = (e) => {
      setRowsPerPage(parseInt(e.target.value, 10))
      setPage(0)
    }

    return{page, rowsPerPage, handleChangePage, handleChangeRowsPerPage}
}
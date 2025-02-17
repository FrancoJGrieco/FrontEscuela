import { useEffect } from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { EnhancedTableHead } from './EnhancedTableHead'
import { getComparator } from '../../services/enhancedTable/getComparator'
import { EnhancedTableToolbar } from './EnhancedTableToolbar'
import { useRequestSort } from '../../hooks/table/useRequestSort'
import { useHandleSelected } from '../../hooks/table/useHandleSelected'
import { useHandlePages } from '../../hooks/table/useHandlePages'
import { useVisibleRows } from '../../hooks/table/useVisibleRows'
import { useGetFilteredData } from '../../hooks/useGetFilteredData'
import Data from '../Data'
import { useInitializeCreateForm } from '../../hooks/useInitializeCreateForm'

export default function EnhancedTable(props) {
  const { type, tableName, typeFilter, nameOrderBy, keys, headCells, labelSearch, typeCreateForm, data } = props
  const { InitializeForm } = useInitializeCreateForm()
  const { filteredData, filter, setFilter } = useGetFilteredData({ arrayToFilter: data, type: typeFilter })
  const { order, orderBy, handleRequestSort } = useRequestSort({ defaultOrderBy: nameOrderBy })
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useHandlePages()
  const { visibleRows } = useVisibleRows({ list: data, filteredList: filteredData, order, orderBy, page, rowsPerPage, getComparator })
  const { selected, handleSelectAllClick, handleClick } = useHandleSelected({ visibleRows: visibleRows })


  useEffect(() => {
    InitializeForm({ typeCreateForm })
  }, [])

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - data.length) : 0

  return (
    <>
      {data &&
        <Box component="main" sx={{ flexGrow: 1, padding: 2 }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar
              labelSearch={labelSearch}
              tableName={tableName}
              numSelected={selected.length}
              selected={selected}
              element={selected ? data.filter((element) => { return element._id === selected[0] })[0] : []}
              setFilter={setFilter}
              filter={filter}
              type={type}
            />
            <TableContainer>
              <Table
                sx={{ minWidth: 750 }}
                aria-labelledby="tableTitle"
                size={'small'}
              >
                <EnhancedTableHead
                  numSelected={selected.length}
                  order={order}
                  orderBy={orderBy}
                  onSelectAllClick={handleSelectAllClick}
                  onRequestSort={handleRequestSort}
                  rowCount={data.length}
                  visibleRows={visibleRows}
                  headCells={headCells}
                />
                <TableBody>
                  {data &&
                    <>
                      {visibleRows.map((x, index) => {
                        const isItemSelected = selected.includes(x._id)
                        const labelId = `enhanced-table-checkbox-${index}`
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, x._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={x._id}
                            selected={isItemSelected}
                            sx={{ cursor: 'pointer' }}
                          >
                            <TableCell padding="checkbox">
                              <Checkbox
                                color="primary"
                                checked={isItemSelected}
                                inputProps={{
                                  'aria-labelledby': labelId
                                }}
                              />
                            </TableCell>
                            <Data data={x} keys={keys} />
                          </TableRow>
                        )
                      })}
                    </>
                  }
                  {emptyRows > 0 && (
                    <TableRow
                      style={{
                        height: 33 * emptyRows
                      }}
                    >
                      <TableCell colSpan={6} />
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={data.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Paper>
        </Box>
      }
    </>
  )
}

import * as React from 'react'
import Box from '@mui/material/Box'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TablePagination from '@mui/material/TablePagination'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import Checkbox from '@mui/material/Checkbox'
import { useGetAlumnos } from '../../hooks/alumnos/useGetAlumnos'
import { useInitializeCreateForm } from '../../hooks/alumnos/useInitializeCreateForm'
import { EnhancedTableHead } from '../table/EnhancedTableHead'
import { getComparator } from '../../services/enhancedTable/getComparator'
import { EnhancedTableToolbar } from '../table/EnhancedTableToolbar'
import { useRequestSort } from '../../hooks/table/useRequestSort'
import { useHandleSelected } from '../../hooks/table/useHandleSelected'
import { useHandlePages } from '../../hooks/table/useHandlePages'
import { useVisibleRows } from '../../hooks/table/useVisibleRows'
import { useGetAlumnosFiltered } from '../../hooks/alumnos/useGetAlumnosFiltered'

const headCells = [
  {
    id: 'nombre',
    numeric: false,
    disablePadding: true,
    label: 'Nombre'
  },
  {
    id: 'apellido',
    numeric: false,
    disablePadding: false,
    label: 'Apellido'
  },
  {
    id: 'edad',
    numeric: true,
    disablePadding: false,
    label: 'Fecha de Nacimiento'
  },
  {
    id: 'dni',
    numeric: true,
    disablePadding: false,
    label: 'DNI'
  }
]

export default function EnhancedTable() {
  const { alumnos } = useGetAlumnos()
  const { alumnosFiltered, filter, setFilter } = useGetAlumnosFiltered({ alumnos })
  const { order, orderBy, handleRequestSort } = useRequestSort({ defaultOrderBy: 'nombres' })
  const { page, rowsPerPage, handleChangePage, handleChangeRowsPerPage } = useHandlePages()
  const { visibleRows } = useVisibleRows({ list: alumnos, filteredList: alumnosFiltered, order, orderBy, page, rowsPerPage, getComparator })
  const { selected, handleSelectAllClick, handleClick } = useHandleSelected({ visibleRows: visibleRows })

  useInitializeCreateForm()

  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - alumnos.length) : 0

  return (
    <>
      {alumnos &&
        <Box sx={{ width: '100%' }}>
          <Paper sx={{ width: '100%', mb: 2 }}>
            <EnhancedTableToolbar numSelected={selected.length} alumnos={selected} alumno={alumnos.filter((alumno) => { return alumno._id === selected[0] })[0]} setFilter={setFilter} filter={filter} />
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
                  rowCount={alumnos.length}
                  visibleRows={visibleRows}
                  headCells={headCells}
                />
                <TableBody>
                  {alumnos &&
                    <>
                      {visibleRows.map((alumno, index) => {
                        const isItemSelected = selected.includes(alumno._id)
                        const labelId = `enhanced-table-checkbox-${index}`
                        return (
                          <TableRow
                            hover
                            onClick={(event) => handleClick(event, alumno._id)}
                            role="checkbox"
                            aria-checked={isItemSelected}
                            tabIndex={-1}
                            key={alumno._id}
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
                            <TableCell
                              component="th"
                              id={labelId}
                              scope="row"
                              padding="none"
                            >
                              {alumno.nombre}
                            </TableCell>
                            <TableCell align="left">{alumno.apellido}</TableCell>
                            <TableCell align="right">{alumno.edad}</TableCell>
                            <TableCell align="right">{alumno.dni}</TableCell>
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
              count={alumnos.length}
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

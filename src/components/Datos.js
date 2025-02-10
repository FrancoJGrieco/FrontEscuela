import { IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Data from "./Data";
import DeleteIcon from '@mui/icons-material/Delete'

export function Datos(props) {
  const { data, type, keys, contenedor, deleteElement } = props

  if (data.length === 0) return <>No hay {type}</>
  return (
    <>
      {data.length !== 0 && (
        < TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                {keys?.map((x) =>
                  <TableCell component="th" scope="row">
                    {x}
                  </TableCell>

                )}
              </TableRow>
            </TableHead>
            <TableBody>
              {data.map((element) => (
                <TableRow>
                  <Data
                    data={element}
                    keys={keys} />
                  <IconButton onClick={() => deleteElement(element, contenedor)}>
                    <DeleteIcon />
                  </IconButton>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer >
      )
      }
    </>
  )
}
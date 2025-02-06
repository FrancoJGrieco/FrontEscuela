import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";
import Data from "../Data";

export function Datos(props) {
  const { data, type, keys } = props

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
                </TableRow>
                // <TableRow
                //   key={element._id}
                //   sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                // >
                //   <TableCell component="th" scope="row">
                //     {alumno.nombre}
                //   </TableCell>
                //   <TableCell>{alumno.apellido}</TableCell>
                //   <TableCell>{alumno.dni}</TableCell>
                // </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer >

      )


      }
    </>
  )
}
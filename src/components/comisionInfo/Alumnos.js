import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from "@mui/material";

export function Alumnos(props) {
  const { alumnos } = props

  return (
    <>
      {alumnos.length !== 0 && (
        < TableContainer component={Paper} >
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>DNI</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {alumnos.map((alumno) => (
                <TableRow
                  key={alumno._id}
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {alumno.nombre}
                  </TableCell>
                  <TableCell>{alumno.apellido}</TableCell>
                  <TableCell>{alumno.dni}</TableCell>
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
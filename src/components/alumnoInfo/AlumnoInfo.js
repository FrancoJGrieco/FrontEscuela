import { Link } from 'react-router-dom'
import alumnosInfoStore from '../../stores/alumnoInfoStore'
import '@fontsource/roboto/500.css'
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'

export default function AlumnoInfo () {
  const store = alumnosInfoStore()
  if (!store.alumno) return <>Error al encontrar el alumno</>
  return (
    <Container>
      <Button
        component={Link}
        to='/alumnos'
        variant='contained'
        color='primary'
        disableElevation
      >
        Atras
      </Button>
      {store.alumno &&
        <Container>
          <Typography variant='subtitle2'>Nombre: {store.alumno.nombre}</Typography>
          <Typography variant='subtitle2'>Apellido: {store.alumno.Apellido}</Typography>
          <Typography variant='subtitle2'>Edad: {store.alumno.Edad}</Typography>
          <Typography variant='subtitle2'>ID Alumno: {store.alumno._id}</Typography>
        </Container>
      }
      {!store.alumno.boletines && <span>No se ha encontrado un boletin</span>}
      {store.alumno.boletines &&
        <Container>
          {store.alumno.boletines.length > 0 &&
            store.alumno.boletines.map((boletin) => {
              return <Container key={boletin._id}>
                <Typography variant='h5'>Comision: {boletin.comision.numero}</Typography>
                <Table>
                  <TableHead>
                    <TableCell>Materia</TableCell>
                    <TableCell>Notas</TableCell>
                    <TableCell>Agregar</TableCell>
                    <TableCell>Modificar</TableCell>
                  </TableHead>
                  <TableBody>
                    {boletin.materias.map((materia) => {
                      return <TableRow>
                        <TableCell>{materia.materia.nombre}</TableCell>
                        <TableCell>{materia.notas && materia.notas.map((nota) => { return <TableCell>{nota}</TableCell> })}</TableCell>
                        <TableCell><Button onClick={() => store.toggleNota(materia)}>Agregar</Button></TableCell>
                        <TableCell><Button onClick={() => store.toggleUpdate(materia, boletin._id)}>Modificar</Button></TableCell>
                      </TableRow>
                    })
                    }
                  </TableBody>
                </Table>
              </Container>
            })
          }
        </Container>
      }
    </Container>
  )
}

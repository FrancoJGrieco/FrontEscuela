import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Container, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { ResourcesContext } from '../../hooks/alumnos/resources'

export default function AlumnoInfo(props) {
  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setMateria, setNotas } = useContext(ResourcesContext)
  const { alumno } = props
  if (!alumno) return <>Error al encontrar el alumno</>
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
      {alumno &&
        <Container>
          <Typography variant='subtitle2'>Nombre: {alumno.nombre}</Typography>
          <Typography variant='subtitle2'>Apellido: {alumno.apellido}</Typography>
          <Typography variant='subtitle2'>Edad: {alumno.edad}</Typography>
          <Typography variant='subtitle2'>ID Alumno: {alumno._id}</Typography>
        </Container>
      }
      {!alumno.boletines && <span>No se ha encontrado un boletin</span>}
      {alumno.boletines &&
        <Container>
          {alumno.boletines.length > 0 &&
            alumno.boletines.map((boletin) => {
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
                        <TableCell><Button onClick={() => {
                          setMateria(materia)
                          toggleFormVisibility({ formName: 'add' })
                        }}>Agregar</Button></TableCell>
                        <TableCell><Button onClick={() => {
                          setNotas(materia.notas)
                          setMateria(materia)
                          toggleFormVisibility({ formName: 'update' })
                        }}>Modificar</Button></TableCell>
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

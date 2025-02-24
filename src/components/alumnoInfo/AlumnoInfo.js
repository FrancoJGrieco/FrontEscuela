import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@mui/material'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { ResourcesContext } from '../../hooks/alumnos/resources'
import { useBoletines } from '../../hooks/alumnos/useBoletines'

export default function AlumnoInfo(props) {
  const { alumno } = props
  const { toggleFormVisibility } = useContext(FormVisibilityContext)
  const { setMateria, setNotas } = useContext(ResourcesContext)
  const { boletinSelected, handleBoletinChangeField } = useBoletines({ alumno: alumno })

  if (!alumno) return <>Error al encontrar el alumno</>
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
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
          <Card sx={{ mt: 3, p: 2 }}>
            <CardContent>
              <Typography variant='h5'>Nombre: {alumno.nombre} {alumno.apellido}</Typography>
              <Typography variant='subtitle1'>Fecha de Nacimiento: {alumno.nacimiento}</Typography>
              <Typography variant='subtitle1'>Mail: {alumno.mail}</Typography>
              <Typography variant='subtitle1'>ID Alumno: {alumno._id}</Typography>
            </CardContent>
          </Card>
        </Container>
      }
      {alumno.boletines.length === 0 && <Typography sx={{ margin: '10px 0px' }}>No se han cargado boletines a {alumno.nombre + ' ' + alumno.apellido}</Typography>}
      {alumno.boletines.length > 0 &&
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
          <InputLabel id="select-boletin-label">Boletines</InputLabel>
          <Select
            id="select-boletin"
            labelId="select-boletin-label"
            value={boletinSelected._id}
            label="Boletines"
            name='boletines'
            onChange={handleBoletinChangeField}
          >
            <MenuItem value=''>
              <em>None</em>
            </MenuItem>
            {alumno.boletines?.map((boletin) => (
              <MenuItem key={boletin._id} value={boletin._id}>
                {boletin.year + ' ' + boletin?.comision?.numero}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      }

      {boletinSelected._id !== '' &&
        < Container>
          <Typography variant='h5'>Comision: {boletinSelected.comision.numero}</Typography>

          <Table>
            <TableHead>
              <TableCell>Materia</TableCell>
              <TableCell>Notas</TableCell>
              <TableCell>Promedio</TableCell>
              <TableCell>Agregar</TableCell>
              <TableCell>Modificar</TableCell>
            </TableHead>
            <TableBody>
              {boletinSelected.materias.map((materia) => {
                return <TableRow>
                  <TableCell>{materia?.materia?.nombre}</TableCell>
                  <TableCell>{materia?.notas && materia.notas.map((nota) => { return <TableCell>{nota}</TableCell> })}</TableCell>
                  <TableCell>{materia.promedio}</TableCell>
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
      }
    </Container >
  )
}

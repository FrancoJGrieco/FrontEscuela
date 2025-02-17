import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect } from 'react'
import { FormContext } from '../../hooks/global/forms'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { useAddAlumnoComision } from '../../hooks/comisiones/useAddAlumnoComision'
import { useDeleteAlumno } from '../../hooks/comisiones/useDeleteAlumno'
import { useHandleAlumno } from '../../hooks/comisiones/useHandleAlumno'

export default function ComisionInfo(props) {
  const { comision } = props
  const { updateForm, setUpdateForm } = useContext(FormContext)
  const { alumnoDNI, handleAlumnoChangeField } = useHandleAlumno()
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { addAlumnoComision } = useAddAlumnoComision()
  const { deleteAlumno } = useDeleteAlumno()

  useEffect(() => {
    setUpdateForm(comision)
  }, [])

  if (!comision) return <>Error al encontrar la comision</>
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Button
        component={Link}
        to='/comisiones'
        variant='contained'
        color='primary'
        disableElevation
      >
        Atras
      </Button>
      {comision &&
        <Container>
          <Container>
            <Card sx={{ mt: 3, p: 2 }}>
              <CardContent>
                <Typography variant='h5'>Comision: {comision.numero}</Typography>
                <Typography variant='subtitle1'>Curso: {comision.curso?.titulatura}</Typography>
                <Typography variant='subtitle1'>Año: {comision.year}</Typography>
              </CardContent>
              <Box mt={2} display='flex' alignItems='center' gap={2}>
                <TextField label='DNI Alumno' size='small' value={alumnoDNI} onChange={handleAlumnoChangeField} ></TextField>
                <Button onClick={() => { addAlumnoComision({ alumnoDNI, comision: updateForm }) }}>Agregar Alumno</Button>
              </Box>
            </Card>
          </Container>
          <Container sx={{ display: 'flex', gap: '5px' }}>

            <Button variant='contained' color='info' sx={{ mt: 2 }} onClick={() => toggleFormVisibility({ formName: 'alumnos' })}>
              {(formVisibility === 'alumnos') ? 'Ocultar Alumnos' : 'Mostrar Alumnos'}
            </Button>
            <Button variant='contained' color='info' sx={{ mt: 2 }} onClick={() => toggleFormVisibility({ formName: 'materias' })}>
              {(formVisibility === 'materias') ? 'Ocultar Materias' : 'Mostrar Materias'}
            </Button>
          </Container>
          {(formVisibility === 'alumnos') ? (
            <Datos
              data={comision.alumnos}
              contenedor={comision}
              deleteElement={deleteAlumno}
              type='alumnos'
              keys={['nombre', 'apellido', 'dni']}
            />
          ) :
            <></>
          }

          {(formVisibility === 'materias') ? (
            <Datos
              data={comision.materias}
              type='materias'
              keys={['nombre', 'descripcion']}
            />
          ) :
            <></>
          }
        </Container>
      }
    </Container>
  )
}
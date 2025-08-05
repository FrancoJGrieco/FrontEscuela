import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect, useState } from 'react'
import { FormContext } from '../../hooks/global/forms'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { useAddAlumnoComision } from '../../hooks/comisiones/useAddAlumnoComision'
import { useDeleteAlumno } from '../../hooks/comisiones/useDeleteAlumno'
import { useHandleAlumno } from '../../hooks/comisiones/useHandleAlumno'
import { DataContext } from '../../hooks/global/data'

export default function ComisionInfo(props) {
  const { comision } = props
  const { updateForm, setUpdateForm } = useContext(FormContext)
  const { alumnoDNI, handleAlumnoChangeField } = useHandleAlumno()
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { addAlumnoComision } = useAddAlumnoComision()
  const { deleteAlumno } = useDeleteAlumno()
  const [comisionState, setComisionState] = useState(comision)
  const { data } = useContext(DataContext)

  useEffect(() => {
    setUpdateForm(comision)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setComisionState(data.comisiones.filter((comisionData) => comisionData._id === comision._id)[0])
  }, [comision, data])

  if (!comisionState) return <>Error al encontrar la comision</>
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
      {comisionState &&
        <Container>
          <Container>
            <Card sx={{ mt: 3, p: 2 }}>
              <CardContent>
                <Typography variant='h5'>Comision: {comisionState.numero}</Typography>
                <Typography variant='subtitle1'>Curso: {comisionState.curso?.titulatura}</Typography>
                <Typography variant='subtitle1'>Año: {comisionState.year}</Typography>
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
              data={comisionState.alumnos}
              contenedor={comisionState}
              deleteElement={deleteAlumno}
              type='alumnos'
              keys={['nombre', 'apellido', 'dni']}

            />
          ) :
            <></>
          }

          {(formVisibility === 'materias') ? (
            <Datos
              data={comisionState.materias}
              type='materias en comision'
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
import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Box, Button, Card, CardContent, Container, TextField, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect, useState } from 'react'
import { DataContext } from '../../hooks/global/data'
import axios from 'axios'
import { FormContext } from '../../hooks/global/forms'
import { FormVisibilityContext } from '../../hooks/global/filters'

export default function ComisionInfo(props) {
  const { comision } = props
  const { data } = useContext(DataContext)
  const { updateForm, setUpdateForm } = useContext(FormContext)
  const [alumnoDNI, setAlumnoDNI] = useState('')
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)

  useEffect(() => {
    setUpdateForm(comision)
  }, [])

  const URL_FETCH_DATA = 'http://localhost:3030/'

  const handleAlumnoChangeField = (e) => {
    const { value } = e.target
    setAlumnoDNI(value)
    console.log(alumnoDNI)
  }

  const addAlumnoComision = async ({ alumno, comision }) => {
    const alumnoFilter = (data.alumnos.filter((alumno) => alumno.dni === alumnoDNI))[0]
    comision.alumnos.push(alumnoFilter)
    await axios.put(`${URL_FETCH_DATA}comisiones/${comision._id}`, comision, { withCredentials: true })

    let materiasBoletin = []

    try {
      const resMaterias = await Promise.all(
        comision.materias.map((materia) =>
          axios.post('http://localhost:3030/materias_boletin', { materia, notas: [] })
        )
      )
      resMaterias.forEach(resMateria => {
        materiasBoletin.push(resMateria.data.materiaBoletin._id)
      })
    } catch (err) {
      console.error('Error en una de las solicitudes: ' + err)
    }


    const resBoletin = await axios.post(
      'http://localhost:3030/boletines',
      {
        curso: comision.curso._id,
        comision: comision._id,
        year: new Date().getFullYear(),
        materias: materiasBoletin,
        alumno: alumnoFilter
      })

    const idBoletin = resBoletin.data.boletin._id

    await Promise.all(
      materiasBoletin.map((materia) =>
        axios.put('http://localhost:3030/materias_boletin/' + materia, { boletin: idBoletin, materia, notas: [] })
      )
    )
    alumnoFilter.boletines.push(resBoletin.data.boletin)

    await axios.put('http://localhost:3030/alumnos/' + alumnoFilter._id, alumnoFilter)

  }

  // Eliminar alumno
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
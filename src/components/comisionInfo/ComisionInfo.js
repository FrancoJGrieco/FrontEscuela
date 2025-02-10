import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useState } from 'react'
import { DataContext } from '../../hooks/global/data'
import axios from 'axios'
import { FormContext } from '../../hooks/global/forms'

export default function ComisionInfo(props) {
  const { comision } = props
  const { data } = useContext(DataContext)
  const { updateForm, setUpdateForm, handleUpdateChangeField } = useContext(FormContext)
  const [alumnoDNI, setAlumnoDNI] = useState('')

  setUpdateForm(comision)
  console.log(updateForm)
  console.log(comision)

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
        year: '2025',
        materias: materiasBoletin,
        alumno: alumnoFilter
      })

    console.log(resBoletin.data.boletin._id)
    alumnoFilter.boletines.push(resBoletin.data.boletin._id)

    const resAlumno = await axios.put('http://localhost:3030/alumnos/' + alumnoFilter._id, alumnoFilter)

    console.log(resAlumno)
  }

  // Eliminar alumno
  if (!comision) return <>Error al encontrar la comision</>
  return (
    <Container>
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
            <Typography variant='subtitle2'>Comision: {comision.numero}</Typography>
            <Typography variant='subtitle2'>Curso: {comision.curso?.titulatura}</Typography>
            <Typography variant='subtitle2'>Año: {comision.year}</Typography>
            <Container>
              <TextField label='DNI Alumno' size='small' value={alumnoDNI} onChange={handleAlumnoChangeField} ></TextField>
              <Button onClick={() => { addAlumnoComision({ alumnoDNI, comision: updateForm }) }}>Agregar Alumno</Button>
            </Container>
          </Container>
          <Datos
            data={comision.alumnos}
            type='alumnos'
            keys={['nombre', 'apellido', 'dni']}
          />
          <Datos
            data={comision.materias}
            type='materias'
            keys={['nombre', 'descripcion']}
          />
        </Container>
      }
    </Container>
  )
}

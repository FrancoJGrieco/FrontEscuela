import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { DataContext } from '../../hooks/global/data'
import { addMateriaCurso } from '../../services/cursos/addMateriaCurso'
import { FormContext } from '../../hooks/global/forms'
import { deleteMateriaCurso } from '../../services/cursos/deleteMateriaCurso'


export default function CursoInfo(props) {
  const { curso } = props
  const { materias } = useContext(DataContext)
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { updateForm, setUpdateForm, handleUpdateFieldChange } = useContext(FormContext)

  useEffect(() => {
    setUpdateForm({ materia: '' })
  }, [])

  // Eliminar materia de curso
  if (!curso) return <>Error al encontrar el curso</>
  return (
    <Container>
      <Button
        component={Link}
        to='/cursos'
        variant='contained'
        color='primary'
        disableElevation
      >
        Atras
      </Button>
      {curso &&
        <Container>
          <Container>
            <Typography variant='subtitle2'>Comision: {curso.titulatura}</Typography>
            <Typography variant='subtitle2'>Años: {curso.years}</Typography>
            {/*  */}
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-materia-label">Materias</InputLabel>
              <Select
                id="select-materia"
                labelId="select-materia-label"
                value={updateForm._id}
                label="Materias"
                name='materia'
                onChange={handleUpdateFieldChange}
              >
                <MenuItem value="">
                  <em>None</em>
                </MenuItem>
                {materias?.map((materia) => (
                  <MenuItem key={materia._id} value={materia._id}>
                    {materia.nombre}
                  </MenuItem>
                ))}
              </Select>
              <Button onClick={() => addMateriaCurso({ curso: curso, _id: updateForm.materia })}>Agregar Materia</Button>
            </FormControl>
            {/*  */}
          </Container>
          <Button onClick={() => toggleFormVisibility({ formName: 'materias' })}>Ver Materias</Button>
          {formVisibility === 'materias' &&
            < Datos
              data={curso.materias}
              type='materias'
              keys={['nombre', 'descripcion']}
              contenedor={curso}
              deleteElement={deleteMateriaCurso}
            />

          }
        </Container>
      }
    </Container>
  )
}

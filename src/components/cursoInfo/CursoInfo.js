import { Link } from 'react-router-dom'
import { Button, Card, CardContent, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect, useState } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { DataContext } from '../../hooks/global/data'
import { useHandleMateria } from '../../hooks/cursos/useHandleMateria'
import { useHandleMateriaCurso } from '../../hooks/cursos/useHandleMateriaCurso'



export default function CursoInfo(props) {
  const { curso } = props
  const { data } = useContext(DataContext)
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { materia, handleMateriaFieldChange } = useHandleMateria()
  const { newCurso, handleUpdateMateriaCurso, handleDeleteMateriaCurso } = useHandleMateriaCurso({ curso })
  const [cursoState, setCursoState] = useState(curso)

  useEffect(() => {
    setCursoState(newCurso)
  }, [newCurso])

  if (!cursoState) return <>Error al encontrar el curso</>
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Button
        component={Link}
        to='/cursos'
        variant='contained'
        color='primary'
        disableElevation
      >
        Atras
      </Button>
      {cursoState &&
        <Container>
          <Container>
            <Card sx={{ mt: 3, p: 2 }}>
              <CardContent>
                <Typography variant='h5'>Comision: {cursoState.titulatura}</Typography>
                <Typography variant='subtitle1'>Años: {cursoState.years}</Typography>
              </CardContent>
                <FormControl sx={{ m: 1, minWidth: 300, display: 'flex', flexDirection:'row', gap: '5px' }} size="small">
                  <InputLabel id="select-materia-label">Materias</InputLabel>
                  <Select
                    id="select-materia"
                    labelId="select-materia-label"
                    value={materia}
                    label="Materias"
                    name='materia'
                    onChange={handleMateriaFieldChange}
                    sx={{minWidth: '300px'}}
                  >
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {data.materias?.map((materia) => (
                      <MenuItem key={materia._id} value={materia._id}>
                        {materia.nombre}
                      </MenuItem>
                    ))}
                  </Select>
                  <Button onClick={() => handleUpdateMateriaCurso({ curso: cursoState, _id: materia })}>Agregar Materia</Button>
                </FormControl>
            </Card>
          </Container>
          <Button onClick={() => toggleFormVisibility({ formName: 'materias' })} sx={{margin: '10px 0px'}}>Ver Materias</Button>
          {
            formVisibility === 'materias' &&
            < Datos
              data={cursoState.materias}
              type='materias'
              keys={['nombre', 'descripcion']}
              contenedor={cursoState}
              deleteElement={handleDeleteMateriaCurso}
            />

          }
        </Container >
      }
    </Container >
  )
}
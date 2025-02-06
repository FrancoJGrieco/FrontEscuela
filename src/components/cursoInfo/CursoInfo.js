import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Container, Typography } from '@mui/material'
import { Datos } from '../comisionInfo/Datos'
import { useContext } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'

export default function CursoInfo(props) {
  const { curso } = props
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
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
          </Container>
          <Button onClick={() => toggleFormVisibility({ formName: 'materias' })}>Ver Materias</Button>
          {formVisibility === 'materias' &&
            < Datos
              data={curso.materias}
              type='materias'
              keys={['nombre', 'descripcion']}
            />

          }
        </Container>
      }
    </Container>
  )
}

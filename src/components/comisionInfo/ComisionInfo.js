import { Link } from 'react-router-dom'
import '@fontsource/roboto/500.css'
import { Button, Container, Typography } from '@mui/material'
import { Datos } from './Datos'

export default function ComisionInfo(props) {
  const { comision } = props
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
            <Typography variant='subtitle2'>Año: {comision.year}</Typography>
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

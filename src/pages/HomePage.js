import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'
import GridInfo from '../components/home/GridInfo'

export default function HomePage() {

  const { data } = useContext(DataContext)

  return (
    <Box component='main'>
      <Typography variant="h4" gutterBottom>Bienvenido al Sistema de Gestión</Typography>
      <Container spacing={2}
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh'
        }}
      >
        <GridInfo title='Total Alumnos' data={data.alumnos.length} />
        <GridInfo title='Total Cursos' data={data.cursos.length} />
        <GridInfo title='Total Materias' data={data.materias.length} />
        <GridInfo title='Total Comisiones' data={data.comisiones.length} />
      </Container>
    </Box>
  )
}

import { useContext } from 'react'
import { DataContext } from '../hooks/global/data'
import { Box, Card, CardContent, Container, Typography } from '@mui/material'
import Grid from '@mui/material/Grid2'

export default function HomePage() {

  const { data } = useContext(DataContext)

  return (
    <Box component='main'>
      <Typography variant="h4" gutterBottom>Bienvenido al Sistema de Gestión</Typography>
      {/* cantidad de alumnos, comisiones, cursos y materias si se puede */}
      <Container spacing={2}
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'center',
          alignItems: 'center',
          height: '50vh'
        }}
      >
        <Grid item xs={10} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Alumnos</Typography>
              <Typography variant="h4">{data.alumnos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Cursos</Typography>
              <Typography variant="h4">{data.cursos.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Materias</Typography>
              <Typography variant="h4">{data.materias.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Comisiones</Typography>
              <Typography variant="h4">{data.comisiones.length}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Container>
    </Box>
  )
}

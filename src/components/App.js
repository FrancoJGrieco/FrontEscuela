import AlumnosPage from '../pages/AlumnosPages'
import LoginPage from '../pages/LoginPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import authStore from '../stores/authStore'
import MateriasPage from '../pages/MateriasPage'
import CursosPage from '../pages/CursosPage'
import ComisionesPage from '../pages/ComisionesPage'
import AlumnoInfoPage from '../pages/AlumnoInfoPage'
import { AppBar, Box, Button, Card, CardContent, Container, Grid, Toolbar, Typography } from '@mui/material'
import ComisionInfoPage from '../pages/ComisionInfoPage'
import CursoInfoPage from '../pages/CursoInfoPage'

function App() {
  const store = authStore((store) => {
    return {
      loggedIn: store.loggedIn
    }
  })
  return (
    <Box
      className="App"
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "background.default",
      }}
    >
      <BrowserRouter>
        {store.loggedIn &&
          <AppBar position='static'>
            <Container
            >
              <Toolbar>
                <Box>
                  <Button
                    component={Link}
                    to='/'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Home
                  </Button>
                  <Button
                    component={Link}
                    to='/comisiones'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Comisiones
                  </Button>
                  <Button
                    component={Link}
                    to='/cursos'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Cursos
                  </Button>
                  <Button
                    component={Link}
                    to='/materias'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Materias
                  </Button>
                  <Button
                    component={Link}
                    to='/alumnos'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Alumnos
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        }
        <Routes>
          <Route index element={
            <RequireAuth>
              <main>
                <Typography variant="h4" gutterBottom>Bienvenido al Sistema de Gestión</Typography>

                <Grid container spacing={3}>
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Total Alumnos</Typography>
                        <Typography variant="h4">150</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Total Cursos</Typography>
                        <Typography variant="h4">25</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Card>
                      <CardContent>
                        <Typography variant="h6">Total Materias</Typography>
                        <Typography variant="h4">40</Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>

                <Button variant="contained" color="primary" style={{ marginTop: 20 }}>
                  Crear Nuevo Alumno
                </Button>
              </main>
            </RequireAuth>
          } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/alumnos' element={
            <RequireAuth>
              <AlumnosPage />
            </RequireAuth>
          } />
          <Route path='/alumnos/:_id' element={
            <RequireAuth>
              <AlumnoInfoPage />
            </RequireAuth>
          } />
          <Route path='/materias' element={
            <RequireAuth>
              <MateriasPage />
            </RequireAuth>
          } />
          <Route path='/cursos' element={
            <RequireAuth>
              <CursosPage />
            </RequireAuth>
          } />
          <Route path='/cursos/:_id' element={
            <RequireAuth>
              <CursoInfoPage />
            </RequireAuth>
          } />
          <Route path='/comisiones' element={
            <RequireAuth>
              <ComisionesPage />
            </RequireAuth>
          } />
          <Route path='/comisiones/:_id' element={
            <RequireAuth>
              <ComisionInfoPage />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>

      <Box
          component="footer"
          sx={{
            backgroundColor: "primary.main",
            color: "white",
            textAlign: "center",
            padding: 2,
            marginTop: "auto"
          }}
        >
        <Typography variant="body2">2025 Creado por Franco Grieco</Typography>
      </Box>
    </Box>
  )
}

export default App

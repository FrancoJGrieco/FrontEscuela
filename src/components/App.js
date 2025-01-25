import AlumnosPage from '../pages/AlumnosPages'
import LoginPage from '../pages/LoginPage'
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom'
import RequireAuth from './RequireAuth'
import authStore from '../stores/authStore'
import MateriasPage from '../pages/MateriasPage'
import CursosPage from '../pages/CursosPage'
import ComisionesPage from '../pages/ComisionesPage'
import BoletinesPage from '../pages/BoletinesPages'
import AlumnoInfoPage from '../pages/AlumnoInfoPage'
import { AppBar, Box, Button, Container, Toolbar } from '@mui/material'

function App () {
  const store = authStore((store) => {
    return {
      loggedIn: store.loggedIn
    }
  })
  return (
    <div className="App">
      <BrowserRouter>
        {store.loggedIn &&
          <AppBar position='static'>
            <Container>
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
                  <Button
                    component={Link}
                    to='/boletines'
                    variant='contained'
                    color='primary'
                    disableElevation
                  >
                    Boletines
                  </Button>
                </Box>
              </Toolbar>
            </Container>
          </AppBar>
        }
        <Routes>
          <Route index element={
            <RequireAuth>
              <AlumnosPage />
            </RequireAuth>
          } />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/alumnos' element={
            <RequireAuth>
              <AlumnosPage />
            </RequireAuth>
          } />
          <Route path='/alumno/:_id' element={
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
          <Route path='/comisiones' element={
            <RequireAuth>
              <ComisionesPage />
            </RequireAuth>
          } />
          <Route path='/boletines' element={
            <RequireAuth>
              <BoletinesPage />
            </RequireAuth>
          } />
        </Routes>
      </BrowserRouter>

      <footer>Creado por Franco Grieco</footer>
    </div>
  )
}

export default App

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

function App () {
  const store = authStore((store) => {
    return {
      loggedIn: store.loggedIn
    }
  })
  return (
    <div className="App">
      <BrowserRouter>
        <header className='header-nav'>
          <nav>
            {store.loggedIn &&
              <ul>
                <li>
                  <Link to='/'>Home</Link>
                </li>
                <li>
                  <Link to='/comisiones'>Comisiones</Link>
                </li>
                <li>
                  <Link to='/cursos'>Cursos</Link>
                </li>
                <li>
                  <Link to='/materias'>Materias</Link>
                </li>
                <li>
                  <Link to='/alumnos'>Alumnos</Link>
                </li>
                <li>
                  <Link to='/boletines'>Boletines</Link>
                </li>
              </ul>
            }
          </nav>
        </header>
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

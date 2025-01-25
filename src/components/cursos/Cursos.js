import { Table, TableBody, TableContainer, TableHead, Paper, TableRow, TableCell, Button } from '@mui/material'
import cursosStore from '../../stores/cursosStore'
import Curso from './Curso'

export default function Cursos () {
  const store = cursosStore()
  return (
    <section>
      <header>
        <h2>Tabla de Cursos</h2>
      </header>
      <div>
        <Button onClick={() => store.toggleCreate()}>Crear</Button>
        <TableContainer component={Paper}>
          <Table size='small' sx={{ color: 50 }}>
            <TableHead>
              <TableRow>
                <TableCell align='center'>Titulatura</TableCell>
                <TableCell align='center'>Años</TableCell>
                <TableCell align='center'>Materias</TableCell>
                <TableCell align='center'>Eliminar</TableCell>
                <TableCell align='center'>Modificar</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {store.cursos &&
                store.cursos.map((curso) => {
                  return (
                    <Curso curso={curso} />
                  )
                })
              }
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </section >
  )
}

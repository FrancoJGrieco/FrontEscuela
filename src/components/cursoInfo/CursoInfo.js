import { Link } from 'react-router-dom'
import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import { Datos } from '../Datos'
import { useContext, useEffect, useState } from 'react'
import { FormVisibilityContext } from '../../hooks/global/filters'
import { DataContext } from '../../hooks/global/data'
import { deleteMateriaCurso } from '../../services/cursos/deleteMateriaCurso'
import { useHandleMateria } from '../../hooks/useHandleMateria'
import { useHandleMateriaCurso } from '../../hooks/useHandleMateriaCurso'


export default function CursoInfo(props) {
  const { curso } = props
  const { data } = useContext(DataContext)
  const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext)
  const { materia, handleMateriaFieldChange } = useHandleMateria()
  const { newCurso, handleUpdateMateriaCurso } = useHandleMateriaCurso({ curso })
  const [cursoState, setCursoState] = useState(curso)

  useEffect(() => {
    setCursoState(newCurso)
  }, [newCurso])

  if (!cursoState) return <>Error al encontrar el curso</>
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
      {cursoState &&
        <Container>
          <Container>
            <Typography variant='subtitle2'>Comision: {cursoState.titulatura}</Typography>
            <Typography variant='subtitle2'>Años: {cursoState.years}</Typography>
            <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
              <InputLabel id="select-materia-label">Materias</InputLabel>
              <Select
                id="select-materia"
                labelId="select-materia-label"
                value={materia}
                label="Materias"
                name='materia'
                onChange={handleMateriaFieldChange}
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
          </Container>
          <Button onClick={() => toggleFormVisibility({ formName: 'materias' })}>Ver Materias</Button>
          {formVisibility === 'materias' &&
            < Datos
              data={cursoState.materias}
              type='materias'
              keys={['nombre', 'descripcion']}
              contenedor={cursoState}
              deleteElement={deleteMateriaCurso}
            />

          }
        </Container>
      }
    </Container>
  )
}
// import { Link } from 'react-router-dom';
// import { Button, Container, FormControl, InputLabel, MenuItem, Select, Typography } from '@mui/material';
// import { Datos } from '../Datos';
// import { useContext, useEffect, useState } from 'react';
// import { FormVisibilityContext } from '../../hooks/global/filters';
// import { DataContext } from '../../hooks/global/data';
// import { deleteMateriaCurso } from '../../services/cursos/deleteMateriaCurso';
// import { useHandleMateria } from '../../hooks/useHandleMateria';
// import { useHandleMateriaCurso } from '../../hooks/useHandleMateriaCurso';

// export default function CursoInfo({ curso }) {
//   const { data } = useContext(DataContext);
//   const { formVisibility, toggleFormVisibility } = useContext(FormVisibilityContext);
//   const { materia, handleMateriaFieldChange } = useHandleMateria();
//   const { newCurso, handleUpdateMateriaCurso } = useHandleMateriaCurso({ curso });
//   const [cursoState, setCursoState] = useState(curso);
//   const [showMaterias, setShowMaterias] = useState(false);

//   useEffect(() => {
//     setCursoState(newCurso);
//   }, [newCurso]);

//   if (!cursoState) return <Typography color='error'>Error al encontrar el curso</Typography>;

//   return (
//     <Container>
//       <Button component={Link} to='/cursos' variant='contained' color='primary'>
//         Atrás
//       </Button>
//       <Container>
//         <Typography variant='subtitle2'>Comisión: {cursoState.titulatura}</Typography>
//         <Typography variant='subtitle2'>Años: {cursoState.years}</Typography>
//         <FormControl sx={{ m: 1, minWidth: 120 }} size='small'>
//           <InputLabel id='select-materia-label'>Materias</InputLabel>
//           <Select
//             id='select-materia'
//             labelId='select-materia-label'
//             value={materia}
//             label='Materias'
//             name='materia'
//             onChange={handleMateriaFieldChange}
//           >
//             <MenuItem value=''><em>None</em></MenuItem>
//             {data.materias?.map((materia) => (
//               <MenuItem key={materia._id} value={materia._id}>
//                 {materia.nombre}
//               </MenuItem>
//             ))}
//           </Select>
//           <Button variant='contained' color='secondary' onClick={() => handleUpdateMateriaCurso({ curso: cursoState, _id: materia })}>
//             Agregar Materia
//           </Button>
//         </FormControl>
//       </Container>
//       <Button variant='contained' color='info' sx={{ mt: 2 }} onClick={() => setShowMaterias(!showMaterias)}>
//         {showMaterias ? 'Ocultar Materias' : 'Mostrar Materias'}
//       </Button>
//       {showMaterias && (
//         <Datos
//           data={cursoState.materias}
//           type='materias'
//           keys={['nombre', 'descripcion']}
//           contenedor={cursoState}
//           deleteElement={deleteMateriaCurso}
//         />
//       )}
//     </Container>
//   );
// }

import { Button, Card, CardContent, Container, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function MateriaInfo({ materia }) {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Button
        component={Link}
        to='/materias'
        variant='contained'
        color='primary'
        disableElevation
      >
        Atras
      </Button>
      <Card sx={{ mt: 3, p: 2 }}>
        <CardContent>
          <Typography variant='h5'>Comision: {materia.nombre}</Typography>
          <Typography variant='subtitle1'>Año: {materia.year}</Typography>
          <Typography variant='subtitle1'>Descripcion: {materia.descripcion}</Typography>
        </CardContent>
      </Card>
    </Container>
  )
}
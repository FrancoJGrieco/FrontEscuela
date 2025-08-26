import { Button, Container, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../hooks/global/auth";

export default function CrearUsuarioPage() {
  const { createForm, updateCreateFormField, signup } = useContext(AuthContext)
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <Typography variant='h4'>Crear Usuario</Typography>
      <Container
        component='form'
        onSubmit={signup}
        maxWidth='sm'
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '10px'
        }}
      >
        <TextField
          name='user'
          label='Usuario'
          type='text'
          value={createForm.user}
          onChange={updateCreateFormField}
          required
        ></TextField>
        <TextField
          name='password'
          label='Contraseña'
          type='text'
          value={createForm.password}
          onChange={updateCreateFormField}
          required
        ></TextField>
        <Button type='submit'>Crear</Button>
      </Container>
    </Container>
  )
}
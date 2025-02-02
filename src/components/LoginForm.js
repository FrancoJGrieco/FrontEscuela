import { useNavigate } from 'react-router-dom'
import authStore from '../stores/authStore'
import { Button, Container, TextField, Typography } from '@mui/material'

export default function LoginForm() {
  const store = authStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await store.login()
    console.log('hola', store.loginForm)
    navigate('/')
  }
  return (
    <Container
      component='form'
      onSubmit={handleLogin}
      maxWidth='sm'
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'

      }}>
      <Typography variant='h4'>Login</Typography>
      <TextField name='user' label='Usuario' type='text' value={store.loginForm.user} onChange={store.updateLoginFormField}></TextField>
      <TextField name='password' label='Contraseña' type='password' value={store.loginForm.password} onChange={store.updateLoginFormField}></TextField>
      <Button type='submit'>Login</Button>
    </Container >
  )
}

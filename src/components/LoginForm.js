import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material'
import { AuthContext } from '../hooks/global/auth'
import { useContext } from 'react'

export default function LoginForm() {
  const { loginForm, login, updateLoginFormField } = useContext(AuthContext)
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await login()
    console.log('hola', loginForm)
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
      <TextField name='user' label='Usuario' type='text' value={loginForm.user} onChange={updateLoginFormField}></TextField>
      <TextField name='password' label='Contraseña' type='password' value={loginForm.password} onChange={updateLoginFormField}></TextField>
      <Button type='submit'>Login</Button>
    </Container >
  )
}

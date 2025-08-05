import { useNavigate } from 'react-router-dom'
import { Button, Container, TextField, Typography } from '@mui/material'
import { AuthContext } from '../hooks/global/auth'
import { useContext, useState } from 'react'

export default function LoginForm() {
  const { loginForm, login, updateLoginFormField } = useContext(AuthContext)
  const [error, setError] = useState(null)

  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    try {
      await login()
      setError(null)
      navigate('/')
    } catch (err) {
      setError(err.message || 'Error al iniciar sesión')
    }
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

      <TextField
        name='user'
        label='Usuario'
        type='text'
        value={loginForm.user}
        onChange={updateLoginFormField}
        />
      <TextField
        name='password'
        label='Contraseña'
        type='password'
        value={loginForm.password}
        onChange={updateLoginFormField}
        />
        {error && <Typography color="error">{error}</Typography>}
      <Button type='submit'>Login</Button>
    </Container>
  )
}


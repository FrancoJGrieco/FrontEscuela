import { Container } from '@mui/material'
import LoginForm from '../components/LoginForm'

export default function LoginPage() {
  return (
    <Container maxWidth='md' sx={{ mt: 4 }}>
      <LoginForm />
    </Container>
  )
}

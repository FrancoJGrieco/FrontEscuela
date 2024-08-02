import { useNavigate } from 'react-router-dom'
import authStore from '../stores/authStore'

export default function LoginForm () {
  const store = authStore()
  const navigate = useNavigate()

  const handleLogin = async (e) => {
    e.preventDefault()
    await store.login()
    navigate('/')
  }
  return (
    <form onSubmit={handleLogin}>
      <span>Username: </span>
      <input onChange={store.updateLoginFormField} value={store.loginForm.user} type='text' name='user' /><br />
      <span>Password: </span>
      <input onChange={store.updateLoginFormField} value={store.loginForm.password} type='password' name='password' /><br />
      <button type='submit'>Login</button>
    </form>
  )
}

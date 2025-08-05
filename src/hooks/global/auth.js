import axios from "axios"
import { createContext, useState } from "react"

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(null)
  const [loginForm, setLoginForm] = useState({
    user: '',
    password: ''
  })

  const updateLoginFormField = (e) => {
    const { name, value } = e.target
    setLoginForm((prevData) => ({
      ...prevData,
      [name]: value.trim()
    }))
  }

const login = async () => {
  try {
    await axios.post(process.env.REACT_APP_API_URL + '/login', loginForm, {
      withCredentials: true
    })
    setLoggedIn(true)
    setLoginForm({ user: '', password: '' })
  } catch (err) {
    console.log('(login):', err)
    throw new Error('Usuario o contraseña incorrectos')
  }
}

  const logout = async () => {
    await axios.post(process.env.REACT_APP_API_URL + '/logout', { withCredentials: true })
    setLoggedIn(false)
    setLoginForm({
      user: '',
      password: ''
    })
  }

  const checkAuth = async () => {
    try {
      await axios.get(process.env.REACT_APP_API_URL + '/check-auth', { withCredentials: true })
      setLoggedIn(true)
    } catch (err) {
      setLoggedIn(false)
    }
  }

  return (
    <AuthContext.Provider value={{
      loginForm,
      loggedIn,
      login,
      logout,
      updateLoginFormField,
      checkAuth
    }}>
      {children}
    </AuthContext.Provider>
  )
}
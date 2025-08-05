import { useContext, useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from '../hooks/global/auth'

export default function RequireAuth(props) {
  const { loggedIn, checkAuth } = useContext(AuthContext)

  useEffect(() => {
    checkAuth()
  }, [checkAuth])
  
  if (loggedIn === null) {
    return <h2>Loading</h2>
  }

  if (loggedIn === false) return <Navigate to='/login' />
  return (
    <>{props.children}</>
  )
}

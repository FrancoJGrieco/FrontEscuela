import { useEffect } from 'react'
import { Navigate } from 'react-router-dom'
import authStore from '../stores/authStore'

export default function RequireAuth (props) {
  const store = authStore()

  useEffect(() => {
    if (store.loggedIn === null) {
      store.checkAuth()
    }
  }, [])

  if (store.loggedIn === null) {
    return <h2>Loading</h2>
  }

  if (store.loggedIn === false) return <Navigate to='/login'/>
  return (
    <>{props.children}</>
  )
}

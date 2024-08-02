import axios from 'axios'
import { create } from 'zustand'

const authStore = create((set) => ({
  loggedIn: null,

  loginForm: {
    user: '',
    password: ''
  },

  updateLoginFormField: (e) => {
    const { name, value } = e.target
    set((state) => {
      return {
        loginForm: {
          ...state.loginForm,
          [name]: value
        }
      }
    })
  },
  login: async (e) => {
    const { loginForm } = authStore.getState()

    await axios.post('http://localhost:3030/login', loginForm, { withCredentials: true })
    set({
      loggedIn: true,
      loginForm: {
        user: '',
        password: ''
      }
    })
  },
  checkAuth: async () => {
    try {
      await axios.get('/check-auth', { withCredentials: true })
      set({ loggedIn: true })
    } catch (err) {
      console.log(err)
      set({ loggedIn: false })
    }
  }
}))

export default authStore

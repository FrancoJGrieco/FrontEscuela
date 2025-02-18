import axios from 'axios'
import { showError } from './showError'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function createData({ e, typeDB, data }) {
  e.preventDefault()
  try {
    const res = await axios.post(`${URL_FETCH_DATA}${typeDB}`, data, { withCredentials: true })

    console.log(res)

    return res.data
  } catch (err) {
    console.log('hola')
    showError({ err })
  }
}

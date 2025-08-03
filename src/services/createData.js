import axios from 'axios'
import { showError } from './showError'

const URL_FETCH_DATA = process.env.REACT_APP_API_URL

export async function createData({ e, typeDB, data }) {
  e.preventDefault()
  try {
    const res = await axios.post(`${URL_FETCH_DATA}/${typeDB}`, data, { withCredentials: true })

    return res.data
  } catch (err) {
    showError({ err })
  }
}

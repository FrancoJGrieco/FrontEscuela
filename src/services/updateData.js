import axios from 'axios'
import { showError } from './showError'

const URL_FETCH_DATA = process.env.REACT_APP_API_URL

export async function updateData({ e, typeDB, _id, data }) {
  e.preventDefault()
  try {
    const res = await axios.put(`${URL_FETCH_DATA}/${typeDB}/${_id}`, data, { withCredentials: true })

    return res.data
  } catch (err) {
    showError({ err })
  }
}

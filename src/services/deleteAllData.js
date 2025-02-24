import axios from 'axios'
import { showError } from './showError'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function deleteAllData({ type, _ids }) {
  try {
    const res = await axios.delete(`${URL_FETCH_DATA}${type}`, {
      withCredentials: true,
      data: { _ids }
    })
    return  res.data 
  } catch (err) {
    showError({ err })
  }

}

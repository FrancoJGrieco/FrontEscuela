import axios from 'axios'
import { showError } from './showError'

const URL_FETCH_DATA = process.env.REACT_APP_API_URL

export async function deleteAllData({ type, _ids }) {
  try {
    const res = await axios.delete(`${URL_FETCH_DATA}/${type}`, {
      withCredentials: true,
      data: { _ids }
    })
    return  res.data 
  } catch (err) {
    showError({ err })
  }

}

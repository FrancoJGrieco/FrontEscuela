import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function getData ({ type }) {
  const res = await axios.get(`${URL_FETCH_DATA}${type}`, { withCredentials: true })
  return res.data[type] 
}

import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function createData({ e, typeDB, data }) {
  e.preventDefault()
  console.log(data)
  const res = await axios.post(`${URL_FETCH_DATA}${typeDB}`, data, { withCredentials: true })
  return res.data
}

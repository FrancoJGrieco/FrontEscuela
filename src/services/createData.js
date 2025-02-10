import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function createData({ e, type, data }) {
  e.preventDefault()
  console.log(data)
  const res = await axios.post(`${URL_FETCH_DATA}${type}`, data, { withCredentials: true })
  return { res: res.data }
}

import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function updateData({e, typeDB, _id, data }) {
  e.preventDefault()
  const res = await axios.put(`${URL_FETCH_DATA}${typeDB}/${_id}`, data , { withCredentials: true })
  return res.data
}

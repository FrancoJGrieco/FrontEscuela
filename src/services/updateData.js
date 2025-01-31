import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function updateData({e, type, _id, data }) {
  e.preventDefault()
  console.log(_id, data, type)
  const res = await axios.put(`${URL_FETCH_DATA}${type}/${_id}`, data , { withCredentials: true })
  return { res: res.data }
}

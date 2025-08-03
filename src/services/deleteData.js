import axios from 'axios'

const URL_FETCH_DATA = process.env.REACT_APP_API_URL

export async function deleteData ({ type, _id }) {
  const res = await axios.delete(`${URL_FETCH_DATA}/${type}/${_id}`, { withCredentials: true })
  return { res: res.data }
}

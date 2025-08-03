import axios from 'axios'

export async function getData ({ type }) {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/${type}`, { withCredentials: true })
  return res.data[type] 
}

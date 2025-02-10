import axios from 'axios'

const URL_FETCH_DATA = 'http://localhost:3030/'

export async function deleteAllData({ type, _ids }) {
  const res = await axios.delete(`${URL_FETCH_DATA}${type}`, {
    withCredentials: true,
    data: { _ids }
  })

  console.log(res)
  return { res: res.data }
}

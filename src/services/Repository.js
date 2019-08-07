import axios from 'axios'

const baseDomain = `http://localhost:8080`
const baseURL = `${baseDomain}/office`
const bearer = 'Token'

export default axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `${bearer} ${localStorage.getItem('token')}`
  }
})

import Axios from 'axios'
import { RestApplicationClient } from '../models/backend'

const httpClient = Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!, 
  headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  withXSRFToken: true,
})

const backendClient =  Axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL!, 
  headers: {
      'X-Requested-With': 'XMLHttpRequest',
      'Content-Type': 'application/json',
      'Accept': 'application/json'
  },
  withCredentials: true,
  xsrfCookieName: 'XSRF-TOKEN',
  withXSRFToken: true
})
backendClient.interceptors.response.use((response) => {
  return response.data
})

export const restClient = new RestApplicationClient(backendClient)

export default httpClient
import axios from 'axios'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE,
  timeout: 60000,
})

export const uploadVideo   = (formData) => api.post('/upload', formData)
export const submitYoutube = (url)      => api.post('/youtube', { url })
export const getSignData   = (jobId)    => api.get(`/result/${jobId}`)

export default api
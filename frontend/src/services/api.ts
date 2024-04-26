import axios from 'axios'

axios.defaults.withCredentials = true; // Permitir envio de cookies

export const api = axios.create({
    baseURL: "http://localhost:3001/",
    withCredentials: true,
    
})

import { getUserLocalStorage } from '@/contexts/AuthProvider/utils';
import axios from 'axios'


export const api = axios.create({
    baseURL: "http://localhost:3001/"
})

api.interceptors.request.use(
    (config) => {

      const user = getUserLocalStorage(); // Recupere o token armazenado no localStorage
      if (user.token) {
        config.headers.Authorization = `Bearer ${user.token}`; // Adicione o token ao cabeçalho Authorization
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
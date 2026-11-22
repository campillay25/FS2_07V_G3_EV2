import { httpClient } from '../api/httpClient';

export const authService = {
  async login(email, password) {
    const response = await httpClient.post('/auth/login', { email, password });
    return response.data;
  },

  async register(nombre, email, password) {
    const response = await httpClient.post('/auth/register', { nombre, email, password });
    return response.data;
  },
};
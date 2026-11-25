import { httpClient } from '../api/httpClient';

export const contactoService = {
  async enviar(datos) {
    const response = await httpClient.post('/contacto', datos);
    return response.data;
  },
  async listar() {
    const response = await httpClient.get('/contacto');
    return response.data;
  },
  async eliminar(id) {
    await httpClient.delete(`/contacto/${id}`);
  },
};
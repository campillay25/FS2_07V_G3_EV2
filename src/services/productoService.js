import { httpClient } from '../api/httpClient';

export const productoService = {
  async listar() {
    const response = await httpClient.get('/productos');
    return response.data;
  },
  async buscarPorId(id) {
    const response = await httpClient.get(`/productos/${id}`);
    return response.data;
  },
  async crear(producto) {
    const response = await httpClient.post('/productos', producto);
    return response.data;
  },
  async actualizar(id, producto) {
    const response = await httpClient.put(`/productos/${id}`, producto);
    return response.data;
  },
  async eliminar(id) {
    await httpClient.delete(`/productos/${id}`);
  },
};
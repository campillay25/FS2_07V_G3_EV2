import { httpClient } from '../api/httpClient';

export const compraService = {
  async registrarCompra(items, total) {
    const response = await httpClient.post('/compras', { items, total });
    return response.data;
  },
  async misCompras() {
    const response = await httpClient.get('/compras/mis-compras');
    return response.data;
  },
  async listarTodas() {
    const response = await httpClient.get('/compras');
    return response.data;
  },
};
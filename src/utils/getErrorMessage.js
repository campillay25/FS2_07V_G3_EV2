export function getErrorMessage(error) {
  return (
    error.response?.data?.message ||
    (error.response?.status === 403
      ? 'Acceso denegado: Se requieren permisos de Administrador.'
      : null) ||
    (error.response?.status === 404
      ? 'El producto solicitado no existe en la base de datos.'
      : null) ||
    (error.code === 'ECONNABORTED' ? 'La API tardó demasiado en responder.' : null) ||
    (error.response ? `Error HTTP ${error.response.status}` : null) ||
    'No se pudo contactar a la API. Verifica que Spring Boot esté encendido.'
  );
}
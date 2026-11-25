import { useEffect, useState } from 'react'
import { Alert, Badge, Button, Table } from 'react-bootstrap'
import { contactoService } from '../../services/contactoService'
import { getErrorMessage } from '../../utils/getErrorMessage'

function AdminSoporteView() {
  const [mensajes, setMensajes] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarMensajes()
  }, [])

  async function cargarMensajes() {
    setCargando(true)
    setError('')
    try {
      const datos = await contactoService.listar()
      setMensajes(datos)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setCargando(false)
    }
  }

  async function eliminarMensaje(id) {
    const confirmar = window.confirm('¿Marcar esta consulta como atendida y eliminarla?')
    if (!confirmar) return

    setError('')
    try {
      await contactoService.eliminar(id)
      await cargarMensajes()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <>
      <h2 className="mb-4" style={{ color: '#39FF14' }}>Mensajes de Soporte</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table responsive variant="dark" hover bordered className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Fecha</th>
            <th>Remitente</th>
            <th>Motivo / Producto</th>
            <th>Mensaje</th>
            <th className="text-center">Acción</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr><td colSpan="6" className="text-center py-4">Cargando mensajes de soporte...</td></tr>
          ) : mensajes.length === 0 ? (
            <tr><td colSpan="6" className="text-center py-4 text-secondary">No hay mensajes pendientes en soporte.</td></tr>
          ) : (
            mensajes.map((msg) => (
              <tr key={msg.id}>
                <td>#{msg.id}</td>
                <td className="small text-secondary">
                  {msg.fechaEnvio ? new Date(msg.fechaEnvio).toLocaleString('es-CL') : '-'}
                </td>
                <td>
                  <div className="fw-bold">{msg.nombre}</div>
                  <div className="small text-secondary">{msg.correo}</div>
                  {msg.telefono && <div className="small text-secondary">Tel: {msg.telefono}</div>}
                </td>
                <td>
                  <Badge bg="info" text="dark" className="mb-1 d-inline-block">{msg.tipo}</Badge>
                  <div className="small text-light">
                    {msg.producto} {msg.cantidad ? `(Cant: ${msg.cantidad})` : ''}
                  </div>
                </td>
                <td className="small">{msg.mensaje}</td>
                <td className="text-center">
                  <Button variant="outline-success" size="sm" onClick={() => eliminarMensaje(msg.id)}>
                    Atendido
                  </Button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  )
}

export default AdminSoporteView
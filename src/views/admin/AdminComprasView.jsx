import { useEffect, useState } from 'react'
import { Alert, Badge, Table } from 'react-bootstrap'
import { compraService } from '../../services/compraService'
import { getErrorMessage } from '../../utils/getErrorMessage'

function AdminComprasView() {
  const [compras, setCompras] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarCompras() {
      setCargando(true)
      setError('')
      try {
        const datos = await compraService.listarTodas()
        setCompras(datos)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setCargando(false)
      }
    }
    cargarCompras()
  }, [])

  return (
    <>
      <h2 className="mb-4" style={{ color: '#39FF14' }}>Resumen de Compras Realizadas</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table responsive variant="dark" hover bordered className="align-middle">
        <thead>
          <tr>
            <th>Orden #</th>
            <th>Cliente</th>
            <th>Fecha</th>
            <th>Productos Comprados</th>
            <th className="text-end">Total</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr><td colSpan="5" className="text-center py-4">Cargando historial de ventas...</td></tr>
          ) : compras.length === 0 ? (
            <tr><td colSpan="5" className="text-center py-4 text-secondary">Aún no se registran compras en la tienda.</td></tr>
          ) : (
            compras.map((compra) => (
              <tr key={compra.id}>
                <td className="fw-bold">#{compra.id}</td>
                <td>{compra.usuarioEmail}</td>
                <td className="small text-secondary">{new Date(compra.fecha).toLocaleString('es-CL')}</td>
                <td>
                  <div className="d-flex flex-wrap gap-1">
                    {compra.items?.map((item, idx) => (
                      <Badge key={idx} bg="secondary" className="fw-normal">
                        {item.nombreProducto} x{item.cantidad}
                      </Badge>
                    ))}
                  </div>
                </td>
                <td className="text-end fw-bold" style={{ color: '#39FF14' }}>
                  ${compra.total.toLocaleString('es-CL')} CLP
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  )
}

export default AdminComprasView
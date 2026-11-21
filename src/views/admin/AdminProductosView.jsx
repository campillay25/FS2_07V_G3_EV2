import { useEffect, useState } from 'react'
import { Alert, Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import { productoService } from '../../services/productoService'
import { getErrorMessage } from '../../utils/getErrorMessage'

function AdminProductosView() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    cargarProductos()
  }, [])

  async function cargarProductos() {
    setCargando(true)
    setError('')
    try {
      const datos = await productoService.listar()
      setProductos(datos)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setCargando(false)
    }
  }

  async function eliminarProducto(producto) {
    const confirmar = window.confirm(`¿Deseas eliminar "${producto.nombre}"?`)
    if (!confirmar) return

    setError('')
    try {
      await productoService.eliminar(producto.id)
      await cargarProductos()
    } catch (err) {
      setError(getErrorMessage(err))
    }
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#39FF14' }}>Inventario de Productos</h2>
        <Button as={Link} to="/admin/productos/nuevo" style={{ backgroundColor: '#39FF14', color: '#000', border: 'none' }} className="fw-bold">
          + Agregar Nuevo
        </Button>
      </div>

      {error && <Alert variant="danger">{error}</Alert>}

      <Table responsive variant="dark" hover bordered className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Código</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Categoría</th>
            <th>Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {cargando ? (
            <tr><td colSpan="7" className="text-center text-light py-4">Cargando inventario...</td></tr>
          ) : productos.length === 0 ? (
            <tr><td colSpan="7" className="text-center text-light py-4">No hay productos registrados.</td></tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td className="text-light small">{producto.id}</td>
                <td className="text-secondary small">{producto.codigo}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                </td>
                <td className="fw-bold">{producto.nombre}</td>
                <td className="text-light small">{producto.categoria}</td>
                <td style={{ color: '#39FF14' }}>${producto.precio.toLocaleString('es-CL')}</td>
                <td className="text-center">
                  <div className="d-flex justify-content-center gap-2">
                    <Button as={Link} to={`/admin/productos/editar/${producto.id}`} variant="outline-warning" size="sm">
                      Editar
                    </Button>
                    <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(producto)}>
                      Eliminar
                    </Button>
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </>
  )
}

export default AdminProductosView
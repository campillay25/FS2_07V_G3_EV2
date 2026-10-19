import { useEffect, useState } from 'react'
import { Button, Table } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function AdminProductosView() {
  const [productos, setProductos] = useState([])

  useEffect(() => {
    cargarProductos()
  }, [])

  function cargarProductos() {
    const datos = JSON.parse(localStorage.getItem('productos')) || []
    setProductos(datos)
  }

  function eliminarProducto(id) {
    const confirmar = window.confirm('¿Deseas eliminar este producto?')
    if (!confirmar) return

    const nuevosProductos = productos.filter((producto) => producto.id !== id)
    localStorage.setItem('productos', JSON.stringify(nuevosProductos))
    setProductos(nuevosProductos)
  }

  return (
    <>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 style={{ color: '#39FF14' }}>Inventario de Productos</h2>
        <Button as={Link} to="/admin/productos/nuevo" style={{ backgroundColor: '#39FF14', color: '#000', border: 'none' }} className="fw-bold">
          + Agregar Nuevo
        </Button>
      </div>

      <Table responsive variant="dark" hover bordered className="align-middle">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imagen</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th className="text-center">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.length === 0 ? (
            <tr><td colSpan="5" className="text-center text-light py-4">No hay productos. Agrega uno nuevo.</td></tr>
          ) : (
            productos.map((producto) => (
              <tr key={producto.id}>
                <td className="text-light small">{producto.id}</td>
                <td>
                  <img src={producto.imagen} alt={producto.nombre} style={{ width: '50px', height: '50px', objectFit: 'cover' }} className="rounded" />
                </td>
                <td className="fw-bold">{producto.nombre}</td>
                <td style={{ color: '#39FF14' }}>${producto.precio.toLocaleString('es-CL')}</td>
                <td className="text-center">
                  <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(producto.id)}>
                    Eliminar
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

export default AdminProductosView
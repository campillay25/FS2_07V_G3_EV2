import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CartView() {

const [carrito, setCarrito] = useState([])

  const cargarCarrito = () => {
    const carritoGuardado = JSON.parse(localStorage.getItem('carritoLevelUp')) || []
    setCarrito(carritoGuardado)
  }

  
  useEffect(() => {
    cargarCarrito()
    window.addEventListener('storage', cargarCarrito)
    return () => window.removeEventListener('storage', cargarCarrito)
  }, [])

  const actualizarCarrito = (nuevoCarrito) => {
    setCarrito(nuevoCarrito)
    localStorage.setItem('carritoLevelUp', JSON.stringify(nuevoCarrito))
    window.dispatchEvent(new Event('storage')) 
  }

  const incrementar=(id) => {
    const nuevoCarrito=carrito.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
    )
    actualizarCarrito(nuevoCarrito)
  }

  const decrementar = (id) => {
    const nuevoCarrito=carrito.map(item => 
      item.id === id ? { ...item, cantidad: item.cantidad - 1 } : item
    ).filter(item => item.cantidad > 0)
    actualizarCarrito(nuevoCarrito)
  }

  const eliminarProducto=(id) => {
    const nuevoCarrito = carrito.filter(item => item.id !== id)
    actualizarCarrito(nuevoCarrito)
  }

  const totalPagar = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)
  
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#39FF14' }}>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center py-5 bg-dark rounded border border-secondary text-white">
          <h4 className="text-secondary mb-3">Tu carrito está vacío</h4>
          <p className="text-muted">¡Explora nuestro catálogo y añade equipo gamer a tu setup!</p>
          <Button as={Link} to="/productos" variant="primary" className="fw-bold mt-2">
            Ver Catálogo
          </Button>
        </div>
      ) : (
        <Row className="g-4">
          <Col xs={12} lg={8}>
            <div className="table-responsive bg-dark p-3 rounded border border-secondary">
              <Table variant="dark" align="middle" className="mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map(item => (
                    <tr key={item.id}>
                      <td>
                        <div className="d-flex align-items-center gap-3">
                          <img 
                            src={item.imagen} 
                            alt={item.nombre} 
                            style={{ width: '50px', height: '50px', objectFit: 'cover' }} 
                            className="rounded"
                          />
                          <span className="fw-bold text-light">{item.nombre}</span>
                        </div>
                      </td>
                      <td style={{ color: '#39FF14' }}>${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <div className="d-flex justify-content-center align-items-center gap-2">
                          <Button variant="outline-secondary" size="sm" onClick={() => decrementar(item.id)}>-</Button>
                          <span className="fw-bold px-2 text-white">{item.cantidad}</span>
                          <Button variant="outline-primary" size="sm" onClick={() => incrementar(item.id)}>+</Button>
                        </div>
                      </td>
                      <td className="text-end fw-bold text-white">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                      <td className="text-end">
                        <Button variant="outline-danger" size="sm" onClick={() => eliminarProducto(item.id)}>✕</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          <Col xs={12} lg={4}>
            <Card className="bg-dark text-white border border-primary p-3">
              <Card.Body>
                <Card.Title className="fw-bold mb-4" style={{ color: '#39FF14' }}>Resumen del Pedido</Card.Title>
                <div className="d-flex justify-content-between mb-3">
                  <span className="text-secondary">Productos totales:</span>
                  <span>{carrito.reduce((acc, item) => acc + item.cantidad, 0)} unidades</span>
                </div>
                <hr className="border-secondary" />
                <div className="d-flex justify-content-between mb-4 fs-4 fw-bold">
                  <span>Total:</span>
                  <span style={{ color: '#39FF14' }}>${totalPagar.toLocaleString('es-CL')} CLP</span>
                </div>
                <Button 
                  variant="primary" 
                  className="w-100 fw-bold py-2 mb-2"
                  onClick={() => {
                    alert('¡Compra realizada con éxito! Gracias por preferir Level-Up Gamer.')
                    localStorage.removeItem('carritoLevelUp')
                    setCarrito([])
                    window.dispatchEvent(new Event('storage'))
                  }}
                >
                  Proceder al Pago
                </Button>
                <Button as={Link} to="/productos" variant="outline-light" className="w-100 fw-bold py-2">
                  Seguir Comprando
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default CartView
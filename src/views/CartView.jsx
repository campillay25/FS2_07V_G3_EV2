import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CartView({ carrito, setCarrito }) {

const incrementarCantidad = (id) => {
  const nuevosProductos = carrito.map(item => 
    item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item
  )
  setCarrito(nuevosProductos)
}

  const total = carrito.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4" style={{ color: '#39FF14' }}>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <div className="text-center p-5 bg-dark rounded border">
          <p className="text-secondary lead mb-3">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-outline-light fw-bold">Ver Catálogo</Link>
        </div>
      ) : (
        <Row>
          <Col lg={8} className="mb-4 mb-lg-0">
            <div className="bg-dark p-4 rounded border   overflow-hidden">
              <Table variant="dark" responsive hover className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Precio</th>
                    <th className="text-center">Cantidad</th>
                    <th className="text-end">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {carrito.map((item) => (
                    <tr key={item.id}>
                      
                      <td className="fw-bold text-white">{item.nombre}</td>
                      
                      
                      <td style={{ color: '#1E90FF' }}>${item.precio.toLocaleString('es-CL')}</td>
                      
                      
                      <td className="text-center">
                        <div className="d-flex align-items-center justify-content-center gap-2">
                          <span className="badge bg-secondary px-3 py-2" data-testid={`cantidad-${item.id}`}>
                            {item.cantidad}
                          </span>
                          <Button 
                            variant="outline-light" 
                            size="sm" 
                            onClick={() => incrementarCantidad(item.id)}
                            data-testid={`btn-sumar-${item.id}`}
                          >
                            +
                          </Button>
                        </div>
                      </td>
                      
                      
                      <td className="text-end fw-bold text-white">
                        ${(item.precio * item.cantidad).toLocaleString('es-CL')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          </Col>

          
          <Col lg={4}>
            <div className="bg-dark p-4 rounded border ">
              <h4 className="fw-bold mb-3" style={{ color: '#1E90FF' }}>Resumen del Pedido</h4>
              <hr className="border-secondary" />
              <div className="d-flex justify-content-between mb-3 text-light">
                <span>Total a Pagar:</span>
                <span className="fw-bold fs-4" style={{ color: '#39FF14' }}>
                  ${total.toLocaleString('es-CL')} CLP
                </span>
              </div>
              <Button 
                variant="success" 
                className="w-100 fw-bold py-2 "
                style={{ backgroundColor: '#39FF14', color: '#000', border: 'none' }}
                onClick={() => {alert('Compra realizada con éxito! Gracias por preferir Level-Up Gamer.')
                  setCarrito([])
                }}
              >
                Proceder al Pago
              </Button>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  )
}

export default CartView
import { Container, Row, Col, Table, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function CartView() {

  const productosEnCarro = [
    { 
      id: 1, 
      nombre: 'PlayStation 5 Console', 
      precio: 549990, 
      cantidad: 1 
    },
    { 
      id: 3, 
      nombre: 'Juego de Mesa Catan', 
      precio: 29990, 
      cantidad: 2 
    }
  ]


  const total = productosEnCarro.reduce((acc, item) => acc + (item.precio * item.cantidad), 0)

  return (
    <Container className="my-5">
      <h2 className="fw-bold mb-4" style={{ color: '#39FF14' }}>Carrito de Compras</h2>

      {productosEnCarro.length === 0 ? (
        <div className="text-center p-5 bg-dark rounded border">
          <p className="text-secondary lead mb-3">Tu carrito está vacío.</p>
          <Link to="/productos" className="btn btn-primary fw-bold">Ver Catálogo</Link>
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
                  {productosEnCarro.map((item) => (
                    <tr key={item.id}>
                      <td className="fw-bold text-white">{item.nombre}</td>
                      <td style={{ color: '#1E90FF' }}>${item.precio.toLocaleString('es-CL')}</td>
                      <td className="text-center">
                        <span className="badge bg-secondary px-3 py-2">{item.cantidad}</span>
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
                onClick={() => alert('Compra realizada con éxito! Gracias por preferir Level-Up Gamer.')}
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
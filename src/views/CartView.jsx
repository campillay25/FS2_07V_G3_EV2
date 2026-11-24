import { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Card,Alert, Badge } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { compraService } from '../services/compraService'
import { getErrorMessage } from '../utils/getErrorMessage'

function CartView() {

const [carrito, setCarrito] = useState([])
const [comprasRealizadas, setComprasRealizadas] = useState([])
const [cargandoCompras, setCargandoCompras] = useState(false)
const [procesandoPago, setProcesandoPago] = useState(false)
const [alerta, setAlerta] = useState({ tipo: '', texto: '' })

const auth = useAuth()
const session = auth?.session
const navigate = useNavigate()

const cargarMisCompras = async () => {
    if (!session) {
      setComprasRealizadas([])
      return
    }
    setCargandoCompras(true)
    try {
      const data = await compraService.misCompras()
      setComprasRealizadas(data)
    } catch {
    
    } finally {
      setCargandoCompras(false)
    }
  }

  useEffect(() => {
    cargarMisCompras()
  }, [session])

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
  
  const handlePagar = async () => {
    if (!session) {
      setAlerta({
        tipo: 'warning',
        texto: 'Debes iniciar sesión con tu cuenta para registrar y finalizar la compra.'
      })
      return
    }

    setProcesandoPago(true)
    setAlerta({ tipo: '', texto: '' })

    const itemsPayload = carrito.map(item => ({
      productoId: item.id,
      nombreProducto: item.nombre,
      precioUnitario: item.precio,
      cantidad: item.cantidad,
      subtotal: item.precio * item.cantidad
    }))

    try {
      await compraService.registrarCompra(itemsPayload, totalPagar)
      localStorage.removeItem('carritoLevelUp')
      setCarrito([])
      window.dispatchEvent(new Event('storage'))
      setAlerta({
        tipo: 'success',
        texto: '¡Compra registrada con éxito! Puedes revisar el comprobante en tu resumen abajo.'
      })
      await cargarMisCompras()
    } catch (err) {
      setAlerta({ tipo: 'danger', texto: getErrorMessage(err) })
    } finally {
      setProcesandoPago(false)
    }
  }
  return (
    <Container className="my-5">
      <h2 className="text-center mb-4" style={{ color: '#39FF14' }}>Carrito de Compras</h2>

      {alerta.texto && (
        <Alert variant={alerta.tipo} className="text-center fw-bold">
          {alerta.texto}
          {alerta.tipo === 'warning' && (
            <div className="mt-2">
              <Button size="sm" variant="dark" onClick={() => navigate('/login')}>
                Ir a Iniciar Sesión
              </Button>
            </div>
          )}
        </Alert>
      )}


      {carrito.length === 0 ? (
        <div className="text-center py-5 bg-dark rounded border border-secondary text-white">
          <h4 className="text-secondary mb-3">Tu carrito está vacío</h4>
          <p className="text">¡Explora nuestro catálogo y añade equipo gamer a tu setup!</p>
          <Button as={Link} to="/productos" variant="outline-light" className="fw-bold mt-2">
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
                          <Button variant="outline-light" size="sm" onClick={() => decrementar(item.id)}>-</Button>
                          <span className="fw-bold px-2 text-white">{item.cantidad}</span>
                          <Button variant="outline-light" size="sm" onClick={() => incrementar(item.id)}>+</Button>
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
                  disabled={procesandoPago}
                  className="w-100 fw-bold py-2 mb-2"
                  onClick={handlePagar}
                >
                  {procesandoPago ? 'Procesando compra...' : 'Proceder al Pago'}
                </Button>
                <Button as={Link} to="/productos" variant="outline-light" className="w-100 fw-bold py-2">
                  Seguir Comprando
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
      {session && (
        <section className="mt-5">
          <h3 className="mb-3" style={{ color: '#39FF14' }}>Mis Compras Realizadas</h3>
          {cargandoCompras ? (
            <p className="text-secondary">Cargando resumen de compras...</p>
          ) : comprasRealizadas.length === 0 ? (
            <div className="p-4 bg-dark rounded border border-secondary text-secondary">
              Aún no has realizado compras con la cuenta <strong>{session.email}</strong>.
            </div>
          ) : (
            <div className="table-responsive bg-dark p-3 rounded border border-secondary">
              <Table variant="dark" hover bordered className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Orden #</th>
                    <th>Fecha</th>
                    <th>Detalle de Productos</th>
                    <th className="text-end">Total Pagado</th>
                  </tr>
                </thead>
                <tbody>
                  {comprasRealizadas.map((compra) => (
                    <tr key={compra.id}>
                      <td className="fw-bold">#{compra.id}</td>
                      <td className="small text-secondary">
                        {new Date(compra.fecha).toLocaleString('es-CL')}
                      </td>
                      <td>
                        <div className="d-flex flex-wrap gap-2">
                          {compra.items?.map((item, idx) => (
                            <Badge key={idx} bg="secondary" className="fw-normal">
                              {item.nombreProducto} x{item.cantidad} (${item.subtotal.toLocaleString('es-CL')})
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="text-end fw-bold" style={{ color: '#39FF14' }}>
                        ${compra.total.toLocaleString('es-CL')} CLP
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
          )}
        </section>
      )}
    </Container>
  )
}

export default CartView
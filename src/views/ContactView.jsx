import { useState, useEffect } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { contactoService } from '../services/contactoService'
import { productoService } from '../services/productoService'
import { getErrorMessage } from '../utils/getErrorMessage'
import { useAuth } from '../context/AuthContext'

function ContactView() {
  const auth = useAuth()
  const session = auth?.session

  const [productosCatalogo, setProductosCatalogo] = useState([])
  const [enviando, setEnviando] = useState(false)
  const [formData, setFormData] = useState({
    nombre: '',
    correo: session?.email || '',
    telefono: '',
    tipo: '',
    producto: '',
    cantidad: '',
    mensaje: ''
  })

  const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', texto: '' })

  useEffect(() => {
    async function cargarProductos() {
      try {
        const lista = await productoService.listar()
        setProductosCatalogo(lista)
      } catch {
        
      }
    }
    cargarProductos()
  }, [])

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.nombre.trim() || !formData.correo.trim() || !formData.mensaje.trim()) {
      setAlerta({ mostrar: true, tipo: 'danger', texto: 'Por favor, completa los campos de Nombre, Correo y Mensaje.' })
      return
    }

    setEnviando(true)
    setAlerta({ mostrar: false, tipo: '', texto: '' })

    const payload = {
      nombre: formData.nombre.trim(),
      correo: formData.correo.trim(),
      telefono: formData.telefono.trim(),
      tipo: formData.tipo || 'Consulta general',
      producto: formData.producto || 'No especificado',
      cantidad: formData.cantidad ? Number(formData.cantidad) : null,
      mensaje: formData.mensaje.trim()
    }

    try {
      await contactoService.enviar(payload)
      setAlerta({ mostrar: true, tipo: 'success', texto: '¡Consulta enviada con éxito! Te responderemos a la brevedad.' })
      setFormData({ nombre: '', correo: session?.email || '', telefono: '', tipo: '', producto: '', cantidad: '', mensaje: '' })
    } catch (err) {
      setAlerta({ mostrar: true, tipo: 'danger', texto: getErrorMessage(err) })
    } finally {
      setEnviando(false)
    }
  }

  const handleReset = () => {
    setFormData({ nombre: '', correo: session?.email || '', telefono: '', tipo: '', producto: '', cantidad: '', mensaje: '' })
    setAlerta({ mostrar: false, tipo: '', texto: '' })
  }

  return (
    <Container className="mb-5 my-5">
      <Row className="justify-content-center g-4">
        <Col xs={12} lg={7}>
          <Form
            onSubmit={handleSubmit}
            className="bg-dark p-4 text-white rounded border border-secondary"
          >
            <h2 className="text-center mb-4" style={{ color: '#39FF14' }}>Formulario de contacto</h2>

            <Form.Group className="mb-3" controlId="nombreContacto">
              <Form.Label>Nombre completo:</Form.Label>
              <Form.Control
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="correoContacto">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control
                type="email"
                name="correo"
                value={formData.correo}
                onChange={handleChange}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefonoContacto">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control
                type="number"
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tipoConsulta">
              <Form.Label>Tipo de consulta:</Form.Label>
              <Form.Select name="tipo" value={formData.tipo} onChange={handleChange} className="bg-secondary text-white border-0">
                <option value="" disabled>Selecciona una opción</option>
                <option value="Consulta por producto">Consulta por producto</option>
                <option value="Realizar pedido">Realizar pedido</option>
                <option value="Seguimiento de pedido">Seguimiento de pedido</option>
                <option value="Otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productoInteres">
              <Form.Label>Producto de interés:</Form.Label>
              <Form.Select name="producto" value={formData.producto} onChange={handleChange} className="bg-secondary text-white border-0">
                <option value="" disabled>Selecciona un producto</option>
                {productosCatalogo.length > 0 ? (
                  productosCatalogo.map((p) => (
                    <option key={p.id} value={p.nombre}>{p.nombre}</option>
                  ))
                ) : (
                  <>
                    <option value="Catan">Catan</option>
                    <option value="PlayStation 5">PlayStation 5</option>
                  </>
                )}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="cantidad">
              <Form.Label>Cantidad:</Form.Label>
              <Form.Control
                type="number"
                name="cantidad"
                min="1"
                placeholder="Ej: 1"
                value={formData.cantidad}
                onChange={handleChange}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>

            <Form.Group className="mb-4" controlId="mensajeContacto">
              <Form.Label>Mensaje:</Form.Label>
              <Form.Control
                as="textarea"
                rows={4}
                name="mensaje"
                placeholder="Escriba su consulta..."
                value={formData.mensaje}
                onChange={handleChange}
                className="bg-secondary text-white border-0"
              />
            </Form.Group>

            {alerta.mostrar && (
              <Alert variant={alerta.tipo} className="text-center fw-bold">
                {alerta.texto}
              </Alert>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" disabled={enviando} variant="primary" className="w-50 fw-bold">
                {enviando ? 'Enviando...' : 'Enviar consulta'}
              </Button>
              <Button type="button" variant="secondary" className="w-50 fw-bold" onClick={handleReset}>
                Limpiar formulario
              </Button>
            </div>
          </Form>
        </Col>

        <Col xs={12} lg={5}>
          <div className="bg-dark p-4 text-white h-100 rounded border border-secondary">
            <h2 className="text-center mb-4" style={{ color: '#39FF14' }}>Información de contacto</h2>
            <h3 className="text-center mb-4" style={{ color: '#39FF14' }}>LEVEL-UP GAMER</h3>

            <ul className="list-unstyled mt-4 fs-5 text-center">
              <li className="mb-4"><strong className="text-secondary d-block">Correo:</strong> contacto@levelupgamer.cl</li>
              <li className="mb-4"><strong className="text-secondary d-block">Teléfono:</strong> +56 9 1234 5678</li>
              <li className="mb-4"><strong className="text-secondary d-block">Ubicación:</strong> Santiago, Chile</li>
            </ul>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default ContactView
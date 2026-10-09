import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'

function ContactView() {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    tipo: '',
    producto: '',
    cantidad: '',
    mensaje: ''
  })

  const [alerta, setAlerta] = useState({ mostrar: false, tipo: '', texto: '' })

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.nombre || !formData.correo || !formData.mensaje) {
      setAlerta({ mostrar: true, tipo: 'danger', texto: 'Por favor, completa los campos de Nombre, Correo y Mensaje.' })
      return
    }

    setAlerta({ mostrar: true, tipo: 'success', texto: '¡Consulta enviada con éxito! Te responderemos a la brevedad.' })
    
    setFormData({ nombre: '', correo: '', telefono: '', tipo: '', producto: '', cantidad: '', mensaje: '' })
  }

  const handleReset = () => {
    setFormData({ nombre: '', correo: '', telefono: '', tipo: '', producto: '', cantidad: '', mensaje: '' })
    setAlerta({ mostrar: false, tipo: '', texto: '' })
  }

  return (
    <Container className="mb-5 my-5">
      <Row className="justify-content-center g-4">
        
        <Col xs={12} lg={7}>
          <Form 
            onSubmit={handleSubmit} 
            className="bg-dark p-4  text-white " 
            style={{ borderColor: '#39FF14' }}
          >
            <h2 className="text-center mb-4" style={{ color: '#39FF14' }}>Formulario de contacto</h2>
            
            <Form.Group className="mb-3" controlId="nombreContacto">
              <Form.Label>Nombre completo:</Form.Label>
              <Form.Control 
                type="text" 
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="correoContacto">
              <Form.Label>Correo electrónico:</Form.Label>
              <Form.Control 
                type="email" 
                name="correo"
                value={formData.correo}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="telefonoContacto">
              <Form.Label>Teléfono:</Form.Label>
              <Form.Control 
                type="number" 
                name="telefono"
                value={formData.telefono}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="tipoConsulta">
              <Form.Label>Tipo de consulta:</Form.Label>
              <Form.Select name="tipo" value={formData.tipo} onChange={handleChange}>
                <option value="" disabled>Selecciona una opción</option>
                <option value="producto">Consulta por producto</option>
                <option value="pedido">Realizar pedido</option>
                <option value="seguimiento">Seguimiento de pedido</option>
                <option value="otro">Otro</option>
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="productoInteres">
              <Form.Label>Producto de interés:</Form.Label>
              <Form.Select name="producto" value={formData.producto} onChange={handleChange}>
                <option value="" disabled>Selecciona un producto</option>
                <option value="catan">Catan</option>
                <option value="carcassonne">Carcassonne</option>
                <option value="xbox">Controlador Inalámbrico Xbox Series X</option>
                <option value="hyperx">Auriculares Gamer HyperX Cloud II</option>
                <option value="ps5">PlayStation 5</option>
                <option value="asus">PC Gamer ASUS ROG Strix</option>
                <option value="secretlab">Silla Gamer Secretlab Titan</option>
                <option value="logitech">Mouse Gamer Logitech G502 HERO</option>
                <option value="razer">Mousepad Razer Goliathus</option>
                <option value="polera">Polera Gamer Personalizada 'Level-Up'</option>
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
              />
            </Form.Group>

            {alerta.mostrar && (
              <Alert variant={alerta.tipo} className="text-center fw-bold">
                {alerta.texto}
              </Alert>
            )}

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" className="w-50 fw-bold">
                Enviar consulta
              </Button>
              <Button type="button" variant="secondary" className="w-50 fw-bold" onClick={handleReset}>
                Limpiar formulario
              </Button>
            </div>
          </Form>
        </Col>

        <Col xs={12} lg={5}>
          <div className="bg-dark p-4 text-white h-100" style={{ borderColor: '#39FF14' }}>
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
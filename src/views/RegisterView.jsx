import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function RegisterView() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)
  const [mensajeExito, setMensajeExito] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()

    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError(true)
      setMensajeExito('')
      return
    }

    setError(false)
    setMensajeExito('Registro exitoso! Ya forma parte de la comunidad Level-Up Gamer.')
    setNombre('')
    setEmail('')
    setPassword('')
  }

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <div className="p-4 p-md-5 rounded bg-dark border ">
            <h2 className="text-center fw-bold mb-4" style={{ color: '#39FF14' }}>Registrarse</h2>

            {error && <Alert variant="danger" className="py-2 small">Por favor, completa todos los campos.</Alert>}
            {mensajeExito && <Alert variant="success" className="py-2 small">{mensajeExito}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formNombre">
                <Form.Label className="text-light">Nombre de Usuario</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Tu GamerTag o Nombre" 
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmailReg">
                <Form.Label className="text-light">Correo Electrnico</Form.Label>
                <Form.Control 
                  type="email" 
                  placeholder="tucorreo@ejemplo.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPasswordReg">
                <Form.Label className="text-light">Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  placeholder="Crea una contraseña segura" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Button type="submit" className="w-100 fw-bold py-2 btn-primary mb-3">
                Crear Cuenta
              </Button>
            </Form>

            <div className="text-center text-secondary small">
              ¿Ya tienes una cuenta? <Link to="/login" className="text-decoration-none" style={{ color: '#39FF14' }}>Inicia sesión</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default RegisterView
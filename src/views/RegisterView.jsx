import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { getErrorMessage } from '../utils/getErrorMessage'

function RegisterView() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [mensajeExito, setMensajeExito] = useState('')
  const [cargando, setCargando] = useState(false)
const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (nombre.trim() === '' || email.trim() === '' || password.trim() === '') {
      setError('Por favor, completa todos los campos.')
      setMensajeExito('')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres.')
      setMensajeExito('')
      return
    }

    setError('')
    setMensajeExito('')
    setCargando(true)

    try {
      await authService.register(nombre.trim(), email.trim(), password)
      setMensajeExito('¡Registro exitoso! Redirigiendo al inicio de sesión...')
      setNombre('')
      setEmail('')
      setPassword('')
      setTimeout(() => navigate('/login'), 1200)
    } catch (err) {
      setError(getErrorMessage(err))
    } finally {
      setCargando(false)
    }
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
                  value={nombre} 
                  onChange={(e) => setNombre(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-3" controlId="formEmailReg">
                <Form.Label className="text-light">Correo Electronico</Form.Label>
                <Form.Control 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPasswordReg">
                <Form.Label className="text-light">Contraseña</Form.Label>
                <Form.Control 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Button type="submit" disabled={cargando} className="w-100 fw-bold py-2 btn-primary mb-3">
                {cargando ? 'Creando cuenta...' : 'Crear Cuenta'}
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
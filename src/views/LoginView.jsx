import { useState } from 'react'
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap'
import { Link,useNavigate } from 'react-router-dom'
import { authService } from '../services/authService'
import { saveAuthSession } from '../utils/authSession'
import { getErrorMessage } from '../utils/getErrorMessage'

function LoginView(){
    const [email, setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [error, setError] = useState('')
    const [mensajeExito, setMensajeExito] = useState('')
    const [cargando, setCargando] = useState(false)


    const navigate = useNavigate()
      
    const handleSubmit = async(e) => {
    e.preventDefault()
    

    if (email.trim() === '' || password.trim() === '') {
      setError('Por favor, completa todos los campos.')
      setMensajeExito('')
      return
    }

    setError('')
    setCargando(true)

     try {
     
      const response = await authService.login(email, password)
      saveAuthSession(response)

      if (response.rol === 'ADMIN') {
        navigate('/admin/productos')
      } else {
        setMensajeExito('¡Inicio de sesión exitoso! Bienvenido a Level-Up Gamer.')
        setEmail('')
        setPassword('')
        setTimeout(() => navigate('/'), 1000)
      }
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
          <div className="p-4 p-md-5 rounded bg-dark border border-secondary">
            <h2 className="text-center fw-bold mb-4" style={{ color: '#39FF14' }}>Iniciar Sesión</h2>
            
            {error && <Alert variant="danger" className="py-2 small">{error}</Alert>}
            {mensajeExito && <Alert variant="success" className="py-2 small">{mensajeExito}</Alert>}

            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label className="text-light">Correo Electrónico</Form.Label>
                <Form.Control 
                  type="email"
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Form.Group className="mb-4" controlId="formPassword">
                <Form.Label className="text-light">Contraseña</Form.Label>
                <Form.Control 
                  type="password"            
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-secondary text-white border-0"
                />
              </Form.Group>

              <Button type="submit" disabled={cargando} className="w-100 fw-bold py-2 btn-primary mb-3">
                {cargando ? 'Ingresando...' : 'Ingresar'}
              </Button>
            </Form>

            <div className="text-center text-secondary small">
              ¿No tienes cuenta? <Link to="/registro" className="text-decoration-none" style={{ color: '#39FF14' }}>Regístrate aquí</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  )
}
export default LoginView
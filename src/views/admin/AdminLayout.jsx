import { Alert, Col, Container, Row } from 'react-bootstrap'
import { Link, Outlet } from 'react-router-dom'
import AdminSidebar from '../../components/AdminSidebar'

function AdminLayout() {
  const usuario = JSON.parse(sessionStorage.getItem('usuarioSesion') || 'null')

  if (!usuario || usuario.rol !== 'admin') {
    return (
      <Container className="py-5 text-center">
        <Alert variant="danger" className="bg-dark text-white border-danger">
          <h4 className="text-danger">Acceso Denegado</h4>
          <p>Debes iniciar sesión como administrador para ver esta página.</p>
          <Link to="/login" className="btn btn-outline-light">Ir al Login</Link>
        </Alert>
      </Container>
    )
  }

  return (
    <Container fluid className="py-4">
      <Row>
        <Col md={3} lg={2} className="mb-4">
          <AdminSidebar />
        </Col>
        <Col md={9} lg={10}>
          <div className="admin-content bg-dark p-4 rounded border border-secondary text-white min-vh-100">
         
            <Outlet /> 
          </div>
        </Col>
      </Row>
    </Container>
  )
}

export default AdminLayout
import { Navbar, Nav, Container } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'

function AppNavbar() {
  return (
    <header>
      <Link to="/" className="text-decoration-none">
        <h1 className="text-center mt-3 mb-0" style={{ color: '#39FF14' }}>LEVEL-UP GAMER</h1>
      </Link>
      <Navbar bg="dark" variant="dark" className="mb-4 mb-5 py-3">
        <Container>
          <Nav className="w-100 d-flex justify-content-between align-items-center">
            <NavLink to="/" className="nav-link">Inicio</NavLink>
            <NavLink to="/productos" className="nav-link">Catálogo</NavLink>
            <NavLink to="/carrito" className="nav-link">Carrito</NavLink>
            <NavLink to="/login" className="nav-link">Iniciar Sesión</NavLink>
            <NavLink to="/registro" className="nav-link">Registrarse</NavLink>
            <Link to="/contacto" className="btn fw-bold" style={{ backgroundColor: 'transparent', border: '2px solid #39FF14', color: '#39FF14' }}>
              Contáctanos / Soporte
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </header>
  )
}

export default AppNavbar
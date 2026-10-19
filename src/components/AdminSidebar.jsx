import { Nav } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'

function AdminSidebar() {
  return (
    <div className="bg-dark p-3 rounded border border-secondary h-100">
      <h4 style={{ color: '#39FF14' }} className="mb-4">Panel Admin</h4>
      <Nav className="flex-column gap-2">
        <Nav.Link as={NavLink} to="/admin/productos" className="text-white">
           Listar productos
        </Nav.Link>
        <Nav.Link as={NavLink} to="/admin/productos/nuevo" className="text-white">
           Agregar producto
        </Nav.Link>
        <hr className="border-secondary" />
        <Nav.Link 
          onClick={() => {
            sessionStorage.removeItem('usuarioSesion')
            window.location.href = '/login'
          }} 
          className="text-danger"
        >
          Cerrar Sesión
        </Nav.Link>
      </Nav>
    </div>
  )
}

export default AdminSidebar
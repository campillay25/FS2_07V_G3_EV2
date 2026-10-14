import { Card, Button } from 'react-bootstrap'

function ProductCard({ producto }) {
  const agregarAlCarrito = () => {

    const carritoActual = JSON.parse(localStorage.getItem('carritoLevelUp')) || []

    const index = carritoActual.findIndex(item => item.id === producto.id)

    if (index>=0) {
      carritoActual[index].cantidad += 1
    } else {
      carritoActual.push({
        id: producto.id,
        nombre: producto.nombre,  
        precio: producto.precio,
        imagen: producto.imagen,
        cantidad: 1
      })
    }

    localStorage.setItem('carritoLevelUp', JSON.stringify(carritoActual))
   
    alert(`${producto.nombre} agregado al carrito`)
  }

  return (
    <Card className="h-100 bg-dark text-white">
      <Card.Img 
        variant="top" 
        src={producto.imagen} 
        style={{ height: '250px', objectFit: 'cover', objectPosition: 'center' }} 
        alt={producto.nombre}
      />

      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold" style={{ color: '#39FF14' }}>{producto.nombre}</Card.Title>
        <Card.Text className="text-secondary small mb-2">Código: {producto.codigo}</Card.Text>
        <Card.Text className="flex-grow-1 text-light">{producto.descripcion}</Card.Text>
        <Card.Text className="fs-5 fw-bold mb-3" style={{ color: '#39FF14' }}>
          ${producto.precio.toLocaleString('es-CL')} CLP
        </Card.Text>
        
        <div className="d-flex gap-2 mt-auto">
          <Button variant="outline-light" className="w-100 fw-bold"
           onClick={agregarAlCarrito}>
            Agregar al Carrito
          </Button>
        </div>
         </Card.Body>
    </Card>
  )
}

export default ProductCard
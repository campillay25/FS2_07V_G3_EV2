import { useState } from 'react'
import { Card, Button } from 'react-bootstrap'

function ProductCard({ producto }) {
  const [cantidad, setCantidad] = useState(0)

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
        <Card.Text className="small text-muted mb-3">Cantidad en carro: {cantidad}</Card.Text>
        
        <div className="d-flex gap-2 mt-auto">
          <Button variant="outline-light" className="w-100 fw-bold" onClick={() => setCantidad(cantidad + 1)}>
            Agregar
          </Button>
        </div>
         </Card.Body>
    </Card>
  )
}

export default ProductCard
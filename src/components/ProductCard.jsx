import {useState, usuState} from 'react'
import {Card, Button} from 'react-bootstrap'

function ProductCard({producto}){
    const [cantidad, setCantidad] = useState(0)

    return (
        <Card className="h-100 bg-dark text-white border-secondary shadow-sm">
        <Card.img
        variant="top"
        src={producto.imagen}
        style={{height: '200px', objectFit: 'cover'}}
        />

        <Card.body className="d-flex flex-column">
            <Card.title classname="fw-bold" style={{ color: '#39FF14'}} >{producto.nombre}</Card.title>
            <Card.text className="text-secondary small mb-2">Codigo: {producto.codigo}</Card.text>
            <Card.text className="flex-grow-1 text-light">{producto.descripcion}</Card.text>
            <Card.text className="fs-5 fw-bold mb-3" style={{color: '#39FF14'}}></Card.text>
            <Card.text className="small text-muted mb-3">Cantidad en carro: {cantidad}</Card.text>

            <div className="d-flex gap-2 mt-auto">
                <Button variant="outline-light" classname="w-100 fw-bold" onClick={() => setCantidad(cantidad + 1)}> Agregar</Button>
            </div>
            </Card.body>
            </Card>
    )
}
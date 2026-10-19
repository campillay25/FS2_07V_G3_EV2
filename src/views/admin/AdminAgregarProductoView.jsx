import { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

function AdminAgregarProductoView() {
  const navigate = useNavigate()
  const [producto, setProducto] = useState({
    nombre: '', precio: '', categoria: '', descripcion: '', imagen: ''
  })
  const [errores, setErrores] = useState({})
  const [mensaje, setMensaje] = useState('')

  function manejarCambio(event) {
    const { name, value } = event.target
    setProducto({ ...producto, [name]: value })
  }

  function esUrlValida(valor) {
    try { new URL(valor); return true } catch { return false }
  }

  function validar() {
    const nuevosErrores = {}
    if (producto.nombre.trim().length < 3) nuevosErrores.nombre = 'Nombre demasiado corto'
    if (producto.precio === '' || Number(producto.precio) <= 0) nuevosErrores.precio = 'Ingresa un precio mayor que cero'
    if (producto.categoria.trim() === '') nuevosErrores.categoria = 'Ingresa una categoría'
    if (producto.descripcion.trim().length < 10) nuevosErrores.descripcion = 'La descripción debe tener al menos 10 caracteres'
    if (!esUrlValida(producto.imagen)) nuevosErrores.imagen = 'Ingresa una URL válida (ej: https://...)'
    return nuevosErrores
  }

  function guardarProducto(event) {
    event.preventDefault()
    const nuevosErrores = validar()
    setErrores(nuevosErrores)
    setMensaje('')

    if (Object.keys(nuevosErrores).length > 0) return

    const productos = JSON.parse(localStorage.getItem('productos') || '[]')
    const nuevoProducto = {
      id: Date.now(), 
      codigo: 'NEW-' + Math.floor(Math.random() * 1000),
      nombre: producto.nombre,
      precio: Number(producto.precio),
      categoria: producto.categoria,
      descripcion: producto.descripcion,
      imagen: producto.imagen
    }

    productos.push(nuevoProducto)
    localStorage.setItem('productos', JSON.stringify(productos))
    setMensaje('¡Producto guardado correctamente!')

    setTimeout(() => {
      navigate('/admin/productos')
    }, 1000)
  }

  return (
    <>
      <h2 className="mb-4" style={{ color: '#39FF14' }}>Agregar producto</h2>
      
      {mensaje && <Alert variant="success" className="fw-bold">{mensaje}</Alert>}

      <Form onSubmit={guardarProducto}>
        <Form.Group className="mb-3">
          <Form.Label>Nombre del producto</Form.Label>
          <Form.Control name="nombre" value={producto.nombre} onChange={manejarCambio} isInvalid={!!errores.nombre} className="bg-secondary text-white " />
          <Form.Control.Feedback type="invalid">{errores.nombre}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Precio</Form.Label>
          <Form.Control type="number" name="precio" value={producto.precio} onChange={manejarCambio} isInvalid={!!errores.precio} className="bg-secondary text-white " />
          <Form.Control.Feedback type="invalid">{errores.precio}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Control name="categoria" value={producto.categoria} onChange={manejarCambio} isInvalid={!!errores.categoria} className="bg-secondary text-white " />
          <Form.Control.Feedback type="invalid">{errores.categoria}</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Descripción</Form.Label>
          <Form.Control as="textarea" rows={3} name="descripcion" value={producto.descripcion} onChange={manejarCambio} isInvalid={!!errores.descripcion} className="bg-secondary text-white " />
          <Form.Control.Feedback type="invalid">{errores.descripcion}</Form.Control.Feedback>
        </Form.Group>

      
        <Form.Group className="mb-4">
          <Form.Label>URL de la imagen</Form.Label>
          <Form.Control name="imagen" value={producto.imagen} onChange={manejarCambio} isInvalid={!!errores.imagen} className="bg-secondary text-white " placeholder="https://..." />
          <Form.Control.Feedback type="invalid">{errores.imagen}</Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="fw-bold w-100" style={{ backgroundColor: '#39FF14', color: '#000', border: 'none' }}>
          Guardar Producto
        </Button>
      </Form>
    </>
  )
}

export default AdminAgregarProductoView
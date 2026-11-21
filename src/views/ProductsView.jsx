import { useState, useEffect } from 'react'
import { Container, Row, Col, Alert } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
import { productoService } from '../services/productoService'
import { getErrorMessage } from '../utils/getErrorMessage'

function ProductsView() {
  const [productos, setProductos] = useState([])
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    async function cargarCatalogo() {
      setCargando(true)
      setError('')
      try {
        const data = await productoService.listar()
        setProductos(data)
      } catch (err) {
        setError(getErrorMessage(err))
      } finally {
        setCargando(false)
      }
    }
    cargarCatalogo()
  }, [])

  const categorias = [...new Set(productos.map((p) => p.categoria))]

  return (
    <Container id="catalogo" className="mt-5">
      <h2 className="text-center mb-5" style={{ color: '#39FF14' }}>Catálogo de Productos</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      {cargando ? (
        <p className="text-center text-secondary py-5">Cargando catálogo desde el servidor...</p>
      ) : productos.length === 0 ? (
        <p className="text-center text-secondary py-5">No hay productos disponibles en este momento.</p>
      ) : (
        categorias.map((categoria) => (
          <div key={categoria}>
            <h3 className="mt-5 mb-3 pt-3" style={{ color: '#39FF14' }}>{categoria}</h3>
            <Row className="g-4 mb-5">
              {productos
                .filter((p) => p.categoria === categoria)
                .map((producto) => (
                  <Col xs={12} lg={4} key={producto.id}>
                    <ProductCard producto={producto} />
                  </Col>
                ))}
            </Row>
          </div>
        ))
      )}
    </Container>
  )
}

export default ProductsView
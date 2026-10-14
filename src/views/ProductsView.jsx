import { Container, Row, Col } from 'react-bootstrap'
import ProductCard from '../components/ProductCard'
function ProductsView() {
  const juegosDeMesa = [
    { id: 1, nombre: 'Catan', codigo: 'JM001', descripcion: 'Un clásico juego de estrategia donde los jugadores compiten por colonizar y expandirse en la isla de Catan. Ideal para 3-4 jugadores', precio: 29990, imagen: '/img/catan.jpg' },
    { id: 2, nombre: 'Carcassonne', codigo: 'JM002', descripcion: 'Un juego de colocación de fichas donde los jugadores construyen el paisaje alrededor de la fortaleza medieval de Carcassonne', precio: 24990, imagen: '/img/carcassonne.jpg' },
    { id: 3, nombre: 'Dixit', codigo: 'JM003', descripcion: 'Un juego de cartas bellamente ilustradas donde la imaginación y la deducción son tus mejores aliadas. Ideal para jugar en familia', precio: 32990, imagen: '/img/dixit.jpg' }
  ]

  const accesorios = [
    { id: 4, nombre: 'Controlador Inalámbrico Xbox Series X', codigo: 'AC001', descripcion: 'Ofrece una experiencia de juego comoda con botones mapeables y una respuesta táctil mejorada. Compatible con consolas Xbox y PC', precio: 59990, imagen: '/img/control.jpg' },
    { id: 5, nombre: 'Auriculares Gamer HyperX Cloud II', codigo: 'AC002', descripcion: 'Proporcionan un sonido envolvente de calidad con un micrófono desmontable y almohadillas de espuma viscoelastica', precio: 79990, imagen: '/img/audifonos.jpg' },
    { id: 6, nombre: 'Teclado Mecánico RGB', codigo: 'AC003', descripcion: 'Teclado con switches azules, ideal para una respuesta rápida en partidas competitivas. Incluye retroiluminación personalizable', precio: 45990, imagen: '/img/teclado.jpg' }
  ]

  const consolas = [
    { id: 7, nombre: 'PlayStation 5', codigo: 'CO001', descripcion: 'La consola de última generación de Sony, que ofrece gráficos impresionantes y tiempos de carga ultrarrápidos', precio: 549990, imagen: '/img/play.jpg' },
    { id: 8, nombre: 'PC Gamer ASUS ROG Strix', codigo: 'CG002', descripcion: 'Un potente equipo diseñado para los gamers más exigentes, equipado con los últimos componentes para ofrecer un rendimiento excepcional', precio: 1299990, imagen: '/img/pc.jpg' },
    { id: 9, nombre: 'Xbox Series S', codigo: 'CO002', descripcion: 'La consola 100% digital de Microsoft, compacta y veloz. Perfecta para disfrutar de todo el catálogo de Xbox Game Pass.', precio: 319990, imagen: '/img/xbox.jpg' }
  ]

  const mobiliario = [
    { id: 10, nombre: 'Silla Gamer Secretlab Titan', codigo: 'SG001', descripcion: 'Diseñada para el máximo confort, esta silla ofrece un soporte ergonómico y personalización ajustable para sesiones prolongadas', precio: 349990, imagen: '/img/silla.jpg' },
    { id: 11, nombre: 'Mouse Gamer Logitech G502 HERO', codigo: 'MS001', descripcion: 'Con sensor de alta precisión y botones personalizables, este mouse es ideal para gamers que buscan un control preciso', precio: 49990, imagen: '/img/mouse.jpg' },
    { id: 12, nombre: 'Mousepad Razer Goliathus', codigo: 'SG002', descripcion: 'Ofrece un área de juego amplia con iluminación RGB personalizable, asegurando una superficie suave para el movimiento del mouse', precio: 29990, imagen: '/img/mousepad.jpg' }
  ]

  const vestuario = [
    { id: 13, nombre: "Polera Gamer Personalizada 'Level-Up'", codigo: 'PP001', descripcion: 'Una camiseta comoda y estilizada, con la posibilidad de personalizarla con tu gamer tag o diseño favorito', precio: 14990, imagen: '/img/polera.jpg' },
    { id: 14, nombre: "Polerón Gamer 'Level-Up'", codigo: 'PP002', descripcion: 'Polerón con capucha ideal para torneos en climas fríos. Material resistente y con diseño exclusivo de nuestra comunidad', precio: 24990, imagen: '/img/poleron.jpg' },
    { id: 15, nombre: "Gorra Ajustable 'Level-Up'", codigo: 'PP003', descripcion: 'Gorra negra bordada con el logo oficial de la tienda. Talla única ajustable, perfecta para completar tu estilo gamer', precio: 9990, imagen: '/img/gorra.jpg' }
  ]

  return (
    <Container id="catalogo" className="mt-5">
      <h2 className="text-center mb-5" style={{ color: '#39FF14' }}>Catálogo de Productos</h2>

      <h3 id="cat-juegos" className="mt-5 mb-3 pt-4" style={{ color: '#39FF14' }}>Juegos de Mesa</h3>
      <Row className="g-4 mb-5">
        {juegosDeMesa.map((producto) => (
          <Col xs={12} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      <h3 id="cat-accesorios" className="mt-5 mb-3 pt-4" style={{ color: '#39FF14' }}>Accesorios</h3>
      <Row className="g-4 mb-5">
        {accesorios.map((producto) => (
          <Col xs={12} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      <h3 id="cat-hardware" className="mt-5 mb-3 pt-4" style={{ color: '#39FF14' }}>Consolas y Computadoras Gamers</h3>
      <Row className="g-4 mb-5">
        {consolas.map((producto) => (
          <Col xs={12} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      <h3 id="cat-perifericos" className="mt-5 mb-3 pt-4" style={{ color: '#39FF14' }}>Mobiliario y Perifericos</h3>
      <Row className="g-4 mb-5">
        {mobiliario.map((producto) => (
          <Col xs={12} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>

      <h3 id="cat-vestuario" className="mt-5 mb-3 pt-4" style={{ color: '#39FF14' }}>Vestuario Personalizado</h3>
      <Row className="g-4 mb-5">
        {vestuario.map((producto) => (
          <Col xs={12} lg={4} key={producto.id}>
            <ProductCard producto={producto} />
          </Col>
        ))}
      </Row>
      
    </Container>
  )
}

export default ProductsView
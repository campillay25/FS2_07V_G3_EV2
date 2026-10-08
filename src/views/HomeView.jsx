import { Container, Row, Col, Card } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function HomeView(){
    return(
    <Container className="my-4">
        <Row className="mb-5">
            <Col>
            <div className="p-4 p-md-5  bg-dark " >
                <Row className="align-items-center">
                    
                    <Col xs={12} md={7} className="text-center text-md-start mb-4 mb-md-0">
                    <h2 className="display-5 fw-bold mb-3" style={{color: '#39FF14'}}>
                    TIENDA ONLINE
                    </h2>
                    <p className="lead text-white mb-4">
                        Sube de nivel tu setup. Descubre el mejor equipamiento, consolas de última generación y los juegos de mesa más épicos del mercado chileno en un solo lugar.
                    </p>
                    <Link to="/productos" className="btn btn-lg fw-bold px-4 py-2 btn-outline-light">
                    ver productos
                    </Link>
                    </Col>
                    <Col xs={12} md={5} className="text-center">
                    <img 
                    src="/img/logo.png"
                    alt="Level-Up Gamer Logo"
                    className="img-fluid rounded"
                    style={{ maxHeight:'220px', objectFit: 'contain'}}
                    />
                    </Col>
                        </Row>
                   </div>
            </Col>
        </Row>


        <section className="mb-5">
        <h3 className="text-center mb-4" style={{ color: '#39FF14' }}>Productos Destacados</h3>
        <Row className="g-4">
          <Col md={4}>
            <Card className="bg-dark text-white  h-100">
              <Card.Img variant="top" src="/img/play.jpg" style={{ height: '180px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ color: '#39FF14' }}>PlayStation 5 Console</Card.Title>
                <Card.Text className="text-secondary small">La consola más pedida de la temporada con potencia de ultra alta velocidad.</Card.Text>
                <Link to="/productos" className="btn btn-outline-light mt-auto">Ver detalles</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-dark text-white  h-100 ">
              <Card.Img variant="top" src="/img/catan.jpg" style={{ height: '180px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ color: '#39FF14' }}>Juego de Mesa Catan</Card.Title>
                <Card.Text className="text-secondary small">El clásico indispensable para las tardes de estrategia con amigos.</Card.Text>
                <Link to="/productos" className="btn btn-outline-light mt-auto">Ver detalles</Link>
              </Card.Body>
            </Card>
          </Col>
          <Col md={4}>
            <Card className="bg-dark text-white h-100 ">
              <Card.Img variant="top" src="/img/silla.jpg" style={{ height: '180px', objectFit: 'cover' }} />
              <Card.Body className="d-flex flex-column">
                <Card.Title style={{ color: '#39FF14' }}>Silla Gamer Ergonómica</Card.Title>
                <Card.Text className="text-secondary small">Máximo confort y soporte lumbar para largas sesiones de juego.</Card.Text>
                <Link to="/productos" className="btn btn-outline-light mt-auto">Ver detalles</Link>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <h3 className="text-center mb-4" style={{ color: '#39FF14' }}>Comunidad Gamer</h3>
        <Row className="g-4">
          <Col md={6}>
            <div className="bg-dark p-4  h-100 d-flex flex-column text-center">
              <h4 className="fw-bold mb-3" style={{ color: '#39FF14' }}>Guía: Cómo mejorar tus FPS en PC</h4>
              <p className="text-secondary flex-grow-1">
                Descubre los mejores ajustes gráficos para maximizar el rendimiento de tu equipo ASUS ROG Strix y ganar más partidas.
              </p>
              <Link to="/productos" className="btn btn-outline-light fw-bold px-4 mt-3 mx-auto">Ver más</Link>
            </div>
          </Col>
          <Col md={6}>
            <div className="bg-dark p-4 h-100 d-flex flex-column text-center">
              <h4 className="fw-bold mb-3" style={{ color: '#39FF14' }}>Últimas Noticias</h4>
              <p className="text-secondary flex-grow-1">
                Mantente al día con los últimos lanzamientos, análisis y novedades del mundo de los videojuegos en Vandal.
              </p>
              <Link to="/productos" className="btn btn-outline-light fw-bold px-4 mt-3 mx-auto">Ver Noticias</Link>
            </div>
          </Col>
        </Row>
      </section>

      <section className="mb-5">
        <h3 className="text-center mb-4" style={{ color: '#39FF14' }}>Ubicación de Eventos y Tienda</h3>
        <Row className="bg-dark p-4 align-items-center g-4">
          <Col md={6}>
            <h5 className="fw-bold text-white">Showroom Principal - Providencia</h5>
            <p className="text-secondary mb-2">Visítanos para probar las últimas consolas y retirar tus compras de forma presencial.</p>
            <p className="text-light small mb-1"><strong>Dirección:</strong> Av. Providencia, Santiago</p>
            <p className="text-light small mb-3"><strong>Horarios:</strong> Lunes a Sábado de 10:00 a 20:00 hrs</p>
            <div className="p-3 bg-secondary bg-opacity-25 rounded border border-secondary text-light">
              <span className="d-block fw-bold mb-1" style={{ color: '#39FF14' }}>Próximo Evento Presencial</span>
              <p className="small mb-0">Torneo de Lanzamiento de Juegos de Mesa - Sábado a las 15:00 hrs en el showroom.</p>
            </div>
          </Col>
          <Col md={6}>
            <div className="ratio ratio-16x9 rounded overflow-hidden border border-secondary shadow">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3329.4147043868225!2d-70.612869!3d-33.426182!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9662cf648a3069b5%3A0x6b36017b2b07e7ef!2sProvidencia%2C%20Regi%C3%B3n%20Metropolitana%2C%20Chile!5e0!3m2!1ses!2scl!4v1650000000000!5m2!1ses!2scl" 
                title="Mapa Providencia"
                style={{ border: 0 }} 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </Col>
        </Row>
      </section>
    </Container>
    )
}

export default HomeView
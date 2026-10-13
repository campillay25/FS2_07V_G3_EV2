import { useState } from 'react'
import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar' 
import AppFooter from './components/AppFooter'
import HomeView from './views/HomeView'
import ProductsView from './views/ProductsView'
import LoginView from './views/LoginView'
import CartView from './views/CartView'
import RegisterView from './views/RegisterView'
import ContactView from './views/ContactView'

function App() {
  const [carrito, setCarrito] = useState([])

  const agregarAlCarrito = (producto) => {
    const productoExistente = carrito.find((item) => item.id === producto.id)
    
    if (productoExistente) {
      setCarrito(carrito.map((item) => 
        item.id === producto.id ? { ...item, cantidad: item.cantidad + 1 } : item
      ))
    } else {
      setCarrito([...carrito, { ...producto, cantidad: 1 }])
    }
  }
  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
      <AppNavbar /> 
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/productos" element={<ProductsView agregarAlCarrito={agregarAlCarrito} />} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/carrito" element={<CartView carrito={carrito} setCarrito={setCarrito} />} /> 
          <Route path="/registro" element={<RegisterView />} /> 
          <Route path="/contacto" element={<ContactView />} />
        </Routes>
      </main>

      <AppFooter />
    </div>
  )
}

export default App
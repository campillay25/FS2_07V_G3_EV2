import { Routes, Route } from 'react-router-dom'
// import AppNavbar from './components/AppNavbar' 
import HomeView from './views/HomeView'
import ProductsView from './views/ProductsView'
import LoginView from './views/LoginView'
// import CartView from './views/CartView'
// import RegisterView from './views/RegisterView'
import ContactView from './views/ContactView'

function App() {
  return (
    <div className="bg-black text-white min-vh-100">
      {/* <AppNavbar /> */}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/productos" element={<ProductsView />} />
        <Route path="/login" element={<LoginView />} />
        {/* <Route path="/carrito" element={<CartView />} /> */}
        {/* <Route path="/registro" element={<RegisterView />} /> */}
        {<Route path="/contacto" element={<ContactView />} />}
      </Routes>
    </div>
  )
}

export default App
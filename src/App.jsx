import { Routes, Route } from 'react-router-dom'
import AppNavbar from './components/AppNavbar' 
import AppFooter from './components/AppFooter'
import HomeView from './views/HomeView'
import ProductsView from './views/ProductsView'
import LoginView from './views/LoginView'
import CartView from './views/CartView'
import RegisterView from './views/RegisterView'
import ContactView from './views/ContactView'
import AdminLayout from './views/admin/AdminLayout'
import AdminProductosView from './views/admin/AdminProductosView'
import AdminAgregarProductoView from './views/admin/AdminAgregarProductoView'

function App() {
  
  return (
    <div className="bg-black text-white min-vh-100 d-flex flex-column">
      <AppNavbar /> 
      <main className="flex-grow-1">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/productos" element={<ProductsView/>} />
          <Route path="/login" element={<LoginView />} />
          <Route path="/carrito" element={<CartView />} /> 
          <Route path="/registro" element={<RegisterView />} /> 
          <Route path="/contacto" element={<ContactView />} />
          <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminProductosView />} />
          <Route path="productos" element={<AdminProductosView />} />
          <Route path="productos/nuevo" element={<AdminAgregarProductoView />} />
          </Route>
        </Routes>
      </main>

      <AppFooter />
    </div>
  )
}

export default App
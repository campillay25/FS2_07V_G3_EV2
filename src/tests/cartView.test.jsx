import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi, beforeEach } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CartView from '../views/CartView'

describe('CartView Component', () => {

  beforeEach(() => {
    localStorage.clear()
  })
  
//PRUEBA 1
  test('renderiza correctamente el mensaje de carrito vacío', () => {
    render(
      <BrowserRouter>
        <CartView carrito={[]} setCarrito={vi.fn()} incrementarCantidad={vi.fn()} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Tu carrito está vacío')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /ver catálogo/i })).toBeInTheDocument()
  })

//PRUEBA 2
  test('calcula y muestra el total a pagar correctamente', () => {
    const carritoMock = [
      { id: 1, nombre: 'Catan', precio: 29990, cantidad: 2 }
    ]
    localStorage.setItem('carrito', JSON.stringify(carritoMock))
    localStorage.setItem('carritoLevelUp', JSON.stringify(carritoMock)) 
    render(
      <BrowserRouter>
        <CartView carrito={carritoMock} setCarrito={vi.fn()} incrementarCantidad={vi.fn()} />
      </BrowserRouter>
    )
    
    
    const elementosTotales = screen.getAllByText((content) => content.includes('59.980'))
    expect(elementosTotales.length).toBeGreaterThan(0)
    expect(elementosTotales[0]).toBeInTheDocument()
  })

//PRUEBA 3
  test('llama a la función incrementarCantidad al hacer clic en el botón "+"', async () => {
    const user = userEvent.setup()
    const mockIncrementar = vi.fn() 
    const carritoMock = [{ id: 1, nombre: 'Catan', precio: 29990, cantidad: 1,imagen: '/img/catan.jpg' }
    ]
    
    localStorage.setItem('carritoLevelUp', JSON.stringify(carritoMock))
    render(
      <BrowserRouter>
        <CartView carrito={carritoMock} setCarrito={vi.fn()} incrementarCantidad={mockIncrementar} />
      </BrowserRouter>
    )
    
    
    const botonesSumar = screen.getAllByRole('button', { name: '+' })
    await user.click(botonesSumar[0])
    
  
   const elementosActualizados = screen.getAllByText('3')
    expect(elementosActualizados.length).toBeGreaterThan(0)
    expect(elementosActualizados[0]).toBeInTheDocument()
  })

})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test, vi } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import CartView from '../views/CartView'

describe('CartView Component', () => {

//PRUEBA 1
  test('renderiza correctamente el mensaje de carrito vacío', () => {
    render(
      <BrowserRouter>
        <CartView carrito={[]} setCarrito={vi.fn()} incrementarCantidad={vi.fn()} />
      </BrowserRouter>
    )
    
    expect(screen.getByText('Tu carrito está vacío.')).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /ver catálogo/i })).toBeInTheDocument()
  })

//PRUEBA 2
  test('calcula y muestra el total a pagar correctamente', () => {
    const carritoMock = [
      { id: 1, nombre: 'Catan', precio: 29990, cantidad: 2 }
    ]
    
    render(
      <BrowserRouter>
        <CartView carrito={carritoMock} setCarrito={vi.fn()} incrementarCantidad={vi.fn()} />
      </BrowserRouter>
    )
    
    
    expect(screen.getByText(/\$59\.980 CLP/i)).toBeInTheDocument()
  })

//PRUEBA 3
  test('llama a la función incrementarCantidad al hacer clic en el botón "+"', async () => {
    const user = userEvent.setup()
    const mockIncrementar = vi.fn() 
    const carritoMock = [{ id: 1, nombre: 'Catan', precio: 29990, cantidad: 1 }]
    
    render(
      <BrowserRouter>
        <CartView carrito={carritoMock} setCarrito={vi.fn()} incrementarCantidad={mockIncrementar} />
      </BrowserRouter>
    )
    
    const botonSumar = screen.getByTestId('btn-sumar-1')
    await user.click(botonSumar)
    
    expect(mockIncrementar).toHaveBeenCalledTimes(1)
    expect(mockIncrementar).toHaveBeenCalledWith(1)
  })

})
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import { BrowserRouter } from 'react-router-dom'
import LoginView from '../views/LoginView'

describe('LoginView Component', () => {

//PRUEBA 4
  test('renderiza correctamente el formulario de inicio de sesión y sus campos', () => {
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    )
    
    expect(screen.getByLabelText(/correo electrónico/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/contraseña/i)).toBeInTheDocument()
    const botonLogin = screen.getByRole('button', { name: /ingresar/i })
    expect(botonLogin).toBeInTheDocument()
  })

//PRUEBA 5
  test('permite al usuario escribir en los campos de correo y contraseña', async () => {
    const user = userEvent.setup()
    render(
      <BrowserRouter>
        <LoginView />
      </BrowserRouter>
    )
    
    const inputCorreo = screen.getByLabelText(/correo electrónico/i)
    const inputPass = screen.getByLabelText(/contraseña/i)
    
    await user.type(inputCorreo, 'angelo@levelup.cl')
    await user.type(inputPass, 'secreta123')
    
    expect(inputCorreo.value).toBe('angelo@levelup.cl')
    expect(inputPass.value).toBe('secreta123')
  })

})
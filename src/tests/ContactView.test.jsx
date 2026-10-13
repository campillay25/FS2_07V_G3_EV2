import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { describe, expect, test } from 'vitest'
import ContactView from '../views/ContactView'

describe('ContactView Component', () => {
//PRUEBA 1
  test('renderiza correctamente el formulario y sus campos iniciales', () => {
    render(<ContactView />)
    
    expect(screen.getByText('Formulario de contacto')).toBeInTheDocument()
    const botonesEnviar = screen.getAllByRole('button', { name: /enviar consulta/i })
    expect(botonesEnviar[0]).toBeInTheDocument()
  })
//PRUEBA 2
  test('permite al usuario escribir en los campos de texto', async () => {
    const user = userEvent.setup()
    render(<ContactView />)
    
    const inputNombre = screen.getByLabelText(/nombre completo/i)
    
    await user.type(inputNombre, 'Angelo Gamer')
    
    expect(inputNombre.value).toBe('Angelo Gamer')
  })
//PRUEBA 3
  test('muestra alerta de error si se envía el formulario con campos vacíos', async () => {
    const user = userEvent.setup()
    render(<ContactView />)
    
    const botonesEnviar = screen.getAllByRole('button', { name: /enviar consulta/i })
    
    await user.click(botonesEnviar[0])
    
    expect(screen.getByText(/Por favor, completa los campos de Nombre, Correo y Mensaje/i)).toBeInTheDocument()
  })
//PRUEBA 4
  test('muestra alerta de éxito y limpia el formulario al enviar datos válidos', async () => {
    const user = userEvent.setup()
    render(<ContactView />)
    
    const inputNombre = screen.getByLabelText(/nombre completo/i)
    const inputCorreo = screen.getByLabelText(/correo electrónico/i)
    const inputMensaje = screen.getByLabelText(/mensaje/i)
    const botonesEnviar = screen.getAllByRole('button', { name: /enviar consulta/i })

    await user.type(inputNombre, 'Brayan')
    await user.type(inputCorreo, 'brayan@levelup.cl')
    await user.type(inputMensaje, 'Consulta sobre stock de PS5')
    
    await user.click(botonesEnviar[0])
    
    expect(screen.getByText(/¡Consulta enviada con éxito!/i)).toBeInTheDocument()
    expect(inputNombre.value).toBe('')
    expect(inputCorreo.value).toBe('')
  })
//PRUEBA 5
  test('limpia los datos ingresados al presionar el botón "Limpiar formulario"', async () => {
    const user = userEvent.setup()
    render(<ContactView />)
    
    const inputNombre = screen.getByLabelText(/nombre completo/i)
    const botonesLimpiar = screen.getAllByRole('button', { name: /limpiar formulario/i })
    
    await user.type(inputNombre, 'Texto de prueba')
    await user.click(botonesLimpiar[0])
    
    expect(inputNombre.value).toBe('')
  })
})
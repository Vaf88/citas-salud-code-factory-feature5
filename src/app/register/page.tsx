'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function RegisterPage() {
  const router = useRouter()
  const [form, setForm] = useState({
    nombre: '',
    apellido: '',
    identificacion: '',
    email: '',
    password: '',
    confirmPassword: '',
  })

  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (form.password !== form.confirmPassword) {
      setError('Las contraseñas no coinciden')
      return
    }
    // Aquí puedes enviar el form a la API
    console.log(form)
    router.push('/login')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Registro</h1>
        <p className="text-gray-500 mb-6">Crea una cuenta para acceder al portal</p>
        <form onSubmit={handleSubmit} className="space-y-4 text-left">
          <input name="nombre" placeholder="Nombre" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          <input name="apellido" placeholder="Apellido" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          <input name="identificacion" placeholder="Número de identificación" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          <input type="email" name="email" placeholder="Correo electrónico" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          <input type="password" name="password" placeholder="Contraseña" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          <input type="password" name="confirmPassword" placeholder="Confirmar contraseña" className="w-full px-3 py-2 border rounded-md" onChange={handleChange} required />
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button type="submit" className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition">
            Registrarse
          </button>
        </form>
        <p className="mt-4 text-sm">
          ¿Ya tienes una cuenta?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push('/login')}
          >
            Inicia sesión
          </span>
        </p>
      </div>
    </div>
  )
}

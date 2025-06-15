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
    console.log(form)
    router.push('/login')
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1EAFE] px-4">
      <div className="text-center mb-8 flex items-center justify-center">
        <img src="/img/LogoCitas.png" alt="Logo" className="w-16 mr-2" />
        <h1 className="text-3xl font-serif font-bold text-black">CitaSalud</h1>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg text-left">
        <h2 className="text-3xl font-serif font-bold mb-2">Registrarse</h2>
        <p className="text-gray-400 mb-6">Ingrese la información para registrarse al portal</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Nombre *</label>
            <input name="nombre" placeholder="Ingrese su nombre" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Apellido *</label>
            <input name="apellido" placeholder="Ingrese su apellido" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Número de Identificación *</label>
            <input name="identificacion" placeholder="Ingrese su ID" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Correo electrónico *</label>
            <input type="email" name="email" placeholder="Ingrese su Email" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña *</label>
            <input type="password" name="password" placeholder="Ingrese una contraseña" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Confirmar contraseña *</label>
            <input type="password" name="confirmPassword" placeholder="Ingrese nuevamente su contraseña" className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300" onChange={handleChange} required />
          </div>

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <button type="submit" className="w-full bg-[#A48CF0] text-white py-2 rounded-md hover:bg-[#8b75cc] transition font-medium">
            Iniciar Sesión
          </button>
        </form>

        <p className="mt-4 text-sm text-center">
          ¿Ya tienes cuenta?{' '}
          <span className="text-purple-600 hover:underline cursor-pointer" onClick={() => router.push('/login')}>
            Iniciar Sesión
          </span>
        </p>
      </div>
    </div>
  )
}


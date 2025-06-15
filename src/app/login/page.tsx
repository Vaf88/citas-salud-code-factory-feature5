'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../context/AuthContext'  // 👈 Importamos el contexto

export default function LoginPage() {
  const router = useRouter()
  const { setRole } = useAuth()  // 👈 Obtenemos el setter del rol desde el contexto
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()

    // Validación de credenciales
    if (email === 'admin@admin.com' && password === 'admin') {
      setRole('admin')  // 👈 Guardamos el rol en el contexto
      router.push('/dashboard')  // Ya no es necesario poner el role en la URL
    } else if (email === 'user@user.com' && password === 'user') {
      setRole('user')
      router.push('/dashboard')
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#F1EAFE] px-4">
      <div className="text-center mb-8">
        <img src="/img/LogoCitas.png" alt="Logo" className="mx-auto w-24 mb-4" />
        <h1 className="text-4xl font-serif font-bold text-black">CitaSalud</h1>
      </div>
      <div className="bg-white p-10 rounded-2xl shadow-lg w-full max-w-lg text-left">
        <h2 className="text-3xl font-serif font-bold mb-2">Iniciar Sesión</h2>
        <p className="text-gray-400 mb-6">Ingrese sus credenciales para acceder al portal</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-300"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <div className="text-right mt-1">
              <a href="#" className="text-xs text-purple-600 hover:underline">
                ¿Olvidaste tu contraseña?
              </a>
            </div>
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-[#A48CF0] text-white py-2 rounded-md hover:bg-[#8b75cc] transition font-medium"
          >
            Iniciar Sesión
          </button>
        </form>
        <p className="mt-4 text-sm text-center">
          ¿No tienes cuenta?{' '}
          <span
            className="text-purple-600 hover:underline cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Registrarme
          </span>
        </p>
      </div>
    </div>
  )
}

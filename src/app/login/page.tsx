'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    // Simulación de login básico (reemplazar con llamada a tu API)
    if (email === 'admin@admin.com' && password === 'admin') {
      router.push('/dashboard?role=admin')
    } else if (email === 'user@user.com' && password === 'user') {
      router.push('/dashboard?role=user')
    } else {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md text-center">
        <img src="/img/LogoCitas.png" alt="Logo" className="mx-auto w-20 mb-4" />
        <h1 className="text-2xl font-bold mb-2">Inicio de sesión</h1>
        <p className="text-gray-500 mb-6">Ingrese sus credenciales para acceder al portal</p>
        <form onSubmit={handleLogin} className="space-y-4 text-left">
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Correo electrónico</label>
            <input
              type="email"
              className="w-full px-3 py-2 border rounded-md"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              className="w-full px-3 py-2 border rounded-md"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <p className="text-red-500 text-sm">{error}</p>}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition"
          >
            Iniciar sesión
          </button>
        </form>
        <p className="mt-4 text-sm">
          ¿No tienes una cuenta?{' '}
          <span
            className="text-blue-600 hover:underline cursor-pointer"
            onClick={() => router.push('/register')}
          >
            Regístrate
          </span>
        </p>
      </div>
    </div>
  )
}

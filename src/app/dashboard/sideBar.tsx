'use client'

import Link from 'next/link'
import { useAuth } from '../context/AuthContext'
import { useRouter } from 'next/navigation'

export default function Sidebar() {
  const { role, logout } = useAuth()
  const router = useRouter()

  const links = [
    { label: 'Principal', href: '/dashboard' },
    { label: 'Mis solicitudes', href: '/dashboard/solicitudes' },
    ...(role === 'admin'
      ? [
          { label: 'Notificaciones', href: '/dashboard/notificaciones' },
          { label: 'Gestores', href: '/dashboard/gestores' },
        ]
      : []),
  ]

  const handleLogout = () => {
    logout()              // limpiamos el estado
    router.push('/')      // lo llevamos al login
  }

  return (
    <div className="w-64 bg-[#F1EAFE] flex flex-col items-center py-8 justify-between h-screen">
      <div>
        <img src="/img/LogoCitas.png" alt="Logo" className="w-20 mb-10" />
        <nav className="space-y-6 w-full text-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="block py-2 text-lg font-serif hover:text-purple-600 transition"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="mb-8">
        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
        >
          Cerrar sesión
        </button>
      </div>
    </div>
  )
}


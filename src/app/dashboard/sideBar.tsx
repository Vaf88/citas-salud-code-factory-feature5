'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useAuth } from '../context/AuthContext'

export default function Sidebar() {
  const { role, logout } = useAuth()

  const links = [
    { label: 'Principal', href: '/dashboard' },
    ...(role === 'Administrador'
      ? [
          { label: 'Notificaciones', href: '/dashboard/notificaciones' },
          { label: 'Gestores', href: '/dashboard/gestores' },
        ]
      : []),
    ...(role === 'Cliente'
      ? [
          { label: 'Radicar PQRS', href: '/dashboard/nueva-pqrs' },
          { label: 'Mis solicitudes', href: '/dashboard/solicitudes' },
        ]
      : []),
  ]

  const handleLogout = () => {
    logout()
  }

  return (
    <div className="w-64 bg-[#F1EAFE] flex flex-col items-center py-8 justify-between h-screen">
      <div>
        <Image
          src="/img/LogoCitas.png"
          alt="Logo"
          width={80}
          height={80}
          className="mb-10"
        />
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

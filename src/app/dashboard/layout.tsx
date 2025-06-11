'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import { ReactNode } from 'react'

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const searchParams = useSearchParams()
  const role = searchParams.get('role') // 'admin' o 'user'

  const links = [
    { label: 'Principal', href: '/dashboard' },
    { label: 'Mis solicitudes', href: '/dashboard/solicitudes' },
    // Solo para administradores
    ...(role === 'admin'
      ? [
          { label: 'Notificaciones', href: '/dashboard/notificaciones' },
          { label: 'Gestores', href: '/dashboard/gestores' },
        ]
      : []),
  ]

  return (
    <div className="flex min-h-screen">
      <aside className="w-64 bg-blue-800 text-white flex flex-col items-center py-6">
        <img src="/img/LogoCitas.png" alt="Logo" className="w-16 mb-6" />
        <nav className="space-y-4 w-full text-center">
          {links.map((l) => (
            <Link
              key={l.href}
              href={`${l.href}?role=${role ?? 'user'}`}
              className="block py-2 hover:bg-blue-700"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="flex-1 p-8 bg-gray-50">{children}</main>
    </div>
  )
}
